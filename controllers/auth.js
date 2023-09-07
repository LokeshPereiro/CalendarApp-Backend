const { response } = require("express"); // Nos ayuda con el JS Inteligence cuando borrarmos todo el código
const { validationResult } = require("express-validator");

const registrarUsuario = (req, res = response) => {
  //   console.log(req.body);
  const { name, email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: "Register Route",
    name,
    email,
    password,
  });
};

const loginUsuario = (req, res = response) => {
  const { email, password } = req.body;

  res.json({
    msg: "Login Route",
    ok: true,
    email,
    password,
  });
};

const renovarToken = (req, res) => {
  res.json({
    msg: "Renew Route",
    ok: true,
  });
};

module.exports = { registrarUsuario, loginUsuario, renovarToken };
