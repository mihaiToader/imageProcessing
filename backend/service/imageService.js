let Jimp = require("jimp");
let removeFiles = require("./removefiles");

let currentImage = null;
let secondImage = null;
let modifiedImage = null;

let img1Path = null;
let img2Path = null;

let imageProcessing = {
  getCurrent: () => {
    return currentImage;
  },

  getSecond: () => {
    return secondImage;
  },

  switch: () => {
    let aux = currentImage;
    currentImage = modifiedImage;
    modifiedImage = aux;
  },

  switch2: () => {
    let aux = currentImage;
    currentImage = secondImage;
    secondImage = aux;
  },

  setCurrentImage: (imgPath) => {
    img1Path = imgPath;
    return Jimp.read(imgPath)
      .then((image) => {
        currentImage = image;
        removeFiles("uploads", img1Path, img2Path);
      })
  },

  setSecondImage: (imgPath) => {
    img2Path = imgPath;
    return Jimp.read(imgPath)
      .then((image) => {
        secondImage = image;
        removeFiles("uploads", img1Path, img2Path);
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
  },

  findDifference: () => {
    if (currentImage && secondImage) {
      let imageWithDifferences = currentImage.clone();
      imageWithDifferences.scan(0, 0, imageWithDifferences.bitmap.width, imageWithDifferences.bitmap.height, function (x, y, idx) {
        if (currentImage.getPixelColor(x, y) === secondImage.getPixelColor(x, y)) {
          imageWithDifferences.setPixelColor(0x0BD626, x, y);
        }
      });
      return imageWithDifferences;
    } else {
      return null;
    }
  },

  gaussian: (nrPixels) => {
    if (currentImage) {
      modifiedImage = currentImage.clone().gaussian(nrPixels);
      return modifiedImage;
    } else {
      return null;
    }
  },

  pixelate: (nrPixels) => {
    if (currentImage) {
      modifiedImage = currentImage.clone().pixelate(nrPixels);
      return modifiedImage;
    } else {
      return null;
    }
  },

  noiceReduction: () => {
    if (currentImage) {
      let imageWithNoise = currentImage.clone();
      imageWithNoise.scan(0, 0, imageWithNoise.bitmap.width, imageWithNoise.bitmap.height, function (x, y, idx) {

      });
      return imageWithNoise;
    } else {
      return null;
    }
  }

};



module.exports = imageProcessing;
