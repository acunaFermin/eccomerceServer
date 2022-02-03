const Response = require("express");
const request = require("express");
const bcryptjs = require("bcryptjs");

const Cliente = require("../models/cliente.model");

const clientesGet = async (req = request, res = Response) => {
	const { from, limit } = req.query; //logica para paginacion

	const [clientes, cantidadTotal] = await Promise.all([
		Cliente.find({
			estado: "true",
		})
			.skip(from)
			.limit(limit),
		Cliente.where({
			estado: "true",
		}).countDocuments(),
	]);

	res.json({
		msg: `Mostrando ${clientes.length} de ${cantidadTotal} registros`,
		clientes,
	});
};

const clientesPut = async (req = request, res = Response) => {
	const id = req.params.id;

	const { _id, estado, ...values } = req.body;

	const cliente = await Cliente.findByIdAndUpdate(id, values);

	res.json({
		msg: "cliente actualizado",
		values,
		cliente,
	});
};

const clientesPost = async (req = request, res = Response) => {
	try {
		const { nombre, dni, correo } = req.body;

		const cliente = new Cliente({ nombre, dni, correo }); //todo lo que venga en el body que no pertenzca al schema de cliente, moongose lo va a ignorar automaticamente

		//guardar cliente en la base de datos
		await saveClient(cliente);
		res.json({
			msg: "nuevo cliente creado",
			cliente,
		});
	} catch (err) {
		res.json({
			msg: "Error al guardar cliente",
		});

		console.log(err);
		throw new Error(err);
	}
};

const saveClient = async (cliente) => {
	try {
		await cliente.save();
	} catch (error) {
		console.log(error);
		throw new Error("Error a la hora de guardar cliente");
	}
};

const clientesDelete = async (req = request, res = Response) => {
	const id = req.params.id;
	const cliente = await Cliente.findByIdAndUpdate(id, { estado: false });

	const authUser = req.authUser;

	res.json({
		msg: `El cliente ${cliente.nombre} ha sido eliminado por ${authUser.nombre}`,
	});
};

const clientesPatch = (req = request, res = Response) => {
	res.json({
		ok: true,
		msg: "peticion patch",
	});
};

module.exports = {
	clientesGet,
	clientesPut,
	clientesPost,
	clientesDelete,
	clientesPatch,
};
