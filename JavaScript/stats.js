let url = "https://mindhub-xj03.onrender.com/api/amazing"
fetch(url)
  .then(res => res.json())
  .then(data => {
    let arrayEventos = data.events
    let currentDate = data.currentDate

    //---------Para la primer tabla-------


    
    // Filtramos los eventos futuros
    const arrayFiltradosFuturos = arrayEventos.filter(evento => evento.date > currentDate)
   
    
    // Filtramos los eventos pasados
    const arrayFiltradosPasados = arrayEventos.filter(evento => evento.date < currentDate)

    // Ordenamos los eventos de mayor a menor segun su % de asistencia
    const eventosAsistenciaMayor = arrayFiltradosPasados.sort((a, b) => {
      const porcentajeAsistenciaUno = (a.assistance / a.capacity) * 100
      const porcentajeAsistenciaDos = (b.assistance / b.capacity) * 100
      return porcentajeAsistenciaDos - porcentajeAsistenciaUno
    })
    const eventoMayorAsistencia = eventosAsistenciaMayor[0]
    console.log("Evento con mayor asistencia:".toUpperCase(), eventoMayorAsistencia)

    // Ordenamos los eventos de menor a mayor segun su % de asistencia
      const eventosAsistenciaMenor = arrayFiltradosPasados.sort((a, b) => {
        const porcentajeAsistenciaUno = (a.assistance / a.capacity) * 100
        const porcentajeAsistenciaDos = (b.assistance / b.capacity) * 100
        return porcentajeAsistenciaUno - porcentajeAsistenciaDos
    })
    const eventoMenorAsistencia = eventosAsistenciaMenor[0]
    console.log("Evento con menor asistencia:".toUpperCase(), eventoMenorAsistencia)

    //Ordenamos el array para mostrar al evento con mayor capacidad
    const eventosCapacidadMayor = arrayFiltradosPasados.sort((a, b) => b.capacity - a.capacity);
    const eventoMayorCapacidad = eventosCapacidadMayor[0];
    console.log("Evento con mayor capacidad".toUpperCase(), eventoMayorCapacidad)


    //Mostramos la tabla numero 1
    const containerTableOne = document.getElementById("tableOne")
    containerTableOne.innerHTML = `
          <thead>
            <tr>
             <th colspan="3">Events Statistic</th>
            </tr>
          </thead>
          <tbody >
            <tr>
              <td>Events with the highest % of attendance</td>
              <td>Events with the lowest % of attendance</td>
              <td>Event with larger capacity</td>
            </tr>
            <tr>                                                                      
              <td>${eventoMayorAsistencia.name} ${((eventoMayorAsistencia.assistance / eventoMayorAsistencia.capacity) * 100).toFixed(2)}%</td>
              <td>${eventoMenorAsistencia.name} ${((eventoMenorAsistencia.assistance / eventoMenorAsistencia.capacity) * 100).toFixed(2)}%</td></td>
              <td>${eventoMayorCapacidad.name}  ${eventoMayorCapacidad.capacity}</td>
            </tr>
          </tbody>
    `

    //------------------------------------------------------------------------------------------------------------------------------------------------------
    


    //---------Para la segunda tabla-------

    //filtramos por categorias de los eventos futuros
      const categoriasSinRepetirF = Array.from(new Set(arrayFiltradosFuturos.filter(elemento => elemento.date > currentDate).map(evento => evento.category)))
      console.log("EVENTOS FUTUROS",arrayFiltradosFuturos);
      console.log("eventos futuros filtrados por categorias sin repetir".toUpperCase(), categoriasSinRepetirF)
      categoriasSinRepetirF.forEach(categoria => {
      const eventosCategoria = arrayEventos.filter(evento => evento.category === categoria && evento.date > currentDate)
    //revenues
        const totalRevenuesCategories = (eventosCategoria.reduce((acumulador, evento)=>{
          return acumulador + ((evento.estimate * evento.price))
        },0)).toLocaleString()
      console.log("$",totalRevenuesCategories);
    //  %
      const totalPorcentajeCategories =  (eventosCategoria.reduce((acumulador, evento)=>{
        return acumulador + ((evento.estimate * 100) / evento.capacity)
      },0) / eventosCategoria.length).toFixed(2)
    console.log("%",totalPorcentajeCategories);

    //Mostramos la Tabla dos
    const containerTableTwo = document.getElementById("tableTwo")
    //Creamos con nodos a la table
    const tr = document.createElement("TR")
    //creamos y guardamos la celda con su categoria
    const tdCategory = document.createElement("TD")
    tdCategory.textContent = categoria
    tr.appendChild(tdCategory)
    //lo mismo, pero con el Revenue
    const tdRevenue = document.createElement("TD")
    tdRevenue.textContent = `$ ${totalRevenuesCategories}`
    tr.appendChild(tdRevenue)
    //y ahora creamos y guaramos la celda con el % promedio de cara evento
    const tdPorcentage = document.createElement("TD")
    tdPorcentage.textContent = `% ${totalPorcentajeCategories}`
    tr.appendChild(tdPorcentage)
    //y agregamos el TR a la table
    containerTableTwo.appendChild(tr)
  })

//------------------------------------------------------------------------------------------------------------------------------------------------------
    
    //---------Para la tercer tabla-------

    //filtramos por categorias de los eventos pasados
    const categoriasSinRepetirP = Array.from(new Set(arrayFiltradosPasados.filter(elemento => elemento.date < currentDate).map(evento => evento.category)))
    console.log("EVENTOS PASADOS",arrayFiltradosPasados);
    console.log("eventos PASADOS filtrados por categorias sin repetir".toUpperCase(), categoriasSinRepetirP)
    categoriasSinRepetirP.forEach(categoria => {
    const eventosCategoria = arrayEventos.filter(evento => evento.category === categoria && evento.date < currentDate)
  //revenues
      const totalRevenuesCategories = (eventosCategoria.reduce((acumulador, evento)=>{
        return acumulador + ((evento.assistance * evento.price))
      },0)).toLocaleString()
    console.log("$",totalRevenuesCategories);
  //  %
    const totalPorcentajeCategories =  (eventosCategoria.reduce((acumulador, evento)=>{
      return acumulador + ((evento.assistance * 100) / evento.capacity)
    },0)/ eventosCategoria.length).toFixed(2)
  console.log("%",totalPorcentajeCategories);

  //Mostramos la Tabla tres
  const containerTableTwo = document.getElementById("tableThree")
  //Creamos con nodos a la table
  const tr = document.createElement("TR")
  //creamos y guardamos la celda con su categoria
  const tdCategory = document.createElement("TD")
  tdCategory.textContent = categoria
  tr.appendChild(tdCategory)
  //lo mismo, pero con el Revenue
  const tdRevenue = document.createElement("TD")
  tdRevenue.textContent = `$ ${totalRevenuesCategories}`
  tr.appendChild(tdRevenue)
  //y ahora creamos y guaramos la celda con el % promedio de cara evento
  const tdPorcentage = document.createElement("TD")
  tdPorcentage.textContent = `% ${totalPorcentajeCategories}`
  tr.appendChild(tdPorcentage)
  //y agregamos el TR a la table
  containerTableTwo.appendChild(tr)
})

})
.catch(error => console.log(error))
