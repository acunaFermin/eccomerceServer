const request = require("express");
const response = require("express");
const bcryptjs = require("bcryptjs");
const generarJWT = require("../helpers/JWT");
const Usuario = require("../models/usuario.model");
const googleVerify = require("../helpers/google-verify");

const login = async (req = request, res = response) => {
	const { correo, password } = req.body;

	try {
		//verificar sii el mail existe, y que el usuario no haya sido eliminado
		const usuario = await Usuario.where({ estado: true }).findOne({
			correo: correo,
		});

		if (!usuario) {
			return res.status(400).json({
				msg: "El usuario no es valido",
			});
		}

		//verificar el password
		const validPass = bcryptjs.compareSync(password, usuario.password);
		if (!validPass) {
			return res.status(400).json({
				msg: "el password es incorrecto",
			});
		}

		//generar jwt
		const token = await generarJWT(usuario.id);

		res.json({
			msg: "Login ok",
			usuario,
			token,
		});
	} catch (err) {
		console.log(err);

		res.status(500).json({
			msg: "error, algo salio mal",
		});

		throw new Error(`algo salio mal :'( `);
	}
};

const googleSignIn = async (req = request, res = response) => {
	try {
		const { id_token } = req.body;
		const { nombre, correo, img } = await googleVerify(id_token);

		let usuario = await Usuario.findOne({ correo });

		//verificar si el usuario existe, si no existe agregar a la base de datos
		if (!usuario) {
			const data = {
				nombre,
				correo,
				password: "password",
				img,
				google: true,
				rol: "USER_ROLE",
			};

			usuario = new Usuario(data);
			await usuario.save();
		}

		//verificar el estado delo usuario
		if (!usuario.estado) {
			return res.status(401).json({
				msg: "Este usuario ha sido eliminado",
			});
		}

		//generar jwt
		const token = await generarJWT(usuario.id);

		res.json({
			msg: "todo ok",
			googleToken: id_token,
			usuario,
			token,
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			msg: "el token de google no se  pudo verificar",
		});
	}
};

module.exports = { login, googleSignIn };
