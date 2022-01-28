const mongoose = require("mongoose");
require("dotenv").config();

dbConnection = async () => {
	await mongoose
		.connect(process.env.MONGODB_CNN)
		.then(console.log("base de datos online"))
		.catch((err) => console.log(err));
};

module.exports = dbConnection;
