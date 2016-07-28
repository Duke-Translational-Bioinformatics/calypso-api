'use strict';

var fs         = require('fs');
var parse      = require('csv-parse');

var parseData = function (header, row) {
  let map = {};

  header.forEach(function(headerItem, index){
    let disallowedCharacters = /[^A-Za-z0-9_]+/g;
    headerItem = headerItem.toLowerCase();
    headerItem = headerItem.replace(disallowedCharacters, '');
    map[headerItem] = row[index]
  });

  return map;
}

var readData = function (file) {
  return new Promise(function (resolve, reject) {
    fs.createReadStream(file.path).pipe(parse({delimiter: ','}, function(err, data) {
      if (!err) {
        let header = data[0];

        data.forEach(function(row, index) {
          if (index >= 1) {
            resolve(parseData(header, row));
          }
        });
      } else {
        reject(err);
      }
    }));
  });
}

module.exports = function (file) {
  return readData(file);
};
