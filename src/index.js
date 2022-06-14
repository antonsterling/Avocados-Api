const baseUrl = 'https://platzi-avo.vercel.app';
const appNode = document.querySelector('#app');

/*
API-INTERNACIONALIZACION
    1. Formato a fechas
    2. Formato a monedas
*/
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD',
    }).format(price);

    return newPrice;
}

  


//Conectarnos al servidor
window
fetch(`${baseUrl}/api/avo`)
    //Procesar la respuesta, y convertirla en JSON
    .then(respuesta => respuesta.json())
    //JSON -> Data -> Renderizar info browser
    .then(datos => {
        const todosLosItems = [];
        datos.data.forEach(element => {
            //Crear imagen
            const imagen = document.createElement('img');
            imagen.src = baseUrl + element.image;
            imagen.className = 'imagen';

            //Crear titulo
            const titulo = document.createElement('h2');
            titulo.textContent = element.name;
            titulo.className = 'titulo';
            //Crear precio
            const precio = document.createElement('div');
            precio.textContent = formatPrice(element.price);
            precio.className = 'precio'

            const descripcion = document.createElement('p');
            descripcion.textContent = element.attributes.description;
            descripcion.className = 'descripcion inactive';

            const contenedor = document.createElement('div');
            contenedor.className = 'contenedor';
            contenedor.append(imagen, titulo, precio, descripcion);
            todosLosItems.push(contenedor);
        });
        appNode.append(...todosLosItems);
    });

