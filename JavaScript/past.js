let cards = document.getElementById("sectionCard")
let currentDate = new Date(data.currentDate)
let events = data.events

for(let i = 0; i < events.length; i++){
   let event = events[i]
   let eventDate = new Date(event.date)
   if (eventDate < currentDate){
    let eventElement = document.createElement('div')
    eventElement.className = 'event'
    let eventHTML = `<div class="card" style="width: 18rem;">
                        <img src="${event.image}" class="card-img-top img" alt="img ${event.name}">
                        <div class="card-body">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text">${event.description}</p>
                            <div class="buttonCard">
                                <p>USD $${event.price}</p>
                                <a href="./assets/secciones/details.html" class="btn btn-info">Details</a>
                            </div>
                        </div>
                    </div>`
eventElement.innerHTML = eventHTML
cards.appendChild(eventElement);
   }
}
console.log(cards)