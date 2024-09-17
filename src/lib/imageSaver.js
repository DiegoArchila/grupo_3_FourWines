const multer = require("multer");

const saveImages = (urlDestination) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, urlDestination);
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    },
  });
  var upload = multer({ storage: storage });

  return upload;
};

module.exports = {
  saveImages,
};
