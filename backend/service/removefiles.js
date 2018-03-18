let fs = require('fs'),
_ = require('underscore');

function removeDirForce(path) {
  fs.readdir(path, function(err, files) {
    if (err) {
      console.log(err.toString());
    }
    else {
      if (files.length !== 0)  {
        _.each(files, function(file) {
          if (file !== '.gitkeep') {
            let filePath = "uploads/" + file + "/";
            fs.stat(filePath, function (err, stats) {
              if (stats.isFile()) {
                fs.unlink(filePath, function (err) {
                  if (err) {
                    console.log(err.toString());
                  }
                });
              }
            });
          }
        });
      }
    }
  });
}

module.exports = removeDirForce;

