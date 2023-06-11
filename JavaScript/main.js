console.log(data)
//ASI        LLAMAMOS AL ID DE HTML     "ID"
let cards = document.getElementById("sectionCard") //primero la ingresamos en una variable, (CARDS en este caso) <- cards de eventos
console.log([cards])

function eventCard (card){
    return `<div class="card" style="width: 18rem;">
                <img src="${card.image}" class="card-img-top img" alt="img ${card.name}">
                <div class="card-body">
                    <h5 class="card-title">${card.name}</h5>
                    <p class="card-text">${card.description}</p>
                    <div class="buttonCard">
                        <p>USD $${card.price}</p>
                        <a href="./assets/secciones/details.html?id=${card._id}"class="btn btn-info">Details</a>
                    </div>
                </div>
            </div>`
}

//Por otro lado hacemos otra funcion que sirva para imprimir los datos que va a recibir dos parametros, el primero muestra nuestro array, el segundo en donde vamos a mostrar al dato
function showEvent (array, elementHTML){
    // luego, creamos una variable estandarizada llamada template y lo inicializamos como un string vacio
    let template = ""
    //despues agregamos el for of que tenemos arriba menos lo que ya tenia asignado (en su bloque de codigo), esto , lo vamos a cambiar por la variable template += la primer funcion que establecimos, en este caso eventCard(), por debajo del template
    for(let events of array){
        template += eventCard(events)
    }
    console.log(template)
    //(elementHTML)
    elementHTML.innerHTML = template
}
showEvent(data.events, cards)

//----------------------------------------------------------------CheckBoxs-------------------------------------------------------------------------------------


                                      //OBTENER MODULOS PARA HACER DINAMICOS A LOS CHECKBOXS
//Creo el array

//paso 1 .map
const modulos = data.events.map( category => category.category )
console.log("MODULOS REPETIDOS .map")
console.log(modulos)


//Creo un set para eliminar los repetidos
//paso 2 new Set                       map
const modulosSinRepetidos = new Set (modulos) //set separa los elementos repetidos (.map)
console.log("MODULOS SIN REPETIR new Set")
console.log(modulosSinRepetidos)


//Lo vuelvo a pasar a array con Array.from para tener disponibles los metodos array
//paso 3 Array.from                               new Set
const arrayModulosSinRepetidos = Array.from(modulosSinRepetidos) //pasamos de objeto a array al ModuloSinRepetidos (set)
console.log("ARRAY SIN REPETIDOS array.from")
console.log(arrayModulosSinRepetidos)


                                                  //HACER DINAMICO LOS CHECKBOXS


//LUGAR DONDE PONER LOS CHECKBOXS

//creamos la constante y le agregamos el contenedor 
const checkBoxs = document.querySelector(".categoryControl") //aca estan los checkbox

//Guardamos el search
const search = document.getElementById("searchInput") //aca esta la barra de texto para buscar



//Guardamos el boton search y le agrego un spinner cuando se le hace click 
const searchButton = document.getElementById("searchButton") //aca esta el boton search
searchButton.addEventListener("click", event => {
    event.target.className = "spinner-border text-success"
} ) 



//FUNCION QUE CREE LOS CHECKBOXS
//con nodos
function crearCheckBoxs (category){
    const div = document.createElement("DIV")
    div.classList.add = ("form-check")
    
    const input = document.createElement("INPUT")
    input.type = "checkbox"
    input.className = "form-check-input"
    input.name = "category"
    input.id = `${category}-check`
    input.value = category

    const label = document.createElement("LABEL")
    label.className = "form-check-label"
    label.setAttribute("for", `${category}-check`)
    label.textContent = category
    label.style = "cursor:pointer"

    div.appendChild(input)
    div.appendChild(label)

    return div
}


//FUNCION QUE LLEVE LOS CHECK AL DOM
function showCheckbox (categories, element){
    const fragment = document.createDocumentFragment()

    for (const category of categories) {
        fragment.appendChild(crearCheckBoxs(category))
    }
    element.appendChild(fragment)
}
showCheckbox(arrayModulosSinRepetidos, checkBoxs)                                       

function filterAndShowEvents() {

    //        2-Lo pase a array y ahora devuelve array      1-Devuelve un NODELIST    3- Y AL ARRAY QE DEVUELVE LE HAGO UN .MAP A ARRAY.FROM
    const checkboxChecks = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(check => check.value)
    const searchQuery = search.value.toLowerCase().trim()
  
    if (checkboxChecks.length > 0 || searchQuery !== '') {
        const cardsCheckFilter = data.events.filter(event => {
        const categoryNameMatch = checkboxChecks.length ===  0 || checkboxChecks.includes(event.category)
        const nameMatch = event.name.toLowerCase().includes(searchQuery)
        const descriptionMatch = event.description.toLowerCase().includes(searchQuery)
        return categoryNameMatch && (nameMatch || descriptionMatch)
    });
        showEvent(cardsCheckFilter, cards)
    }else{
        showEvent(data.events, cards)
    }
}

//Le agregamos un escuchador de eventos al search

  // Agregar evento al input de búsqueda
  search.addEventListener("keyup", filterAndShowEvents)
  
  // Agregar evento a los checkboxes
  checkBoxs.addEventListener("change", filterAndShowEvents)