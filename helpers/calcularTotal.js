const calcularTotal = (productos = []) => {
	let total = 0;

	productos.forEach((producto) => {
		total += producto.precio * producto.cantidad;
	});

	return total;
};

module.exports = calcularTotal;
