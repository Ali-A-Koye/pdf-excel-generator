const _ = require("lodash");

module.exports = function ColumnGen(keys, type, asOp) {
  let cols = [];
  if (!asOp) {
    cols = _.map(keys, (el) => {
      return {
        header: el,
        key: el,
        width: type == "pdf" ? "*" : 40,
      };
    });
  } else {
    cols = _.map(asOp, (el) => {
        return {
          header: el.as,
          key: el.field,
          width: type == "pdf" ? "auto" : 40,
        };
      });

  }
 
  return cols
};
