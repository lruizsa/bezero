class Galdera {
    constructor(id) {
        this.id = id;
        this.galdera = '';
        this.mota = '';
        this.erantzunak = [];
    }   

    getId() {
        return this.id;
    }

    getGaldera() {
        return this.galdera;
    }

    getMota() {
        return this.mota;
    }

    getErantzunak() {
        return this.erantzunak;
    }

    setGaldera(galdera) {
        this.galdera = galdera;
    }

    setMota(mota) {
        this.mota = mota;
    }

    setErantzunak(erantzunak) {
        this.erantzunak = erantzunak;
    }
}

// Variables globales
let lista = [];
let contadorGaldera = 0;
let contadorErantzuna = 0;

// Función para añadir una nueva pregunta
function sekzioaGehitu() {
    contadorGaldera++;
    let galderaHTML = `
    <div class="galdera-container" id="galdera-${contadorGaldera}">
        <h3>G${contadorGaldera}</h3>
        <div class="galdera">
            <label>Galdera:</label>
            <input type="text" id="galdera-izena-${contadorGaldera}">
        </div>
        <div class="galdera">
            <label>Mota:</label>
            <select id="option-${contadorGaldera}" onchange="aukerak(this, ${contadorGaldera})">
                <option value="">Aukeratu mota</option>
                <option value="0">Testua</option>
                <option value="1">Erantzun posible bakarrekoa</option>
                <option value="2">Erantzun posible anitzekoak</option>
            </select>
        </div> 
        <div id="datu-${contadorGaldera}"></div> 
        <button type="button" onclick="galderaGorde(${contadorGaldera})">Galdera Gorde</button>
        <button type="button" onclick="galderaEzabatu(${contadorGaldera})">Galdera Ezabatu</button>
    </div>
    `;

 // Usamos insertAdjacentHTML para no reescribir contenido existente
 document.getElementById('galdera').insertAdjacentHTML('beforeend', galderaHTML);
}

// Función para mostrar opciones de respuesta según el tipo seleccionado
function aukerak(aukera, galderaId) {
    let testua = `
        <div class="galdera" id="erantzun-${contadorErantzuna}">
            <label>Erantzuna:</label>
            <input type="text" id="erantzun-input-${contadorErantzuna}">
            <label>
                <input type="checkbox" id="zuzena-${contadorErantzuna}">
                Zuzena
            </label>
        </div>   
    `;
    let bakarra = `
        <div class="galdera" id="erantzun-${contadorErantzuna}">
            <label>Erantzuna:</label>
            <input type="text" id="erantzun-input-${contadorErantzuna}">
            <label>
                <input type="checkbox" id="zuzena-${contadorErantzuna}">
                Zuzena
            </label>
        </div>
        <div class="galdera" onclick="bakarra(${galderaId})">
            <button type="button">Erantzun Berria Gehitu</button>
        </div>
    `;
    let anitza = `
        <div class="galdera" id="erantzun-${contadorErantzuna}">
            <label>Erantzuna:</label>
            <input type="text" id="erantzun-input-${contadorErantzuna}">
            <label>
                <input type="checkbox" id="zuzena-${contadorErantzuna}">
                Zuzena
            </label>
        </div>
        <div class="galdera" onclick="anitza(${galderaId})">
            <button type="button">Erantzun Berria Gehitu</button>
        </div>
    `;

    if (aukera.value == 0) {
        document.getElementById(`datu-${galderaId}`).innerHTML = testua;
    } else if (aukera.value == 1) {
        document.getElementById(`datu-${galderaId}`).innerHTML = bakarra;
    } else if (aukera.value == 2) {
        document.getElementById(`datu-${galderaId}`).innerHTML = anitza;
    }
}

// Función para guardar una pregunta en el array `lista`
function galderaGorde(galderaId) {
    let galderaIzena = document.getElementById(`galdera-izena-${galderaId}`).value;
    let mota = document.getElementById(`option-${galderaId}`).value;
    let erantzunak = [];

    // Validación del título (5-80 caracteres)
    if (galderaIzena.length < 5 || galderaIzena.length > 80) {
        alert("Galderaren izenak 5 eta 80 karaktere artean izan behar ditu.");
        return; // Salimos de la función si no cumple la validación
    }

    // Seleccionar todos los inputs y checkboxes en el contenedor correspondiente
    let erantzunElementos = document.querySelectorAll(`#datu-${galderaId} .galdera`);
    erantzunElementos.forEach(elemento => {
        let erantzunInput = elemento.querySelector('input[type="text"]');
        let zuzenaCheckbox = elemento.querySelector('input[type="checkbox"]');

        if (erantzunInput && zuzenaCheckbox) {
            erantzunak.push({
                erantzun: erantzunInput.value,
                zuzena: zuzenaCheckbox.checked
            });
        }
    });

    // Crear el objeto Galdera y agregarlo a la lista
    let galderaObj = new Galdera(galderaId);
    galderaObj.setGaldera(galderaIzena);
    galderaObj.setMota(mota);
    galderaObj.setErantzunak(erantzunak);

    lista.push(galderaObj);
    console.log("Guardado:", galderaObj);
}


// Función para eliminar una pregunta del array y del DOM
function galderaEzabatu(galderaId) {
    document.getElementById(`galdera-${galderaId}`).remove(); // Visualmente borrado
    lista = lista.filter(galdera => galdera.getId() !== galderaId); // Filtrar del array
    console.log("Lista actualizada:", lista);
}

// Función para agregar una respuesta adicional en el caso de una pregunta de tipo único
function bakarra(galderaId) {
    contadorErantzuna++;
    let erantzunaHTML = `
        <div class="galdera" id="erantzun-${contadorErantzuna}">
            <label>Erantzuna:</label>
            <input type="text" id="erantzun-input-${contadorErantzuna}">
            <label>
                <input type="checkbox" id="zuzena-${contadorErantzuna}">
                Zuzena
            </label>
        </div>
    `;
    let contenedor = document.getElementById(`datu-${galderaId}`);
    if (contenedor.childElementCount < 7) { 
        contenedor.innerHTML += erantzunaHTML;
    }
}

// Función para agregar una respuesta adicional en el caso de una pregunta de tipo múltiple
function anitza(galderaId) {
    contadorErantzuna++;
    let erantzunaHTML = `
        <div class="galdera" id="erantzun-${contadorErantzuna}">
            <label>Erantzuna:</label>
            <input type="text" id="erantzun-input-${contadorErantzuna}">
            <label>
                <input type="checkbox" id="zuzena-${contadorErantzuna}">
                Zuzena
            </label>
        </div>
    `;
    let contenedor = document.getElementById(`datu-${galderaId}`);
    if (contenedor.childElementCount < 9) { 
        contenedor.innerHTML += erantzunaHTML;
    }
}

// Función para mostrar todos los datos en una nueva ventana
function mostrarDatos() {
    let nuevaVentana = window.open("", "_blank");
    nuevaVentana.document.write("<h2>Galdera Lista</h2>");
    lista.forEach(galdera => {
        nuevaVentana.document.write(`<h3>Galdera ID: ${galdera.getId()}</h3>`);
        nuevaVentana.document.write(`<p>Galdera: ${galdera.getGaldera()}</p>`);
        nuevaVentana.document.write(`<p>Mota: ${galdera.getMota()}</p>`);
        nuevaVentana.document.write("<p>Erantzunak:</p><ul>");
        galdera.getErantzunak().forEach(erantzunObj => {
            nuevaVentana.document.write(`<li>${erantzunObj.erantzun} - Zuzena: ${erantzunObj.zuzena ? "Bai" : "Ez"}</li>`);
        });
        nuevaVentana.document.write("</ul>");
    });
}
