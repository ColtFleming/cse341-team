const validator = require("../helpers/validate");

const saveRosterMember = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    number: "required|integer",
    position: "required|string",
    shoots: "required|string",
    height: "required|string",
    weight: "required|string",
    birthday: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveRosterMember,
};
