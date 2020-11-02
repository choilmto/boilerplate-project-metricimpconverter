/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var ConvertHandler = require("../controllers/convertHandler.js");

const INVALID_NUMBER = "invalid number";
const INVALID_UNIT = "invalid unit";

module.exports = function (app) {
  var convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function (req, res) {
    var input = req.query.input;
    var initNum = convertHandler.getNum(input);
    var initUnit = convertHandler.getUnit(input);
    if (initNum === INVALID_NUMBER && initUnit === INVALID_UNIT) {
      res.json({ error: "invalid number and unit" });
      return;
    } else if (initNum === INVALID_NUMBER) {
      res.json({ error: "invalid number" });
      return;
    } else if (initUnit === INVALID_UNIT) {
      res.json({ error: "invalid unit" });
      return;
    }
    var returnNum = convertHandler.convert(initNum, initUnit);
    var returnUnit = convertHandler.getReturnUnit(initUnit);
    var toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    var output = {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: toString,
    };
    res.json(output);
  });
};
