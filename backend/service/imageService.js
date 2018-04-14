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

  getModified: () => {
    return modifiedImage;
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
      let modifiedImage = currentImage.clone();
      modifiedImage.scan(0, 0, modifiedImage.bitmap.width, modifiedImage.bitmap.height, function (x, y, idx) {
        if (currentImage.getPixelColor(x, y) === secondImage.getPixelColor(x, y)) {
          modifiedImage.setPixelColor(0x0BD626, x, y);
        }
      });
      return modifiedImage;
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

  noiseReduction: (vmin, a, b, L) => {
    if (currentImage) {
      let modifiedImage = currentImage.clone();
      modifiedImage.scan(0, 0, modifiedImage.bitmap.width, modifiedImage.bitmap.height, function (x, y, idx) {
        this.bitmap.data[ idx + 0 ] = noiseReductionFormula(this.bitmap.data[ idx + 0 ], vmin, a, b, L); //red
        this.bitmap.data[ idx + 1 ] = noiseReductionFormula(this.bitmap.data[ idx + 0 ], vmin, a, b, L); //green
        this.bitmap.data[ idx + 2 ] = noiseReductionFormula(this.bitmap.data[ idx + 0 ], vmin, a, b, L); //blue

      });
      return modifiedImage;
    } else {
      return null;
    }
  },

  inversareContrast: (w) => {
    if (currentImage) {
      let modifiedImage = currentImage.clone();
      modifiedImage.scan(0, 0, modifiedImage.bitmap.width, modifiedImage.bitmap.height, function (x, y, idx) {
        let colors = inversareContrastFormula(this, w, x, y, this.bitmap.width, this.bitmap.height);
        this.bitmap.data[idx + 0] = isNaN(colors.red) ? 0: colors.red; //red
        this.bitmap.data[idx + 1] =  isNaN(colors.green) ? 0: colors.green; //green
        this.bitmap.data[ idx + 2 ] =  isNaN(colors.blue) ? 0: colors.blue; //blue

      });
      return modifiedImage;
    } else {
      return null;
    }
  },

  scale: (f) => {
    if (currentImage) {
      modifiedImage = currentImage.clone().scale(f);
      return modifiedImage;
    } else {
      return null;
    }
  },

  filtrareDirectionala: (w) => {
    if (currentImage) {
      let modifiedImage = currentImage.clone();
      modifiedImage.scan(0, 0, modifiedImage.bitmap.width, modifiedImage.bitmap.height, function (x, y, idx) {
        let colors = filtrareDirectionalaFormula(this, w, x, y, this.bitmap.width, this.bitmap.height, {
          red: this.bitmap.data[idx + 0],
          green: this.bitmap.data[idx + 1],
          blue: this.bitmap.data[ idx + 2 ],
        });
        this.bitmap.data[idx + 0] = colors.red % 256; //red
        this.bitmap.data[idx + 1] =  colors.green % 256; //green
        this.bitmap.data[ idx + 2 ] =  colors.blue % 256; //blue

      });
      return modifiedImage;
    } else {
      return null;
    }
  },

};

let checkIfPointCoordinatesInMatrix = (x, y, width, height) => {
  return x >= 0 && x < width && y >= 0 && y < height;
};

let neighbourPointsSum = (image, w, x, y, width, height, formula) => {
  let sum_red = 0;
  let sum_green = 0;
  let sum_blue = 0;
  if (w === 4) {
    if (checkIfPointCoordinatesInMatrix(x, y+1, width, height)) {
      let idx = image.getPixelIndex(x, y+1);
      sum_red += formula(image.bitmap.data[ idx + 0 ]);
      sum_green += formula(image.bitmap.data[ idx + 1 ]);
      sum_blue += formula(image.bitmap.data[ idx + 2 ]);
    }
    if (checkIfPointCoordinatesInMatrix(x+1, y, width, height)) {
      let idx = image.getPixelIndex(x+1, y);
      sum_red += formula(image.bitmap.data[ idx + 0 ]);
      sum_green += formula(image.bitmap.data[ idx + 1 ]);
      sum_blue += formula(image.bitmap.data[ idx + 2 ]);
    }
    if (checkIfPointCoordinatesInMatrix(x+1, y+1, width, height)) {
      let idx = image.getPixelIndex(x+1, y+1);
      sum_red += formula(image.bitmap.data[ idx + 0 ]);
      sum_green += formula(image.bitmap.data[ idx + 1 ]);
      sum_blue += formula(image.bitmap.data[ idx + 2 ]);
    }
    if (checkIfPointCoordinatesInMatrix(x, y, width, height)) {
      let idx = image.getPixelIndex(x, y);
      sum_red += formula(image.bitmap.data[ idx + 0 ]);
      sum_green += formula(image.bitmap.data[ idx + 1 ]);
      sum_blue += formula(image.bitmap.data[ idx + 2 ]);
    }
  } else if (w === 9) {
    if (checkIfPointCoordinatesInMatrix(x, y, width, height)) {
      let idx = image.getPixelIndex(x, y);
      sum_red += formula(image.bitmap.data[ idx + 0 ]);
      sum_green += formula(image.bitmap.data[ idx + 1 ]);
      sum_blue += formula(image.bitmap.data[ idx + 2 ]);
    }
    if (checkIfPointCoordinatesInMatrix(x, y+1, width, height)) {
      let idx = image.getPixelIndex(x, y+1);
      sum_red += formula(image.bitmap.data[ idx + 0 ]);
      sum_green += formula(image.bitmap.data[ idx + 1 ]);
      sum_blue += formula(image.bitmap.data[ idx + 2 ]);
    }
    if (checkIfPointCoordinatesInMatrix(x+1, y, width, height)) {
      let idx = image.getPixelIndex(x+1, y);
      sum_red += formula(image.bitmap.data[ idx + 0 ]);
      sum_green += formula(image.bitmap.data[ idx + 1 ]);
      sum_blue += formula(image.bitmap.data[ idx + 2 ]);
    }
    if (checkIfPointCoordinatesInMatrix(x+1, y+1, width, height)) {
      let idx = image.getPixelIndex(x+1, y+1);
      sum_red += formula(image.bitmap.data[ idx + 0 ]);
      sum_green += formula(image.bitmap.data[ idx + 1 ]);
      sum_blue += formula(image.bitmap.data[ idx + 2 ]);
    }
    if (checkIfPointCoordinatesInMatrix(x-1, y+1, width, height)) {
      let idx = image.getPixelIndex(x-1, y+1);
      sum_red += formula(image.bitmap.data[ idx + 0 ]);
      sum_green += formula(image.bitmap.data[ idx + 1 ]);
      sum_blue += formula(image.bitmap.data[ idx + 2 ]);
    }
    if (checkIfPointCoordinatesInMatrix(x-1, y, width, height)) {
      let idx = image.getPixelIndex(x-1, y);
      sum_red += formula(image.bitmap.data[ idx + 0 ]);
      sum_green += formula(image.bitmap.data[ idx + 1 ]);
      sum_blue += formula(image.bitmap.data[ idx + 2 ]);
    }
    if (checkIfPointCoordinatesInMatrix(x-1, y-1, width, height)) {
      let idx = image.getPixelIndex(x-1, y-1);
      sum_red += formula(image.bitmap.data[ idx + 0 ]);
      sum_green += formula(image.bitmap.data[ idx + 1 ]);
      sum_blue += formula(image.bitmap.data[ idx + 2 ]);
    }
    if (checkIfPointCoordinatesInMatrix(x, y-1, width, height)) {
      let idx = image.getPixelIndex(x, y-1);
      sum_red += formula(image.bitmap.data[ idx + 0 ]);
      sum_green += formula(image.bitmap.data[ idx + 1 ]);
      sum_blue += formula(image.bitmap.data[ idx + 2 ]);
    }
    if (checkIfPointCoordinatesInMatrix(x+1, y-1, width, height)) {
      let idx = image.getPixelIndex(x+1, y-1);
      sum_red += formula(image.bitmap.data[ idx + 0 ]);
      sum_green += formula(image.bitmap.data[ idx + 1 ]);
      sum_blue += formula(image.bitmap.data[ idx + 2 ]);
    }

  }
  return {sum_red, sum_green, sum_blue}
};

let inversareContrastFormula = (image, w, x, y, width, height) => {
  let neighbour = neighbourPointsSum(image, w, x, y, width, height, (x) => x);
  let u_red = ((1 / w) * neighbour.sum_red);
  let u_green = ((1 / w) * neighbour.sum_green);
  let u_blue = ((1 / w) * neighbour.sum_blue);
  return {
    red:  Math.trunc(u_red /
      (Math.sqrt((1 / w) * neighbourPointsSum(image, w, x, y, width, height, (x) => Math.pow(x - u_red, 2)).sum_red))) % 256,
    green: Math.trunc(u_green /
      (Math.sqrt((1 / w) * neighbourPointsSum(image, w, x, y, width, height, (x) => Math.pow(x - u_green, 2)).sum_green))) % 256,
    blue: Math.trunc(u_blue /
      (Math.sqrt((1 / w) * neighbourPointsSum(image, w, x, y, width, height, (x) => Math.pow(x - u_blue, 2)).sum_blue))) % 256
  }
};

let noiseReductionFormula = (u, vmin, a, b, L) => {
  if (u <= a) {
    return 0;
  }
  if (u <=b) {
    return ((u-a) / (b - a) * L) % 256;
  }
  return L;
};

let min = (a, b) => {
  console.log(b);
  return a <= b ? a : b;
};

let filtrareDirectionalaFormula = (image, w, x, y, width, height, color) => {
  let min_red = 255;
  let min_green = 255;
  let min_blue = 255;
  if (w === 4) {
    if (checkIfPointCoordinatesInMatrix(x, y+1, width, height)) {
      let idx = image.getPixelIndex(x, y+1);
      min_red = min(min_red, Math.abs(image.bitmap.data[ idx + 0 ] - color.red));
      min_green = min(min_green, Math.abs(image.bitmap.data[ idx + 1 ] - color.green));
      min_blue = min(min_blue, Math.abs(image.bitmap.data[ idx + 2 ] - color.blue));
    }
    if (checkIfPointCoordinatesInMatrix(x+1, y, width, height)) {
      let idx = image.getPixelIndex(x+1, y);
      min_red = min(min_red, Math.abs(image.bitmap.data[ idx + 0 ] - color.red));
      min_green = min(min_green, Math.abs(image.bitmap.data[ idx + 1 ] - color.green));
      min_blue = min(min_blue, Math.abs(image.bitmap.data[ idx + 2 ] - color.blue));
    }
    if (checkIfPointCoordinatesInMatrix(x+1, y+1, width, height)) {
      let idx = image.getPixelIndex(x+1, y+1);
      min_red = min(min_red, Math.abs(image.bitmap.data[ idx + 0 ] - color.red));
      min_green = min(min_green, Math.abs(image.bitmap.data[ idx + 1 ] - color.green));
      min_blue = min(min_blue, Math.abs(image.bitmap.data[ idx + 2 ] - color.blue));
    }
  } else if (w === 9) {
    if (checkIfPointCoordinatesInMatrix(x, y, width, height)) {
      let idx = image.getPixelIndex(x, y);
      min_red = min(min_red, Math.abs(image.bitmap.data[ idx + 0 ] - color.red));
      min_green = min(min_green, Math.abs(image.bitmap.data[ idx + 1 ] - color.green));
      min_blue = min(min_blue, Math.abs(image.bitmap.data[ idx + 2 ] - color.blue));
    }
    if (checkIfPointCoordinatesInMatrix(x, y+1, width, height)) {
      let idx = image.getPixelIndex(x, y+1);
      min_red = min(min_red, Math.abs(image.bitmap.data[ idx + 0 ] - color.red));
      min_green = min(min_green, Math.abs(image.bitmap.data[ idx + 1 ] - color.green));
      min_blue = min(min_blue, Math.abs(image.bitmap.data[ idx + 2 ] - color.blue));
    }
    if (checkIfPointCoordinatesInMatrix(x+1, y, width, height)) {
      let idx = image.getPixelIndex(x+1, y);
      min_red = min(min_red, Math.abs(image.bitmap.data[ idx + 0 ] - color.red));
      min_green = min(min_green, Math.abs(image.bitmap.data[ idx + 1 ] - color.green));
      min_blue = min(min_blue, Math.abs(image.bitmap.data[ idx + 2 ] - color.blue));
    }
    if (checkIfPointCoordinatesInMatrix(x+1, y+1, width, height)) {
      let idx = image.getPixelIndex(x+1, y+1);
      min_red = min(min_red, Math.abs(image.bitmap.data[ idx + 0 ] - color.red));
      min_green = min(min_green, Math.abs(image.bitmap.data[ idx + 1 ] - color.green));
      min_blue = min(min_blue, Math.abs(image.bitmap.data[ idx + 2 ] - color.blue));
    }
    if (checkIfPointCoordinatesInMatrix(x-1, y+1, width, height)) {
      let idx = image.getPixelIndex(x-1, y+1);
      min_red = min(min_red, Math.abs(image.bitmap.data[ idx + 0 ] - color.red));
      min_green = min(min_green, Math.abs(image.bitmap.data[ idx + 1 ] - color.green));
      min_blue = min(min_blue, Math.abs(image.bitmap.data[ idx + 2 ] - color.blue));
    }
    if (checkIfPointCoordinatesInMatrix(x-1, y, width, height)) {
      let idx = image.getPixelIndex(x-1, y);
      min_red = min(min_red, Math.abs(image.bitmap.data[ idx + 0 ] - color.red));
      min_green = min(min_green, Math.abs(image.bitmap.data[ idx + 1 ] - color.green));
      min_blue = min(min_blue, Math.abs(image.bitmap.data[ idx + 2 ] - color.blue));
    }
    if (checkIfPointCoordinatesInMatrix(x-1, y-1, width, height)) {
      let idx = image.getPixelIndex(x-1, y-1);
      min_red = min(min_red, Math.abs(image.bitmap.data[ idx + 0 ] - color.red));
      min_green = min(min_green, Math.abs(image.bitmap.data[ idx + 1 ] - color.green));
      min_blue = min(min_blue, Math.abs(image.bitmap.data[ idx + 2 ] - color.blue));
    }
    if (checkIfPointCoordinatesInMatrix(x, y-1, width, height)) {
      let idx = image.getPixelIndex(x, y-1);
      min_red = min(min_red, Math.abs(image.bitmap.data[ idx + 0 ] - color.red));
      min_green = min(min_green, Math.abs(image.bitmap.data[ idx + 1 ] - color.green));
      min_blue = min(min_blue, Math.abs(image.bitmap.data[ idx + 2 ] - color.blue));
    }
    if (checkIfPointCoordinatesInMatrix(x+1, y-1, width, height)) {
      let idx = image.getPixelIndex(x+1, y-1);
      min_red = min(min_red, Math.abs(image.bitmap.data[ idx + 0 ] - color.red));
      min_green = min(min_green, Math.abs(image.bitmap.data[ idx + 1 ] - color.green));
      min_blue = min(min_blue, Math.abs(image.bitmap.data[ idx + 2 ] - color.blue));
    }

  }
  return {min_red, min_green, min_blue}
};


module.exports = imageProcessing;
