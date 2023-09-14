const { response } = require("express");
const Events = require("../models/Events");
const getEventos = async (req, res = response) => {
  const eventos = await Events.find().populate("user", "name");
  res.json({
    ok: true,
    msg: "getEventos",
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  // console.log(req.body);
  const evento = new Events(req.body);
  try {
    evento.user = req.uid;
    const savedEvt = await evento.save();
    res.json({
      ok: true,
      evento: savedEvt,
      msg: "Se guardo el nuevo evento correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "No se pudo guardar el Evento",
    });
  }
  res.json({
    ok: true,
    msg: "crearEvento",
  });
};

const actualizarEvento = (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarEvento",
  });
};

const eliminarEvento = (req, res = response) => {
  res.json({
    ok: true,
    msg: "eliminarEvento",
  });
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
