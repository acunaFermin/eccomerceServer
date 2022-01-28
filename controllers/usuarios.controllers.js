const Response = require("express");
const request = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario.model");

const usuariosGet = async (req = request, res = Response) => {
	const { from, limit } = req.query; //logica para paginacion

	const [usuarios, cantidadTotal] = await Promise.all([
		Usuario.find({
			estado: "true",
		})
			.skip(from)
			.limit(limit),
		Usuario.where({
			estado: "true",
		}).countDocuments(),
	]);

	res.json({
		msg: `Mostrando ${usuarios.length} de ${cantidadTotal} registros`,
		usuarios,
	});
};

const usuariosPut = async (req = request, res = Response) => {
	const id = req.params.id;

	const { _id, estado, google, ...values } = req.body;
	// console.log(values.password);

	if (values.password) {
		console.log(values.password);
		// Encriptar password
		const salt = bcryptjs.genSaltSync(10);
		values.password = bcryptjs.hashSync(values.password, salt);
	}

	const usuario = await Usuario.findByIdAndUpdate(id, values);

	res.json({
		msg: "Usuario actualizado",
		values,
		usuario,
	});
};

const usuariosPost = async (req = request, res = Response) => {
	try {
		const { nombre, correo, password, rol } = req.body;

		const usuario = new Usuario({ nombre, correo, password, rol }); //todo lo que venga en el body que no pertenzca al schema de usuario, moongose lo va a ignorar automaticamente

		//Encriptar password
		const salt = bcryptjs.genSaltSync(10);
		usuario.password = bcryptjs.hashSync(password, salt);

		//guardar usuario en la base de datos
		await saveUser(usuario);
		res.json({
			msg: "nuevo usuario creado",
			usuario,
		});
	} catch (err) {
		res.json({
			msg: "Error al guardar usuario",
		});

		console.log(err);
		throw new Error(err);
	}
};

const saveUser = async (usuario) => {
	try {
		await usuario.save();
	} catch (error) {
		console.log(error);
		throw new Error("Error a la hora de guardar usuario");
	}
};

const usuariosDelete = async (req = request, res = Response) => {
	const id = req.params.id;
	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

	const authUser = req.authUser;

	res.json({
		msg: `El usuario ${usuario.nombre} ha sido eliminado por ${authUser.nombre}`,
	});
};

const usuariosPatch = (req = request, res = Response) => {
	res.json({
		ok: true,
		msg: "peticion patch",
	});
};

module.exports = {
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosDelete,
	usuariosPatch,
};
