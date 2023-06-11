const containerDetails = document.getElementById("mainDetails")
const urlParams = new URLSearchParams(location.search) //se usala etiqueta new para crear una nueva instancia de URLSearchParams, y a este le agregamos un (location.search)
const id = urlParams.get("id")
const searchId = data.events.find(element => element._id == id)
console.log("Id en la url", id)
console.log("resultado del find", searchId)

console.log(searchId)

containerDetails.innerHTML = `
<section class="detailsSection">
  <h1>${searchId.category}</h1>
  <article class="containerImg">
    <img src="${searchId.image}" alt="${searchId.name}" class="detailsImg">
  </article>
  <article class="containerTxt">
    <h4>${searchId.name}</h4>
    <p>${searchId.description}</p>
    <p>Place: ${searchId.place}</p>
    <p>Capacity: ${searchId.capacity}</p>
    <p>Assistance: ${searchId.assistance}</p>
    <p>Price: $${searchId.price}</p>
  </article>
</section>
`


