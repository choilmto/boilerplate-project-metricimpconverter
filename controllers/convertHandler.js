/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

function ConvertHandler() {
  this.getNum = function (input) {
    var factor = input.split(/[A-Za-z]+/)[0].split("/");
    var numerator = factor[0] === "" ? 1 : parseFloat(factor[0]);
    var denominator = factor.length === 1 ? 1 : parseFloat(factor[1]);
    var result = numerator / denominator;
    if (Number.isNaN(result) || factor.length > 2) {
      return "invalid number";
    }
    return result;
  };

  this.getUnit = function (input) {
    var factorLength = input.split(/[A-Za-z]+/)[0].length;
    var unit = input.substring(factorLength);
    var result = unit.toLowerCase().match(/^(gal|l|mi|km|lbs|kg)$/);
    if (result === null) {
      return "invalid unit";
    }
    return unit;
  };

  this.getReturnUnit = function (initUnit) {
    const imperialToMetric = {
      gal: "l",
      mi: "km",
      lbs: "kg",
    };
    const metricToImperial = {
      l: "gal",
      km: "mi",
      kg: "lbs",
    };
    var unit = initUnit.toLowerCase();
    var result = imperialToMetric[unit] || metricToImperial[unit];
    return result;
  };

  this.spellOutUnit = function (unit) {
    const fullForm = {
      gal: "gallons",
      l: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };
    var result = fullForm[unit.toLowerCase()];
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const conversions = {
      gal: galToL,
      l: 1 / galToL,
      lbs: lbsToKg,
      kg: 1 / lbsToKg,
      mi: miToKm,
      km: 1 / miToKm,
    };
    var result = initNum * conversions[initUnit.toLowerCase()];
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    var result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
