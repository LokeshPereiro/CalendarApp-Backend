const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const { validarInputFields } = require("../middlewares/validarInputFields");
const router = Router();
//* Todas tienen que pasar por la validación JWT
router.use(validarJWT);
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");

//* Obtener events
router.get("/", getEventos);

//* Crear eventos
router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    validarInputFields,
  ],
  crearEvento
);

//* Actualizar eventos
router.put("/:id", actualizarEvento);

//* Borrar eventos
router.delete("/:id", eliminarEvento);

module.exports = router;
