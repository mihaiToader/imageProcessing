let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let Jimp = require('jimp');
let multer = require('multer');

let upload = multer({ dest: 'uploads/' });

let jimp = require('../service/imageService');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let sendBase64 = (img, res) => {
  if (img) {
    img.getBase64(Jimp.MIME_JPEG, (err, buffer) => {
      res.send({
        img: buffer,
        status: 'ok',
      });
    });
  } else {
    res.send({ status: 'empty' });
  }
};

router.get('/', function (req, res) {
  const current = jimp.getCurrent();
  sendBase64(current, res);
});

router.get('/getSecond', function (req, res) {
  const current = jimp.getSecond();
  sendBase64(current, res);
});

router.post('/setImage', upload.single('image'), (req, res) => {
  jimp.setCurrentImage(req.file.path)
    .then(i => res.sendStatus(200))
    .catch(err => {
      console.log(err);
      res.sendStatus(404);
    });
});

router.post('/setSecondImage', upload.single('image'), (req, res) => {
  jimp.setSecondImage(req.file.path)
    .then(i => res.sendStatus(200))
    .catch(err => {
      console.log(err);
      res.sendStatus(404);
    });
});

router.get('/switch', (req, res) => {
  jimp.switch();
  res.sendStatus(200);
});

router.get('/switch2', (req, res) => {
  jimp.switch2();
  res.sendStatus(200);
});

router.get('/invert', (req, res) => {
  sendBase64(jimp.invert(), res);
});

router.get('/grayscale', (req, res) => {
  sendBase64(jimp.grayscale(), res);
});

router.get('/normalize', (req, res) => {
  sendBase64(jimp.normalize(), res);
});

router.get('/dither565', (req, res) => {
  sendBase64(jimp.dither565(), res);
});

router.get('/changeColors', (req, res) => {
  sendBase64(jimp.changeColors(), res);
});

router.get('/findDifferences', (req, res) => {
  sendBase64(jimp.findDifference(), res);
});
module.exports = router;
