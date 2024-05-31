const FormData = require("form-data");
const fs = require("fs");

async function uploadImageToImgbb(imagePath) {
  const imgbbApiKey = process.env.IMGBB_API_KEY;
  const formData = new FormData();
  formData.append("image", fs.createReadStream(imagePath));

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();
    console.log(result.data.url);
    return result.data.url;
  } catch (error) {
    console.error("Error uploading image to imgbb:", error);
    throw new Error("Gagal mengunggah gambar");
  }
}

module.exports = { uploadImageToImgbb };
