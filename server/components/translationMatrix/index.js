'use strict';

let translationMatrix = require('./matrix.js');

let translate = function (data) {
  let obj = {};

  for (let prop in data) {
    let formattedProp = prop.toUpperCase();
    let parsedValue = parseFloat(data[prop]);

    if (translationMatrix[formattedProp] && parsedValue) {
      obj[translationMatrix[formattedProp].cat] = translationMatrix[formattedProp].value || parsedValue;

      // Add DB to obj
      if (translationMatrix[formattedProp].db) {
        obj.db = translationMatrix[formattedProp].db
      }

    }
  }

  return obj;
};

module.exports = function(data) {
  return translate(data);
}
