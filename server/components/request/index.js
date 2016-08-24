'use strict';
var request = require('request');
var fs      = require('fs');
var parse   = require('csv-parse');

var parseData = function (header, row) {
  let map = {};

  header.forEach(function(headerItem, index){
    let disallowedCharacters = /[^A-Za-z0-9_]+/g;
    headerItem = headerItem.toLowerCase();
    headerItem = headerItem.replace(disallowedCharacters, '');

    map[headerItem] = row[index]
  });

  return map;
};

var requestCSV = function(file) {
  return new Promise(function (resolve, reject) {
    request(file, function(err, response, body){
      if (!err) {
        parse(body, function(err, data) {
          let header = data[0];

          data.forEach(function(row, index) {
            if (index >= 1) {
              resolve(parseData(header, row));
            }
          });
        });
      } else {
        reject(err);
      }
    });
  })
};

module.exports = function (file) {
  return requestCSV(file);
}
