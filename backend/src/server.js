require('dotenv').config()
require('express-async-errors')
const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const credentials = require('./middleware/credentials')
const addUserInfo = require('./middleware/addUserInfo.js')
const {socketIo} = require('./socket/socket.js')
const app = express()
const port = process.env.PORT || 3500

const cloudinary = require("cloudinary").v2;
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});
global.cloudinary = cloudinary

// require('./controllers/searchController.js')

connectDB()

const corsConfig = {
  origin:true,
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(credentials)
app.use(cors(corsConfig))
app.use(express.json())
app.use(cookieParser())

const server = require('http').createServer(app)

socketIo(server)

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(addUserInfo)

app.use('/', require('./routes/searchRouter.js'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes.js'))
app.use('/collections', require('./routes/collectionRoutes.js'))
app.use('/items', require('./routes/itemRoutes.js'))
app.use('/seed', require('./routes/seedRoutes.js'))

app.use('/upload', require('./routes/fileRoutes.js'))

app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found"  
  });
});
app.use(errorHandler)
mongoose.connection.once('open', () => {
  server.listen(port, () => {
    console.log('Successfully Connected to MongoDB')
    console.log(`localhost:${port}`);
  })

  

})
mongoose.connection.on('error', (err) => {
  console.log(err)
})
