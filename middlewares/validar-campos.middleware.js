const { validationResult } = require("express-validator");

//middleware personalizado, se agrega el next como tercer argumento,
// indicando que si todo sale bien pasa al siguiente middleware
const validarCampos = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}

	next();
};

module.exports = validarCampos;
