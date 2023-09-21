const jwt = require("jsonwebtoken");

//{uid, name} es el payload, luego la firma para que verifique el token
const generarJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.JWT_TOKEN,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el Token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = { generarJWT };
