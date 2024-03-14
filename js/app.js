//Variables de los id
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");

//Agregando elementos dinámicos al carrito
let articulosCarrito = [];

//Registrar eventListener
cargarEventListeners();
function cargarEventListeners() {
  listaCursos.addEventListener("click", agregarCurso);

  //Eliminar un Curso del Carrito
  carrito.addEventListener("click", eliminarCurso);

  //Vaciar carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; //Reseteamos el arreglo

    limpiarHTML(); //Eliminamos todo el html
  });
}

//Funciones
function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

function eliminarCurso(e) {
  //Eliminar un Curso del Carrito
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML();
  }
}

//Leer datos del curso que seleccionamos y extraer la info
function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisar si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //Actualizar la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });

    articulosCarrito = [...cursos];
  } else {
    //Agregar elementos al array de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
}

//Función que muestra el carrito en HTML
function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML();

  //Recorre el objeto y genera HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const tRow = document.createElement("tr");
    tRow.innerHTML = `
      <td> <img src="${imagen}" width="100"> </td>
      <td> ${titulo} </td>
      <td> ${precio} </td>
      <td> ${cantidad} </td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
      </td>
    `;
    //Agrega el HTML de carrito en tbody
    contenedorCarrito.appendChild(tRow);
  });
}

//Elimina los cursos de tbody
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
