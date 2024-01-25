const validFileTypes = [
	"image/jpg",
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/bmp",
	"image/svg",
];
const fileFilter = async (req, file, callback) => {
	req.isFileValid = true;
	const fileSize = parseInt(req.headers['content-length']);
	if (!validFileTypes.includes(file.mimetype)) {
		req.isFileValid = false;
		return callback(null, false);
	}
	
	if (fileSize > 5 * 1024 * 1024) {
		req.isFileValid = false;
		//   return callback(new Error('File size exceeds 25MB'), false);
		return callback(null, false);
	}

	callback(null, true);
};

const fileUploadMiddleware = async (req, res, next) => {
	if (!req.isFileValid) {
		return res.status(400).json({message:"Invalid file type or size"});
	}

	next();
};

module.exports = {
	fileFilter,
	fileUploadMiddleware,
};
