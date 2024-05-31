const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
};

const alertTrigger = document.getElementById("liveAlertBtn");
if (alertTrigger) {
  alertTrigger.addEventListener("click", () => {
    appendAlert("Nice, you triggered this alert message!", "success");
  });
}

function cargarDatos() {
  fetch("./Controller/traerClasesController.php")
    .then((response) => response.json())
    .then((data) => {
      const tablaDatos = document.getElementById("tablaDatos");
      tablaDatos.innerHTML = "";
      data.forEach((row) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${row.Id}</td>
        <td>${row.Nombre}</td>
        <td>${row.Descripcion}</td>
        <td>
        <button onclick='traerDatos(${row.Id})' type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >Actualizar</button>
        </td>
        <td>
            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#confirmModal-${row.Id}">Eliminar</button>
            <div class="modal fade" id="confirmModal-${row.Id}" tabindex="-1" role="dialog" aria-labelledby="confirmModalLabel-${row.Id}" aria-hidden="true">
            <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="confirmModalLabel">Deseas eliminar este registro</h5>
                          </div>
                          <div class="modal-body">
                            ¿Estás seguro de que deseas continuar?
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <button class="btn btn-danger" data-dismiss="modal" onClick='eliminarClase(${row.id})'>Eliminar</button>
                          </div>
                        </div>
                      </div>
            </div>
        </td>
    `;
        tablaDatos.appendChild(tr);
      });
    });
}

function limpiarFormulario() {
  let inputCodigo = document.getElementById("id");
  var inputNombre = document.getElementById("nombre");
  var inputDescripcion = document.getElementById("descripcion");
  inputCodigo.value = "";
  inputNombre.value = "";
  inputDescripcion.value = "";
}
function guardarClase(Id, Nombre, Descripcion) {
  fetch(
    `./Controller/guardarClaseController.php?id=${Id}&nombre=${Nombre}&descripcion=${Descripcion}`
  )
    .then((response) => response.text())
    .then((data) => {
      limpiarFormulario();
      cargarDatos();
    });
}

function eliminarClase(id) {
  fetch("./Controller/eliminarClaseController.php?id=" + Id)
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      cargarDatos();
      mostrarAlerta("Se elimino con exito")
    });
}

function agregarClase() {
  const id = document.getElementById("id").value;
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;

  fetch(
    `./Controller/agregarClaseController.php?id=${id}&nombre=${nombre}&descripcion=${descripcion}`
  )
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      cargarDatos();
      mostrarAlerta("Se agrego con exito")
      console.log(data);
      document.getElementById("id").value = "";
      document.getElementById("nombre").value = "";
      document.getElementById("descripcion").value = "";
    });
}

function traerDatos(id) {
  fetch(`./Controller/traerClaseController.php?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      var inputCodigo = document.getElementById("id");
      var inputNombre = document.getElementById("nombre");
      var inputDescripcion = document.getElementById("descripcion");
      inputCodigo.value = data["id"];
      inputNombre.value = data["nombre"];
      inputDescripcion.value = data["descripcion"];
    });

  var boton = document.getElementById("Guardar");
  boton.onclick = function () {
    var inputCodigo = document.getElementById("id");
    var inputNombre = document.getElementById("nombre");
    var inputDescripcion = document.getElementById("descripcion");
    var valId = inputCodigo.value;
    var valNombre = inputNombre.value;
    var valDescripcion = inputDescripcion.value;
    limpiarFormulario();
    guardarClase(valId, valNombre, valDescripcion);
    mostrarAlerta("Se actualizo con exito")
  };
}

function mostrarAlerta(mensaje) {
  var alerta = document.getElementById("alerMessange");
  alerta.innerHTML = mensaje;
  alerta.hidden = false;

  setTimeout(function() {
    alerta.hidden = true;
  }, 1000); 
}


cargarDatos();

//Para que sirve el fetch - Investigar
