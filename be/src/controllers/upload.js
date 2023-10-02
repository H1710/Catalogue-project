const uploadImage = require("../utils/uploadImage");

class UploadController {
  static async uploadImage(req, res) {
    try {
      if (!req.file)
        return res.status(400).send({ message: "Please upload a file" });
      const uploadFile = req.file;
      const data = await uploadImage(uploadFile.filename, uploadFile.mimetype);
      return res
        .status(200)
        .send({ message: "Upload success", url: data.data.webContentLink });
    } catch (error) {
      return res.status(500).send({ message: "Something went wrong" });
    }
  }
}

exports.UploadController = UploadController;
