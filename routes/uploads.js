var express = require('express');
var router = express.Router();
var multer = require('multer');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() )
  }
})

var upload = multer({ storage: storage }).single('image');

router.get('/', function(req, res, next) {
  console.log("it work");
  res.send("as");
});


router.post('/', function (req, res) {
  console.log(req.files);
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      return
    }
    res.json({
      success: true,
      msg: "image uploaded"
    })
    // Everything went fine
  })
})



module.exports = router;