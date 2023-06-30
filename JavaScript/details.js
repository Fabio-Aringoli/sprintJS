const containerDetails = document.getElementById("mainDetails")
const urlParams = new URLSearchParams(location.search)// los parametros despues del "?"
const id = urlParams.get("id")


let url = "https://mindhub-xj03.onrender.com/api/amazing"
fetch(url)
.then(res => {
  return res.json()
})
.then(data =>{
  const searchId = data.events.find(element => element._id == id)

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
})
.catch(error => {console.log(error)}) 