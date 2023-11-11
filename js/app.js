import datos from '../data/data.json' assert {type: 'json'};
import { Gift } from './clases.js';

const cuerpoTabla = document.querySelector('#cuerpo-tabla');

const cargarTabla = () => {
    
    cuerpoTabla.innerHTML = ''; // limpia el form para nuevos datos reset()

    datos.map((item)=> {
        const fila = document.createElement('tr')

        const celdas = `<th>${item.gift}</th>
                        <td>${item.tipo}</td>
                        <td>${item.tiempo}</td>
                        <td>$${item.precio}</td>
                        <td>
                            <div class="d-flex gap-2">
                                <button class="btn btn-outline-warning">
                                <i class="fa fa-pencil" aria-hidden="true"></i></button>
                                <button class="btn btn-outline-danger">
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
    cargarTabla();
}

cargarTabla()

document.querySelector('#formGift').addEventListener('submit', agregarGift);

