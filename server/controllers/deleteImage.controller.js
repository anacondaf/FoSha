const cloudinary = require("../utils/cloudinary");

module.exports.deleteImage = async (request, response) => {
	try {
		let { public_id } = request.body;
		cloudinary.uploader.destroy(public_id).then((res) => {
			response.status(202).json({
				msg: "Delete successful",
			});
		});
	} catch (error) {
		response.status(400).json({
			msg: error,
		});
	}
};
