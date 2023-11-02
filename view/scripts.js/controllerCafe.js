//   ---------- NOTA IMPORTANTE ---------------

//   PARA QUE EL PROGRAMA FUNCIONE FAVOR DE EJECUTAR EL ARCHIVO main.py 
//   PARA LEVANTAR EL SERVIDOR


function inicializar() {
  getAll();
}

window.onload = inicializar;

function calculateCookies() {
  let cantidad_chico_s = document.getElementById("txtChico").value;
  let cantidad_mediano_s = document.getElementById("txtMediano").value;
  let cantidad_grande_s = document.getElementById("txtGrande").value;
  let cantidad_jumbo_s = document.getElementById("txtJumbo").value;
  let id = 0;

  if (cantidad_chico_s === "" && cantidad_mediano_s === "" && cantidad_grande_s === "" && cantidad_jumbo_s === "") {
    Swal.fire(
        "",
        "No puedes dejar todos los campos vacíos.",
        "error"
    );
    return;
}

  if (cantidad_chico_s == "" || parseInt(cantidad_chico_s) < 0) {
    cantidad_chico_s = "0";
  }

  if (cantidad_mediano_s == "" || parseInt(cantidad_mediano_s) < 0) {
    cantidad_mediano_s = "0";
  }

  if (cantidad_grande_s == "" || parseInt(cantidad_grande_s) < 0) {
    cantidad_grande_s = "0";
  }

  if (cantidad_jumbo_s == "" || parseInt(cantidad_jumbo_s) < 0) {
    cantidad_jumbo_s = "0";
  }

  let cafe_chico =  parseInt(cantidad_chico_s)
  let cafe_mediano =  parseInt(cantidad_mediano_s)
  let cafe_grande =  parseInt(cantidad_grande_s)
  let cafe_jumbo =  parseInt(cantidad_jumbo_s)

  let cantidad_chico = cafe_chico * 0;
  let cantidad_mediano = cafe_mediano * 3;
  let cantidad_grande = cafe_grande * 6;
  let cantidad_jumbo = cafe_jumbo;
  let total_galletas = cantidad_chico + cantidad_mediano + cantidad_grande;

  let data_cafe = {
    id,
    cafe_chico,
    cafe_mediano,
    cafe_grande,
    cafe_jumbo
  }
  sendDataCafe(data_cafe)

  let data = {
    id,
    cantidad_chico,
    cantidad_mediano,
    cantidad_grande,
    cantidad_jumbo,
    total_galletas,
  };

  sendData(data);

  cleanFilds();
  cantidad_chico = 0;
  cantidad_mediano = 0;
  cantidad_grande = 0;
  cantidad_jumbo = 0;
}

function cleanFilds() {
  document.getElementById("txtChico").value = "";
  document.getElementById("txtMediano").value = "";
  document.getElementById("txtGrande").value = "";
  document.getElementById("txtJumbo").value = "";
}

function sendData(data) {
  console.log(data)
  total = data.total_galletas;
  paquetes = data.cantidad_jumbo;
  fetch("http://127.0.0.1:8080/saveVenta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.exception != null) {
        Swal.fire(
          "",
          "Error interno del servidor. Intente nuevamente mas tarde.",
          "error"
        );
        return;
      }

      if (data.error != null) {
        Swal.fire("", data.error, "warning");
        return;
      }

      if (data.errorperm != null) {
        Swal.fire(
          "",
          "No tiene permiso para realizar esta operacion",
          "warning"
        );
        return;
      } else {
        if (paquetes == 0) {
          Swal.fire("", "Debes regalar " + total + " galletas.", "success");
        } else if (paquetes != 0) {
          Swal.fire(
            "",
            "Debes regalar " +
              total +
              " galletas y " +
              paquetes +
              " paquetes de galleta.",
            "success"
          );
        }
      }
      inicializar()
    });
}

function sendDataCafe(data) {
  total = data.total_galletas;
  paquetes = data.cantidad_jumbo;
  fetch("http://127.0.0.1:8080/saveCafe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.exception != null) {
        Swal.fire(
          "",
          "Error interno del servidor. Intente nuevamente mas tarde.",
          "error"
        );
        return;
      }

      if (data.error != null) {
        Swal.fire("", data.error, "warning");
        return;
      }

      if (data.errorperm != null) {
        Swal.fire(
          "",
          "No tiene permiso para realizar esta operacion",
          "warning"
        );
        return;
      } else {
        if (paquetes == 0) {
          Swal.fire("", "Debes regalar " + total + " galletas.", "success");
        } else if (paquetes != 0) {
        }
      }
    });
}

function getAll() {
  fetch("http://127.0.0.1:8080/getAll")
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      if (data.exception != null) {
        swal.fire(
          "",
          "Error interno del servidor. Intente nuevamente más tarde.",
          "error"
        );
        window.location.replace("index.html");
      }
      if (data.error != null) {
        Swal.fire("", data.error, "warning");
      }
      if (data.errorsec != null) {
        Swal.fire("", data.errorsec, "error");
      }
      loadTable(data);
    })
    .catch(function (error) {
      console.error("Error de conexión:", error);
      swal.fire(
        "Error de conexión",
        "El servidor no está disponible. Verifique su conexión o inténtelo más tarde.",
        "error"
      );
    });
}

function loadTable(dataCafe) {
  let table = document.querySelector("table");
  let secondRow = table.rows[1];
  let suma_data = 0

  let sumArray = new Array(secondRow.cells.length).fill(0);

  for (let i = 0; i < dataCafe.length; i++) {
    for (let j = 0; j < dataCafe[i].length; j++) {
      sumArray[j] += dataCafe[i][j];
    }
  }

  fetch("http://127.0.0.1:8080/getAllGalletas")
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      if (data.exception != null) {
        swal.fire(
          "",
          "Error interno del servidor. Intente nuevamente más tarde.",
          "Error"
        );
        window.location.replace("index.html");
        return;
      }
      if (data.error != null) {
        Swal.fire("", data.error, "warning");
        return;
      }
      if (data.errorsec != null) {
        Swal.fire("", data.errorsec, "error");
        return;
      }
      for (let j = 0; j < 4; j++) {
        secondRow.cells[j].textContent = sumArray[j];
      }

      for (var i = 0; i < data.length; i++) {
        suma_data += data[i][0];
      }
      secondRow.cells[4].textContent = suma_data;
    });
}
