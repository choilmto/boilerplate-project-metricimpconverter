/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

var chai = require("chai");
var assert = chai.assert;
var ConvertHandler = require("../controllers/convertHandler.js");

var convertHandler = new ConvertHandler();
const INVALID_NUMBER = "invalid number";
const INVALID_UNIT = "invalid unit";

suite("Unit Tests", function () {
  suite("Function convertHandler.getNum(input)", function () {
    test("Whole number input", function (done) {
      var input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", function (done) {
      var input = "0.5kg";
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test("Fractional Input", function (done) {
      var input = "2/8mi";
      assert.equal(convertHandler.getNum(input), 0.25);
      done();
    });

    test("Fractional Input w/ Decimal", function (done) {
      var input = "7.5/2.5";
      assert.equal(convertHandler.getNum(input), 3);
      done();
    });

    test("Invalid Input (double fraction)", function (done) {
      var input = "10//10kg";
      assert.equal(convertHandler.getNum(input), INVALID_NUMBER);
      done();
    });

    test("No Numerical Input", function (done) {
      var input = "lbs";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      var inputs = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      inputs.forEach(function (input) {
        assert.equal(convertHandler.getUnit(input), input);
      });
      done();
    });

    test("Unknown Unit Input", function (done) {
      var input = "10yards";
      assert.equal(convertHandler.getUnit(input), INVALID_UNIT);
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      var inputs = ["gal", "l", "mi", "km", "lbs", "kg"];
      var expect = ["l", "gal", "km", "mi", "kg", "lbs"];
      inputs.forEach(function (input, i) {
        assert.equal(convertHandler.getReturnUnit(input), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      var inputs = ["gal", "l", "mi", "km", "lbs", "kg"];
      var expect = [
        "gallons",
        "litres",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];
      inputs.forEach(function (input, i) {
        assert.equal(convertHandler.spellOutUnit(input), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function () {
    test("Gal to L", function (done) {
      var input = [5, "gal"];
      var expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("L to Gal", function (done) {
      var input = [2.2, "l"];
      var expected = 0.58117;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Mi to Km", function (done) {
      var input = [100, "mi"];
      var expected = 160.934;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Km to Mi", function (done) {
      var input = [16.00001, "km"];
      var expected = 9.94197;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Lbs to Kg", function (done) {
      var input = [25, "lbs"];
      var expected = 11.3398;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Kg to Lbs", function (done) {
      var input = [0.02, "kg"];
      var expected = 0.00907;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });
  });

  suite("Function convertHandler.getString(unit)", function () {
    test("With valid initial input and conversions", function (done) {
      var initNum = 10,
        initUnit = "gallons",
        returnNum = 37.8541,
        returnUnit = "liters";
      var expect = "10 gallons converts to 37.8541 liters";
      assert.equal(
        convertHandler.getString(initNum, initUnit, returnNum, returnUnit),
        expect
      );
      done();
    });
  });
});
