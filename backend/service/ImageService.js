let Jimp = require("jimp");

let foo = (buffer) => {
  return buffer;
}

let imageProcessing = {
  read: function () {
    return Jimp.read("https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/4/11/1397210130748/Spring-Lamb.-Image-shot-2-011.jpg")
      .then((image) => {
        image.rotate(90);
        image.invert();
        return image;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

module.exports = imageProcessing;
