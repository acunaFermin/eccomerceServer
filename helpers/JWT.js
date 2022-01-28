const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
	return new Promise((resolve, reject) => {
		jwt.sign({ uid }, process.env.JWTSECRETKEY, (err, token) => {
			if (err) {
				console.log(err);
				reject("No se pudo generar el token");
			} else {
				resolve(token);
			}
		});
	});
};

module.exports = generarJWT;
