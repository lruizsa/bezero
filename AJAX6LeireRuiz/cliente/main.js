window.onload = function () {
  function kargatuProbintziak() {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
      if (http.status === 200 && http.readyState === 4) {
        let xml = http.responseXML;
        let provincias = xml.getElementsByTagName("provincia");
        console.log(provincias);

        let inprimatu = document.getElementById("probintzi");
        console.log("probintzi kode:"+ inprimatu);

        for (let i = 0; i < provincias.length; i++) {
          let codigo = provincias[i].getElementsByTagName("codigo")[0].textContent;
          let nombre = provincias[i].getElementsByTagName("nombre")[0].textContent;

          let option = document.createElement("option");
          option.value = codigo;
          option.textContent = codigo + " - " + nombre;

          inprimatu.appendChild(option);
        }
      } 
    };

    http.open("POST", "../server/cargaProvinciasXML.php", true);
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.send();
  }

  kargatuProbintziak();
};


document.getElementById("probintzi").addEventListener("change", function () {
  kargatuHerriak(this.value);
});


function kargatuHerriak(id) {
  let http = new XMLHttpRequest();
  console.log("id: "+ id);
  let probintzikode = document.getElementById("probintzi").value;
  console.log("probintzikode: "+probintzikode);

  http.onreadystatechange = function () {
    if (http.status === 200 && http.readyState === 4) {
      let xml = http.responseXML;
      let municipio = xml.getElementsByTagName("municipio");

      console.log(municipio);

      let inprimatu = document.getElementById("herriak");
      inprimatu.innerHTML=""; // Para que se borre lo de la lista

      for (let i = 0; i < municipio.length; i++) {
        let codigo = municipio[i].getElementsByTagName("codigo")[0].textContent;
        let nombre = municipio[i].getElementsByTagName("nombre")[0].textContent;

        let option = document.createElement("option");
        option.value = codigo;
        option.textContent = codigo + " - " + nombre;

        inprimatu.appendChild(option);
      }
    } 
    
  };
  
  http.open("POST", "../server/municipios.php", true);
  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  http.send("provincia="+id);
}

