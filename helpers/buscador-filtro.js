//terminos: string = "fermin acuna 30"
//items: array [{ nombre: "fermin", apellido:"acuna", edad:"30"},{ nombre: "carlos", apellido:"perez", edad:"50"} ]
//return { nombre: "fermin", apellido:"acuna", edad:"30"}
let itemsFiltrados = [];

const filtroBusqueda = (terminos, items) => {
	terminos.forEach((termino) => {
		const terminoRegex = new RegExp(termino, "i");

		items.forEach((item) => {
			let itemFilter = filtro(item, terminoRegex);
			if (itemFilter) {
				itemsFiltrados.push(itemFilter);
			}
		});
		items = itemsFiltrados;
		itemsFiltrados = [];
	});

	return items;
};

const filtro = (item, terminoRegex) => {
	const valores = Object.values(item._doc); //array de valores del item

	if (terminoRegex.test(valores.toString())) {
		//llevo el array valores a string, y comparo con terminoRegex
		return item;
	}
};

module.exports = filtroBusqueda;
