const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const TransaccionesSchema = new Schema({
	usuario: {
		type: Schema.Types.ObjectId,
		ref: "Usuario",
		required: [true, "El usuario es obligatorio"],
	},

	cliente: {
		type: Schema.Types.ObjectId,
		ref: "Cliente",
		require: true,
	},

	productos: {
		type: Array,
	},

	total: {
		type: Number,
		default: 0,
	},

	descripcion: {
		type: String,
	},
});

const Transacciones = mongoose.model("Transacciones", TransaccionesSchema);

module.exports = Transacciones;
