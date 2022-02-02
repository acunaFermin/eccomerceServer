const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const TransaccionesSchema = new Schema({
	vendedor: {
		type: Schema.Types.ObjectId,
		ref: "Usuario",
	},
	cliente: {
		type: Schema.Types.ObjectId,
		ref: "Cliente",
	},

	productos: {
		type: Schema.Types.Array,
		ref: "Producto",
	},
	descripcion: {
		type: String,
	},
});

const Transacciones = mongoose.model("Transacciones", TransaccionesSchema);

module.exports = Transacciones;
