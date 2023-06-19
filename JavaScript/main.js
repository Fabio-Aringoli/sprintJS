//ASI        LLAMAMOS AL ID DE HTML     "ID"
let cards = document.getElementById("sectionCard") //primero la ingresamos en una variable, (CARDS en este caso) <- cards de eventos
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

 let url = "https://mindhub-xj03.onrender.com/api/amazing"
 fetch(url)
.then(res => res.json())
.then(data =>{
    function showEvent (array, elementHTML){
        let template = "" 
        for(let events of array){
            template += eventCard(events)
        }
        console.log(template)
        //(elementHTML)
        elementHTML.innerHTML = template
    }
    showEvent(data.events, cards)

    const modulos = data.events.map( category => category.category )
    const modulosSinRepetidos = new Set (modulos) 
    const arrayModulosSinRepetidos = Array.from(modulosSinRepetidos) 
    const checkBoxs = document.querySelector(".categoryControl") 
    const search = document.getElementById("searchInput")

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
    
    function showCheckbox (categories, element){
        const fragment = document.createDocumentFragment()
    
        for (const category of categories) {
            fragment.appendChild(crearCheckBoxs(category))
        }
        element.appendChild(fragment)
    }
    showCheckbox(arrayModulosSinRepetidos, checkBoxs) 

    function filterAndShowEvents() {
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

    search.addEventListener("keyup", filterAndShowEvents)
    checkBoxs.addEventListener("change", filterAndShowEvents)
 })
.catch(error => {console.log(error)}) 
