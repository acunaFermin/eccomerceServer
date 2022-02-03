const express = require("express");
const cors = require("cors");
const dbConnection = require("../database/database.config");
require("dotenv").config();
const fileUpload = require("express-fileupload");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		this.path = {
			usuarios: "/api/usuarios",
			clientes: "/api/clientes",
			auth: "/api/auth",
			categ: "/api/categorias",
			prod: "/api/productos",
			buscar: "/api/buscar",
			cargar: "/api/cargar",
		};

		this.dbConnection();
		this.middlewares();
		this.routes();
	}

	//conexion con mongoDB
	dbConnection = async () => {
		await dbConnection();
	};

	middlewares() {
		this.app.use(cors()); // configuracion del cors
		this.app.use(express.json()); //lectura y parseo del body
		this.app.use(express.static("public")); // configuracion de la pagina estatica public
		this.app.use(
			fileUpload({
				//Fileupload - carga de archivos
				useTempFiles: true,
				tempFileDir: "/tmp/",
				createParentPath: true,
			})
		);
	}

	routes() {
		this.app.use(this.path.auth, require("../routes/auth.routes"));
		this.app.use(this.path.usuarios, require("../routes/usuarios.routes"));
		this.app.use(this.path.categ, require("../routes/categorias.routes"));
		this.app.use(this.path.prod, require("../routes/productos.routes"));
		this.app.use(this.path.buscar, require("../routes/buscar.routes"));
		this.app.use(this.path.cargar, require("../routes/uploads.routes"));
		this.app.use(this.path.clientes, require("../routes/clientes.routes"));
	}
	cargar;

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Aplicacion corriendo en puerto ${this.port}`);
		});
	}
}

module.exports = Server;
