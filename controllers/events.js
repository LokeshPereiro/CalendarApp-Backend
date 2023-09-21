const { response } = require("express");
const Events = require("../models/Events");
const getEventos = async (req, res = response) => {
  const eventos = await Events.find().populate("user", "name"); //info del user que creó el evento
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
    //?Referencia al user y su uid
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
      msg: "No se pudo crear el Evento",
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  const evtId = req.params.id;
  // console.log(evtId);
  const uid = req.uid;
  // console.log(uid);
  try {
    const event = await Events.findById(evtId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: `No hay ningún event con ese id: ${evtId}`,
      });
    } else if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Este evento no puedes editar porque no es tuyo!",
      });
    }
    // if (event.user.toString() !== uid) {
    //   return res.status(401).json({
    //     ok: false,
    //     msg: "No puedes editar este evento",
    //   });
    // }

    const nuevoEventoActualizado = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Events.findByIdAndUpdate(
      evtId,
      nuevoEventoActualizado,
      { new: true }
    );

    res.json({
      ok: true,
      evento: eventoActualizado,
      msg: "Se actualizó correctamente!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Algo salió mal",
    });
  }
  // res.json({
  //   ok: true,
  //   msg: "actualizarEvento",
  //   evtId,
  // });
};

const eliminarEvento = async (req, res = response) => {
  const evtId = req.params.id;
  const uid = req.uid;
  // console.log(evtId);

  try {
    const event = await Events.findById(evtId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: `No hay ningún event con ese id: ${evtId}`,
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No puedes eliminar este evento, No es tuyo",
      });
    }

    await Events.findByIdAndDelete(evtId);

    res.json({
      ok: true,
      msg: "Se elimino el evento correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Algo salió mal",
    });
  }
  // res.json({
  //   ok: true,
  //   msg: "eliminarEvento",
  // });
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
