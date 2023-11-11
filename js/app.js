import datos from '../data/data.json' assert {type: 'json'};
import { Gift } from './clases.js';

const cuerpoTabla = document.querySelector('#cuerpo-tabla');

const cargarTabla = () => {
    
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

cargarTabla()