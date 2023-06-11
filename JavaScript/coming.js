// Obtener el elemento HTML donde se mostrarán las tarjetas de evento
let cards = document.getElementById("sectionCard");

// Obtener la fecha actual y los eventos
let currentDate = data.currentDate;
let events = data.events;

// Filtrar los eventos por fecha
let filteredEvents = [];
for (let i = 0; i < events.length; i++) {
  let event = events[i];
  let eventDate = event.date;

  if (eventDate > currentDate) {
    filteredEvents.push(event);
  }
}

// Por otro lado, creamos una función para generar la estructura HTML de una tarjeta de evento
function eventCard(card) {
  return `<div class="card" style="width: 18rem;">
            <img src="${card.image}" class="card-img-top img" alt="img ${card.name}">
            <div class="card-body">
                <h5 class="card-title">${card.name}</h5>
                <p class="card-text">${card.description}</p>
                <div class="buttonCard">
                    <p>USD $${card.price}</p>
                    <a href="./details.html?id=${card._id}" class="btn btn-info">Details</a>
                </div>
            </div>
          </div>`;
}

// Función para mostrar las tarjetas de evento en el elemento HTML
function showEvent(array, element) {
  element.innerHTML = '';
  let template = '';

  for (let i = 0; i < array.length; i++) {
    let event = array[i];
    template += eventCard(event);
  }

  element.innerHTML = template;
}

// Mostrar las tarjetas de evento filtradas
showEvent(filteredEvents, cards);

// Obtener el elemento HTML donde se mostrarán los checkboxes
const checkBoxs = document.getElementById("categoryControl");

// Crear y mostrar los checkboxes dinámicamente
function crearCheckBoxs(category) {
  const div = document.createElement("div");
  div.classList.add("form-check");

  const input = document.createElement("input");
  input.type = "checkbox";
  input.className = "form-check-input";
  input.name = "category";
  input.id = `${category}-check`;
  input.value = category;

  const label = document.createElement("label");
  label.className = "form-check-label";
  label.setAttribute("for", `${category}-check`);
  label.textContent = category;
  label.style.cursor = "pointer";

  div.appendChild(input);
  div.appendChild(label);

  return div;
}

function showCheckbox(modulos, element) {
  const fragment = document.createDocumentFragment();

  for (const category of modulos) {
    const div = crearCheckBoxs(category);
    fragment.appendChild(div);
  }

  element.appendChild(fragment);
}

// Obtener los módulos para hacer dinámicos los checkboxes
const modulos = data.events.map((category) => category.category);
const modulosSinRepetidos = new Set(modulos);
const arrayModulosSinRepetidos = Array.from(modulosSinRepetidos);
showCheckbox(arrayModulosSinRepetidos, checkBoxs);

// Obtener el elemento HTML del campo de búsqueda
const search = document.getElementById("searchInput");

// Función para filtrar y mostrar los eventos en función de los checkboxes y la búsqueda
function filterAndShowEvents() {
  const checkboxChecks = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map((check) => check.value);
  const searchQuery = search.value.toLowerCase().trim();
  let arrayFiltrado = [...data.events].filter(elementoArr => elementoArr.date > data.currentDate)

  if (checkboxChecks.length > 0 || searchQuery !== ''){
    const cardsCheckFilter = arrayFiltrado.filter(event => {
    const categoryNameMatch = checkboxChecks.length ===  0 || checkboxChecks.includes(event.category);
    const nameMatch = event.name.toLowerCase().includes(searchQuery);
    const descriptionMatch = event.description.toLowerCase().includes(searchQuery);
    return categoryNameMatch && (nameMatch || descriptionMatch);
});
    showEvent(cardsCheckFilter, cards);
}else{
    showEvent(arrayFiltrado, cards);
}
}



// Agregar eventos a los checkboxes y al campo de búsqueda
checkBoxs.addEventListener("change", filterAndShowEvents);
search.addEventListener("keyup", filterAndShowEvents);