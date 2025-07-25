const multer = require("multer");

const storage = multer.memoryStorage(); // store in memory for Cloudinary
const upload = multer({ storage });

module.exports = upload;