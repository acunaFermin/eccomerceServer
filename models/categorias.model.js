const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const CategoriaSchema = new Schema({
	// defino el schema del usuario
	nombre: {
		type: String,
		required: [true, "El nombre es obligatorio"],
	},
	estado: {
		type: Boolean,
		default: true,
		required: [true],
	},
	usuario: {
		type: Schema.Types.ObjectId,
		ref: "Usuario",
		required: true,
	},
});

module.exports = mongoose.model("Categoria", CategoriaSchema);
