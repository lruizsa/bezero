let url = "../server/index.php";
let url1 = "../server/sinopsis.php";


function peliculaList(){
    let http = new XMLHttpRequest();

    http.onreadystatechange = function(){
        if (this.readyState === 4) {
            if (this.status === 200) {
                let pelikuList = getPelikulak(this.responseXML);
                idatzi(pelikuList);
            } else {
                console.error("Error fetching movie data: " + this.statusText);
            }
        }
    };
    
    http.open('POST', url, true);
    http.send();
}

function getPelikulak(lista) {
    if (lista && lista.documentElement) {
        return lista.getElementsByTagName("Pelicula");
    } else {
        console.error("Invalid XML response");
        return [];
    }
}

function idatzi(lista) {
    let pelikulaListaContainer = document.getElementById("pelikulaLista");

    pelikulaListaContainer.innerHTML = '';

    for (let i = 0; i < lista.length; i++) {
        let pelikula = lista[i];

        let izena = pelikula.getElementsByTagName("Titulo")[0].textContent;
        let zuzendaria = pelikula.getElementsByTagName("Director")[0].textContent;
        let irudia = pelikula.getElementsByTagName("imagen")[0].textContent;
        let sinpsis = pelikula.getElementsByTagName("sinopsis")[0].textContent;

        let idatzi = `
            <div id=${sinpsis}>
                <img src="../server/imagenes/${irudia}" alt="Image of ${izena}">
                <h1>${izena}</h1>
                <h3>${zuzendaria}</h3>
                <input type="button" value="${sinpsis}" onclick="sinop(this.value, '${sinpsis}')">
            </div>`;

        document.getElementById("pelikulaLista").innerHTML += idatzi;
    }
}

function sinop(sinp, izena){
    console.log(izena);

    let http = new XMLHttpRequest();
    http.onreadystatechange = function(){
        if(http.readyState == 4 && http.status == 200){
            let erantzuna = http.responseText;
            document.getElementById(izena).innerHTML+=`
                <p>${erantzuna}</p>
            `;
        }
    };
    
    let urlWithParams = `${url1}?fichero=${encodeURIComponent(izena)}`;
    http.open("GET", urlWithParams, true);
    http.send();
}


peliculaList();