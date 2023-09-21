const { response } = require("express"); // Nos ayuda con el JS Inteligence cuando borrarmos todo el código
// const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const User = require("../models/User");

const registrarUsuario = async (req, res = response) => {
  const { name, email, password } = req.body;

  try {
    // const user = new User(req.body);
    // await user.save();

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Sorry, ese usuario ya existe con ese email",
      });
    }
    user = new User(req.body);
    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    //Token payload info to be sent, so that we could have token
    const token = await generarJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      email,
      token,
      msg: "RegisterRoute: Nuevo usuario registrado!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ops! Revise bien los datos introducidos",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Sorry, ese usuario no existe en la DB",
      });
    }
    //Confirmar la contraseña
    const validPassword = bcrypt.compareSync(password, user.password);
    // console.log(validPassword);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña Incorrecta",
      });
    }
    //Generar JWT
    const token = await generarJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ops! Las credenciales no son correctas!",
    });
  }
};

const renovarToken = async (req, res) => {
  const { uid, name } = req;
  const token = await generarJWT(uid, name);

  res.json({
    // msg: "RenewRoute: Token Válido",
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = { registrarUsuario, loginUsuario, renovarToken };
