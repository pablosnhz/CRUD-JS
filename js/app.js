import { Gift } from './clases.js';
import { cargaDeDatos } from './funciones.js'; 

let datos = [];

const cuerpoTabla = document.querySelector('#cuerpo-tabla');
const myModal = new bootstrap.Modal(document.getElementById('modalGift'))

let idGitUpdate = null

window.mostrarModal = (id) => {
    console.log(id);
    idGitUpdate = id;
    let index = datos.findIndex((item) => item.id == idGitUpdate);

    document.querySelector('#giftModal').value = datos[index].gift;
    document.querySelector('#tipoModal').value = datos[index].tipo;
    document.querySelector('#tiempoModal').value = datos[index].tiempo;
    document.querySelector('#precioModal').value = datos[index].precio;
    document.querySelector('#imagenModal').value = datos[index].imagen;

    myModal.show()
}

const giftUpdate = (e) => {
    e.preventDefault()

    let index = datos.findIndex((item) => item.id == idGitUpdate);

    datos[index].gift = document.querySelector('#giftModal').value;
    datos[index].tipo = document.querySelector('#tipoModal').value;
    datos[index].tiempo = document.querySelector('#tiempoModal').value;
    datos[index].precio = document.querySelector('#precioModal').value;
    datos[index].imagen = document.querySelector('#imagenModal').value;


    localStorage.setItem('datos', JSON.stringify(datos));
    cargarTabla()
    myModal.hide();
}

const cargarTabla = () => {
    
    datos = JSON.parse(localStorage.getItem('datos')); // LOCAL STORAGE

    cuerpoTabla.innerHTML = ''; // limpia el form para nuevos datos reset()

    datos.map((item)=> {
        const fila = document.createElement('tr')

        const celdas = `<th>${item.gift}</th>
                        <td>${item.tipo}</td>
                        <td>${item.tiempo}</td>
                        <td>$${item.precio}</td>
                        <td>
                            <div class="d-flex gap-2">
                                <button class="btn btn-outline-warning" onclick="mostrarModal(${item.id})">
                                <i class="fa fa-pencil" aria-hidden="true"></i></button>
                                <button class="btn btn-outline-danger" onclick="borrarGift(${item.id})">
                                <i class="fa fa-times" aria-hidden="true"></i></button>
                             </div>
                        </td>`;

        fila.innerHTML = celdas;
        cuerpoTabla.append(fila);

    })
};

const agregarGift = (event) => {
    event.preventDefault();

    let id = datos.at(-1).id + 1; // si solo tengo 3 elementos en la clase gif con este habria un 4,5,6...
    let gift = document.querySelector('#gift').value;
    let tipo = document.querySelector('#tipo').value;
    let tiempo = document.querySelector('#tiempo').value;
    let precio = document.querySelector('#precio').value;
    let imagen = document.querySelector('#imagen').value;

    datos.push(new Gift(id, gift, tipo, tiempo, precio, imagen));
    document.querySelector("#formGift").reset(); // limpia cambios luego de subir los datos
    
    localStorage.setItem('datos', JSON.stringify(datos)); // LOCAL STORAGE
    cargarTabla();
};

window.borrarGift = (id) => {

    let index = datos.findIndex((item)=> item.id == id)

    let validar = confirm(`Esta seguro/a que quiere eliminar la gift card ${datos[index].gift}?`)

    if(validar){
        datos.splice(index, 1);
        localStorage.setItem('datos', JSON.stringify(datos));
        cargarTabla();
    }

}

cargaDeDatos()
cargarTabla()

document.querySelector('#formGift').addEventListener('submit', agregarGift);
document.querySelector('#formModal').addEventListener('submit', giftUpdate);
