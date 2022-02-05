const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const ProductosSchema = new Schema({
	// defino el schema del usuario
	nombre: {
		type: String,
		required: [true, "El nombre es obligatorio"],
	},
	marca: {
		type: String,
		default: "no especificado",
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
	precio_compra: {
		type: Number,
		required: [true, "El precio de compra es obligatorio"],
	},
	precio_venta: {
		type: Number,
		required: [true, "El precio de venta es obligatorio"],
	},
	margen: {
		type: Number,
	},

	descripcion: {
		type: String,
	},
	disponible: {
		type: Boolean,
		default: true,
	},
	stock: {
		type: Number,
		default: 0,
	},
	minStock: {
		type: Number,
		default: 0,
	},

	img: {
		type: String,
	},
});

const Producto = mongoose.model("Producto", ProductosSchema);

module.exports = Producto;
