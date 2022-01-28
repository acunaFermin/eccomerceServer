const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const UsersRoles = new Schema({
	// defino el schema del usuario
	role: {
		type: String,
		required: [true, "El rol es obligatorio"],
	},
});

const Roles = mongoose.model("Role", UsersRoles);
module.exports = Roles;
