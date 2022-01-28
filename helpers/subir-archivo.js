const path = require("path");
const extension = require("../helpers/extension");
const { v4: uuid } = require("uuid"); //renombro v4 as uuid

const subirArchivo = (
	archivo,
	extValidas = ["jpg", "png", "jpeg", "gif", "xlsx"],
	carpeta = ""
) => {
	return new Promise((resolve, reject) => {
		// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

		const extArchivo = extension(archivo.name);

		if (!extValidas.includes(extArchivo)) {
			reject(
				`No se permiten archivos con extension ${extArchivo} . Solo se permite ${extValidas}`
			);
		}

		const nombreTemp = uuid() + "." + extArchivo;

		const uploadPath = path.join(
			__dirname,
			"../uploads/",
			carpeta,
			nombreTemp
		);

		// Use the mv() method to place the file somewhere on your server
		archivo.mv(uploadPath, function (err) {
			if (err) {
				reject({
					msg: "ocurrio un error",
					err,
				});
			}
			resolve(nombreTemp);
		});
	});
};

module.exports = subirArchivo;
