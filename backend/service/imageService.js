let Jimp = require("jimp");
let removeFiles = require("./removefiles");

let currentImage = null;
let modifiedImage = null;

let imageProcessing = {
  getCurrent: () => {
    return currentImage;
  },

  switch: () => {
    let aux = currentImage;
    currentImage = modifiedImage;
    modifiedImage = aux;
  },

  setCurrentImage: (imgPath) => {
    return Jimp.read(imgPath)
      .then((image) => {
        currentImage = image;
        removeFiles("uploads");
      })
  },

  invert: () => {
    if (currentImage) {
      modifiedImage = currentImage.clone().invert();
      return modifiedImage;
    } else {
      return null;
    }
  },

  grayscale: () => {
    if (currentImage) {
      modifiedImage = currentImage.clone().grayscale();
      return modifiedImage;
    } else {
      return null;
    }
  },

  normalize: () => {
    if (currentImage) {
      modifiedImage = currentImage.clone().normalize();
      return modifiedImage;
    } else {
      return null;
    }
  },

  dither565: () => {
    if (currentImage) {
      modifiedImage = currentImage.clone().dither565();
      return modifiedImage;
    } else {
      return null;
    }
  },

  changeColors: () => {
    if (currentImage) {
      let modifiedImage = currentImage.clone();
      modifiedImage.scan(0, 0, modifiedImage.bitmap.width, modifiedImage.bitmap.height, function (x, y, idx) {
        // x, y is the position of this pixel on the image
        // idx is the position start position of this rgba tuple in the bitmap Buffer
        // this is the image

        // this.bitmap.data[ idx + 0 ] = 255 -  this.bitmap.data[ idx + 0 ]; //red
        // this.bitmap.data[ idx + 1 ] = 255 - this.bitmap.data[ idx + 1 ]; //green
        // this.bitmap.data[ idx + 2 ] = 255 - this.bitmap.data[ idx + 2 ]; //blue
        // let alpha = this.bitmap.data[ idx + 3 ];

        [this.bitmap.data[ idx + 0 ], this.bitmap.data[ idx + 2 ]] = [this.bitmap.data[ idx + 2 ], this.bitmap.data[ idx + 0 ]];

        // rgba values run from 0 - 255
        // e.g. this.bitmap.data[idx] = 0; // removes red from this pixel
      });
      return modifiedImage;
    } else {
      return null;
    }
  }


};



module.exports = imageProcessing;
