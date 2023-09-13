const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  //x-token headers
  const token = req.header("x-token");
  // console.log(token);
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en el Header",
    });
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.JWT_TOKEN);
    // console.log(payload);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    // console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Token no válido!",
    });
  }
  next();
};

module.exports = {
  validarJWT,
};
