const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the 'uploads' directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Temporary storage for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename convention
  },
});

// Accept only certain file types
const fileFilter = function (req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|mp4|mkv/; // Adjust file types as needed
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images and video files are allowed!"), false);
  }
};

// Initialize multer upload with storage and file filter options
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload; // Ensure 'upload' is correctly exported
