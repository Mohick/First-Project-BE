const multer = require("multer");

// Define storage options for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define destination based on file fieldname
    switch (file.fieldname.toLowerCase()) {
      case "imagemusical":
        cb(null, "./public/img/");
        break;
      case "audiomusical":
        cb(null, "./public/audio/");
        break;
      default:
        cb(new Error("Invalid fieldname"));
    }
  },
  filename: function (req, file, cb) {
    // Define filename based on file fieldname
    switch (file.fieldname.toLowerCase()) {
      case "imagemusical":
        cb(null, `${file.fieldname}${Date.now()}.png`);
        break;
      case "audiomusical":
        cb(null, `${file.fieldname}${Date.now()}.mp3`);
        break;
      default:
        cb(new Error("Invalid fieldname"));
    }
  },
});

// Initialize multer with defined storage options
const upload = multer({ storage: storage });

module.exports = upload;
