const fs = require("fs");
const initCloudinary = require("../config/cloudinary");

const imageUpload = async (reqFile, photoOld) => {
  const cld = initCloudinary();

  try {
    const uploadResult = await cld.uploader.upload(reqFile.path);

    if (uploadResult) {
      if (photoOld) {
        const publicId = photoOld.split("/").pop().split(".").shift();
        await cld.uploader.destroy(publicId);
      }
      fs.unlinkSync(reqFile.path);
    }

    return uploadResult.secure_url;
  } catch (error) {
    throw new Error("Cloudinary Error Upload");
  }
};

module.exports = {
  imageUpload,
};
