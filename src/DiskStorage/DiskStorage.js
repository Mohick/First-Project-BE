const multer = require("multer");
const proFiles = multer.diskStorage({
  destination: function (req, file, cb) {
    switch (true) {
      case file.fieldname.trim().toLowerCase() == "imageMusical".trim().toLowerCase():
        cb(null, "./public/img/");
        break;
      case file.fieldname.trim().toLowerCase() == "audioMusical".trim().toLowerCase():
        cb(null, "./public/audio/");
    }
  },
  filename: function (req, file, cb) {
    switch (true) {
      case file.fieldname.trim().toLowerCase() == "imageMusical".trim().toLowerCase():
        const img = file.fieldname + Date.now() + ".png";
        cb(null, img);
        break;
      case file.fieldname.trim().toLowerCase() == "audioMusical".trim().toLowerCase():
        const voice = file.fieldname + Date.now() + ".mp3";
        cb(null, voice);
    }
  },
});

const upload = multer({ storage: proFiles });

module.exports = upload;
