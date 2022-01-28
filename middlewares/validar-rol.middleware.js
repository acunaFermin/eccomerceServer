const { request, response } = require("express");

const validarRol = (req = request, res = response, next) => {
	const user = req.authUser;

	try {
		if (user.rol === "ADMIN_ROLE") {
			next();
		} else {
			return res.status(400).json({
				msg: "Necesita permisos de administrador para ejecutar esta tarea",
			});
		}
	} catch (err) {
		res.status(500).json({
			msg: "error al validar el rol",
		});
		throw new Error("Error, no se pudo validar el rol");
	}
};

module.exports = validarRol;
