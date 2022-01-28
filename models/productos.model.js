const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const ProductosSchema = new Schema({
	// defino el schema del usuario
	nombre: {
		type: String,
		required: [true, "El nombre es obligatorio"],
	},
	estado: {
		type: Boolean,
		default: true,
	},
	usuario: {
		type: Schema.Types.ObjectId,
		ref: "Usuario",
	},
	categoria: {
		type: Schema.Types.ObjectId,
		ref: "Categoria",
		required: [true, "Ingrese una categoria valida"],
	},
	precio: {
		type: Number,
		required: [true, "El precio es obligatorio"],
	},
	descripcion: {
		type: String,
	},
	disponible: {
		type: Boolean,
		default: true,
	},
	img: {
		type: String,
	},
});

const Producto = mongoose.model("Producto", ProductosSchema);

module.exports = Producto;
