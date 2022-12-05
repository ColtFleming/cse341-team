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

const saveTeamStats = (req, res, next) => {
  const validationRule = {
    teamName: "required|string",
    goalsFor: "required|integer",
    goalsAgainst: "required|integer",
    wins: "required|integer",
    losses: "required|integer",
    overtimeLosses: "required|integer",
    pointTotal: "required|integer",
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
  saveTeamStats
};
