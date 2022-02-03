const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const UsuarioSchema = new Schema({
	// defino el schema del usuario
	nombre: {
		type: String,
		required: [true, "El nombre es obligatorio"],
	},
	correo: {
		type: String,
		required: [true, "El correo es obligatorio"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "La contrasena es obligatoria"],
	},
	img: {
		type: String,
	},
	rol: {
		type: String,
		required: true,
		enum: ["ADMIN_ROLE", "USER_ROLE"],
	},
	estado: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
});

//saca __v, password de la respuesta cuando se devuelve el usuario creado
// UsuarioSchema.methods.toJSON = function () {
// 	const { __v, password, _id, ...usuario } = this.toObject();
// 	usuario.uid = _id; // cambiar el _id por uid, solo para que se vea uid en vez de _id
// 	return usuario;
// };

//defino un modelo de usuario
const Usuario = mongoose.model("Usuario", UsuarioSchema);
module.exports = Usuario;
