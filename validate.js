const _ = require("lodash");

module.exports = function validate(data, type, asOp) {
  if (!data) return "Function Expects First Parameter";
  if (!Array.isArray(data)) return "Function Expects Array As First Parameter";

  if (data.length == 0)
    return "Function Expects at Least One Element As First Parameter";

  if (type != "excel" && type != "pdf")
    return "Function Expects (excel | pdf) as Second Parameter";

  if (Array.isArray(asOp)) {
    if (asOp.length == 0) return;
    ("Function Expects Array with at least one Element For Third Parameter");
  } else asOp = undefined;

  return {
    data,
    type,
    asOp,
  };
};
