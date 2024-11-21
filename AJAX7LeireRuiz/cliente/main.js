window.onload = function () {
  
  function kargatuProbintziak() {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
      //console.log(http.status);
      if (http.status === 200 && http.readyState === 4) {
        let provincias = JSON.parse(http.responseText); // Cambiado de responseXML a responseText y JSON.parse

        console.log(provincias);

        let inprimatu = document.getElementById("probintzi");
        //console.log("probintzi kode:" + inprimatu);
        let idLista = Object.keys(provincias);

        for (let i = 1; i < idLista.length; i++) {
          let codigo = i; // Acceso correcto a 'codigo'
          if(i<10){
            codigo = "0"+i;
          }
          let nombre = provincias[codigo]; // Acceso correcto a 'nombre'

          console.log(nombre)

          let option = document.createElement("option");
          option.value = codigo;
          option.textContent = codigo + " - " + nombre;

          inprimatu.appendChild(option);
        }
      }
    };

    http.open("POST", "../server/cargaProvinciasJSON.php", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send();
  }

  kargatuProbintziak();
};

document.getElementById("probintzi").addEventListener("change", function () {
  kargatuHerriak(this.value);
});

function kargatuHerriak(id) {
  let http = new XMLHttpRequest();
  console.log("id: " + id);
  let probintzikode = document.getElementById("probintzi").value;
 // console.log("probintzikode: " + probintzikode);

  http.onreadystatechange = function () {
    if (http.status === 200 && http.readyState === 4) {
      let municipios = JSON.parse(http.responseText); // Cambiado de responseXML a responseText y JSON.parse

      //console.log(municipios);

      let inprimatu = document.getElementById("herriak");
      inprimatu.innerHTML = ""; // Para que se borre lo de la lista

      let idLista = Object.keys(municipios);
      console.log(municipios);

      for (let i = 1; i < idLista.length; i++) {
        let codigo = idLista[i]; // Cada clave es un código de municipio
        let nombre = municipios[codigo];

        console.log(nombre)

        let option = document.createElement("option");
        option.value = codigo;
        option.textContent = codigo + " - " + nombre;

        inprimatu.appendChild(option);
      }
    }
  };

  http.open("POST", "../server/cargaMunicipiosJSON.php", true);
  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  http.send("provincia=" + id);
}
