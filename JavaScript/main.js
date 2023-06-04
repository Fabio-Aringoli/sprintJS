console.log(data)
//ASI        LLAMAMOS AL ID DE HTML     "ID"
let cards = document.getElementById("sectionCard") //primero la ingresamos en una variable, (CARDS en este caso) <- cards de eventos
console.log([cards])


//ASI HACEMOS PARA MANDARLA AL VISUAL DE LA WEB SI SON MUCHOS OBJETOS (SE HACE ASI, EN UN BUCLE SI O SI) (esta bien pero no tan bien, puede estar mejor)

/* for(let events of data.events){
    cards.innerHTML +=           `<div class="card" style="width: 18rem;">
                                <img src="${events.image}" class="card-img-top img" alt="img ${events.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${events.name}</h5>
                                    <p class="card-text">${events.description}</p>
                                    <div class="buttonCard">
                                        <p>USD $${events.price}</p>
                                        <a href="./assets/secciones/details.html" class="btn btn-info">Details</a>
                                    </div>
                                </div>
                            </div>`
} */

//Arriba, en cards.innerHTML, si o si hay que agregar despues de HTML, el +=, si no, devolvera el ultimo objeto (card) porque sobrescribe el resultado del array


//Esta seria una manera mas optima (dentro de las que hay) que la de arriba
function eventCard (card){
    return `<div class="card" style="width: 18rem;">
                <img src="${card.image}" class="card-img-top img" alt="img ${card.name}">
                <div class="card-body">
                    <h5 class="card-title">${card.name}</h5>
                    <p class="card-text">${card.description}</p>
                    <div class="buttonCard">
                        <p>USD $${card.price}</p>
                        <a href="./assets/secciones/details.html" class="btn btn-info">Details</a>
                    </div>
                </div>
            </div>`
}

//Por otro lado hacemos otra funcion que sirva para imprimir los datos que va a recibir dos parametros, el primero muestra nuestro array, el segundo en donde vamos a mostrar al dato
function showEvent (array, elementHTML){
    // luego, creamos una variable estandarizada llamada template y lo inicializamos como un string vacio
    let template = ""
    //despues agregamos el for of que tenemos arriba menos lo que ya tenia asignado, esto , lo vamos a cambiar por la variable template += la primer funcion que establecimos, en este caso eventCard(), por debajo del template
    for(let events of array){
        template += eventCard(events)
    }
    console.log(template)
    //(elementHTML)
    elementHTML.innerHTML += template
}
showEvent(data.events, cards)