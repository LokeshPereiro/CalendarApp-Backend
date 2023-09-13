const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  registrarUsuario,
  loginUsuario,
  renovarToken,
} = require("../controllers/auth");
const { validarJWT } = require("../middlewares/validarJWT");
const { validarInputFields } = require("../middlewares/validarInputFields");

router.post(
  "/",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check(
      "password",
      "La contraseña tiene que tener al menos 6 caracteres"
    ).isLength({ min: 4 }),
    validarInputFields,
  ],
  loginUsuario
);

router.post(
  "/register",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    check(
      "password",
      "La contraseña tiene que tener al menos 6 caracteres"
    ).isLength({ min: 4 }),
    validarInputFields,
  ],
  registrarUsuario
);

router.get("/renew", validarJWT, renovarToken);

module.exports = router;
