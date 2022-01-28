const extension = (nombre = "") => {
	let nombreCortado = nombre.split(".");
	return nombreCortado[nombreCortado.length - 1];
};

module.exports = extension;
