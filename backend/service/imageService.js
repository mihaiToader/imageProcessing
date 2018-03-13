let Jimp = require("jimp");

let currentImage = null;

let imageProcessing = {
  getCurrent: () => {
    return currentImage;
  },

  setCurrentImage: (imgPath) => {
    return Jimp.read(imgPath)
      .then((image) => {
        currentImage = image;
      })
  },

  invert: () => {
    if (currentImage) {
      return currentImage.clone().invert();
    } else {
      return null;
    }
  },

  grayscale: () => {
    if (currentImage) {
      return currentImage.clone().grayscale();
    } else {
      return null;
    }
  },

  normalize: () => {
    if (currentImage) {
      return currentImage.clone().normalize();
    } else {
      return null;
    }
  },

  dither565: () => {
    if (currentImage) {
      return currentImage.clone().dither565();
    } else {
      return null;
    }
  },

  changeColors: () => {
    if (currentImage) {
      let img = currentImage.clone();
      img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
        // x, y is the position of this pixel on the image
        // idx is the position start position of this rgba tuple in the bitmap Buffer
        // this is the image

        this.bitmap.data[ idx + 0 ] = 255 -  this.bitmap.data[ idx + 0 ]; //red
        this.bitmap.data[ idx + 1 ] = 255 - this.bitmap.data[ idx + 1 ]; //green
        this.bitmap.data[ idx + 2 ] = 255 - this.bitmap.data[ idx + 2 ]; //blue
        let alpha = this.bitmap.data[ idx + 3 ];

        // rgba values run from 0 - 255
        // e.g. this.bitmap.data[idx] = 0; // removes red from this pixel
      });
      return img;
    } else {
      return null;
    }
  }


};



module.exports = imageProcessing;
