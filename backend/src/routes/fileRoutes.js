const express = require("express");
const fileController = require("../controllers/fileController");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const {fileFilter,fileUploadMiddleware} = require('../middleware/fileFilter')

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");


const storage = new CloudinaryStorage({
	cloudinary: global.cloudinary,
	params: {
		folder: "ITRA_COURSE",
	}
});

const upload = multer({ storage: storage, fileFilter, limits:{fileSize: 5 * 1024 * 1024, 
	files: 1} });

router.use(verifyJWT);
router.route("/").post(upload.single("image"),fileUploadMiddleware, fileController.fileUpload);
module.exports = router;
