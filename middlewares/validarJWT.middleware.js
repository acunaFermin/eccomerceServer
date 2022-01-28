const jwt = require("jsonwebtoken");
const { response, request } = require("express");
const validarCampos = require("./validar-campos.middleware");
const Usuario = require("../models/usuario.model");

const validarJWT = async (req = request, res = response, next) => {
	const token = req.headers.jwt;

	console.log(token);

	if (!token) {
		res.status(401).json({
			msg: "no hay token en la peticion",
		});
	}

	try {
		const payload = jwt.verify(token, process.env.JWTSECRETKEY);
		console.log(payload);

		const User = await Usuario.findOne({ _id: payload.uid }); //usuariuo autenticado

		if (!User) {
			return res.status(401).json({
				msg: `El usuario no existe  en la base de datos`,
			});
		}

		if (!User.estado) {
			return res.status(401).json({
				msg: `El usuario ${User.nombre} ha sido  eliminado`,
			});
		}

		req.authUser = User;

		next();
	} catch {
		res.status(401).json({
			msg: "El token es invalido",
		});
	}
};

module.exports = validarJWT;
