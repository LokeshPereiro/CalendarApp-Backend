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

const actualizarEvento = async (req, res = response) => {
  const evtId = req.params.id;
  const uid = req.uid;
  // console.log(evtId);

  try {
    const event = Events.findById(evtId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: `No hay ningún event con ese id: ${evtId}`,
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No puedes editar este evento",
      });
    }
    const nuevoEvento = {
      ...req.body,
      user: uid,
    };
    const eventoActualizado = await Events.findByIdAndUpdate(
      evtId,
      nuevoEvento,
      { new: true }
    );
    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Algo salió mal",
    });
  }
  res.json({
    ok: true,
    msg: "actualizarEvento",
  });
};

const eliminarEvento = async (req, res = response) => {
  const evtId = req.params.id;
  const uid = req.uid;
  // console.log(evtId);

  try {
    const event = Events.findById(evtId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: `No hay ningún event con ese id: ${evtId}`,
      });
    }
    if (event.user !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No puedes eliminar este evento",
      });
    }
    const nuevoEvento = {
      ...req.body,
      user: uid,
    };
    await Events.findByIdAndDelete(evtId, nuevoEvento, { new: true });
    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Algo salió mal",
    });
  }
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
