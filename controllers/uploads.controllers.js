const { request, response } = require("express");
const fs = require("fs");
const path = require("path");
const { subirArchivo } = require("../helpers");
const { Producto, Usuario } = require("../models");

const cargarArchivo = async (req = request, res = response) => {
	const { archivo } = req.files;
	const extensiones = ["xlsx"];
	const carpeta = "nuevaCarpeta";
	try {
		const msg = await subirArchivo(archivo, extensiones, carpeta);
		res.json({ msg });
	} catch (err) {
		return res.status(400).json({
			msg: "algo salio mal",
			err,
		});
	}
};

const actualizarImagen = async (req = request, res = response) => {
	try {
		const { coleccion, id } = req.params;
		let modelo = {};

		switch (coleccion) {
			case "productos":
				modelo = await Producto.findById(id);
				if (!modelo) {
					return res.status(400).json({
						msg: `No existe un producto con el id: ${id}`,
					});
				}
				break;
			case "usuarios":
				modelo = await Usuario.findById(id);
				if (!modelo) {
					return res.status(400).json({
						msg: `No existe un usuario con el id: ${id}`,
					});
				}

				break;
			default:
				return res.status(500).json({
					msg: "error interno",
				});
				break;
		}

		//BORRAR IMAGENES PREVIAS
		const imgPath = path.join(
			__dirname,
			"../uploads",
			coleccion,
			modelo.img
		);

		//si existe el archivo
		if (fs.existsSync(imgPath)) {
			//lo borro
			fs.unlinkSync(imgPath);
		}

		//GUARDAR ARCHIVO EN EL SERVIDOR
		const nombre = await subirArchivo(req.files.archivo, "png", coleccion);
		//GUARDAR EL NOMBRE DEL ARCHIVO EN LA DB
		modelo.img = nombre;
		await modelo.save();

		res.json({
			modelo,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			err,
		});
	}
};

const servirImg = (req = request, res = response) => {
	res.json({
		msg: "todo re piola",
	});
};

module.exports = {
	cargarArchivo,
	actualizarImagen,
	servirImg,
};
