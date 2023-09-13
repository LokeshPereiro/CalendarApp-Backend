const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
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
router.post("/", crearEvento);

//* Actualizar eventos
router.put("/:id", actualizarEvento);

//* Borrar eventos
router.delete("/:id", eliminarEvento);

module.exports = router;
