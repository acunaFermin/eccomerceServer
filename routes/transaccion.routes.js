const { Router } = require("express");
const { check } = require("express-validator");
const { nuevaTransaccion } = require("../controllers");

const router = Router();

router.get("/", (req, res) => {
	res.json({ msj: "transaccion okela" });
});

router.post("/", nuevaTransaccion);

module.exports = router;
