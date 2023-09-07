const { response } = require("express");
const { validationResult } = require("express-validator");

const validarInputFields = (req, res = response, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  //! Next se ejecuta cuando no hay errores
  next();
};

module.exports = { validarInputFields };
