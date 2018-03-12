let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let jimp = require('../service/ImageService');
let Jimp = require("jimp");

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


router.get('/', function (req, res) {
  jimp.read()
    .then((img) => {
      img.getBase64( Jimp.MIME_JPEG, (err, buffer) => {
        res.send({'img': buffer});
      });
    })
   .catch(err => {
     res.send({'img': err});
   })
});

module.exports = router;
