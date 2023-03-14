const sharp = require("sharp");
const path = require("path");

const userSharpPhoto = async (fileData) => {
  await sharp(path.join(__dirname, "../uploads", fileData.filename))
    .resize(200, 200)
    .jpeg({
      quality: 50,
    })
    .toFile(path.join(__dirname, "../uploads", "/avatar_thumb.jpg"));

  await sharp(path.join(__dirname, "../uploads", fileData.filename))
    .resize(1000, 1000)
    .jpeg({
      quality: 80,
    })
    .toFile(path.join(__dirname, "../uploads", "/avatar_preview.jpg"));
};

module.exports = { userSharpPhoto };
