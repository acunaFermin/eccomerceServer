const {
	mostrarImagen,
	cargarArchivo,
	actualizarImagen,
} = require("../controllers/uploads.controllers");

const { login, googleSignIn } = require("../controllers/auth.controllers");
const buscar = require("../controllers/buscar.controller");

const {
	getCategorias,
	getCatById,
	crearCategoria,
	actualizarCategoria,
	deleteCategoria,
} = require("../controllers/categorias.controller");

const {
	getProductos,
	getProdById,
	crearProducto,
	actualizarProducto,
	deleteProducto,
} = require("../controllers/productos.controller");

const {
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosDelete,
	usuariosPatch,
} = require("../controllers/usuarios.controllers");

const {
	clientesGet,
	clientesPut,
	clientesPost,
	clientesDelete,
	clientesPatch,
} = require("../controllers/clientes.controllers");

const nuevaTransaccion = require("../controllers/transacciones.controller");

module.exports = {
	mostrarImagen,
	cargarArchivo,
	actualizarImagen,
	login,
	googleSignIn,
	buscar,
	getCategorias,
	getCatById,
	crearCategoria,
	actualizarCategoria,
	deleteCategoria,
	getProductos,
	getProdById,
	crearProducto,
	actualizarProducto,
	deleteProducto,
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosDelete,
	usuariosPatch,
	clientesGet,
	clientesPut,
	clientesPost,
	clientesDelete,
	clientesPatch,
	nuevaTransaccion,
};
