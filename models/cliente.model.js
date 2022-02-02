const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const ClienteSchema = new Schema({
	nombre: {
		type: String,
		required: [true, "El nombre es obligatorio"],
	},
	dni: {
		type: Number,
		required: [true, "El DNI es obligatorio"],
	},
	correo: {
		type: String,
		unique: true,
	},

	img: {
		type: String,
	},

	estado: {
		type: Boolean,
		default: true,
	},
});

//saca __v, password de la respuesta cuando se devuelve el usuario creado
ClienteSchema.methods.toJSON = function () {
	const { __v, password, _id, ...usuario } = this.toObject();
	usuario.uid = _id; // cambiar el _id por uid, solo para que se vea uid en vez de _id
	return usuario;
};

//defino un modelo de usuario
const Cliente = mongoose.model("Cliente", ClienteSchema);
module.exports = Cliente;
