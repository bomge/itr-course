const Images = require('../models/Images')

const fileUpload = async (req, res) => {
	try {
		if (req.isFileValid === false) {
			return res.status(500).send({
				message: `Only image are allowed`,
			});
		}
		if (req.file) {
			const result = await global.cloudinary.uploader.upload(req.file.path);
			await Images.findOneAndUpdate({collectableId: req.body.collectableId}, {url: result.url},{upsert:true})
			res.json({ succes: true });
		} else {
			res.status(404).send({ message: `File not found!` });
		}
	} catch (err) {
		res.status(500).send({  error: err });
	}
};
module.exports = {
	fileUpload,
};
