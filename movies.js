const crearFilaPeliculas = function(pelicula) {
    // Crear tr (y tds hijos) con data de pelicula
    const tr = document.createElement("tr")

    const tdId = document.createElement("td")
    const tdTitulo = document.createElement("td")
    const tdFechaLanzamiento = document.createElement("td")
    const tdRecaudacion = document.createElement("td")
    const tdFase = document.createElement("td")
    const tdPostcreditos = document.createElement("td")
    const tdAcciones = document.createElement("td")

    tdId.innerText = pelicula.id
    tdTitulo.innerText = pelicula.title
    tdFechaLanzamiento.innerText = pelicula.release_date

    const recaudacionFormateada = parseInt(pelicula.box_office).toLocaleString()
    tdRecaudacion.innerText = recaudacionFormateada

    tdFase.innerText = pelicula.phase
    tdPostcreditos.innerText = pelicula.post_credit_scenes
    
    const a = document.createElement("a")
    a.setAttribute("href", "#")
    a.innerText = "Seleccionar"
    tdAcciones.appendChild(a)

    tr.appendChild(tdId)
    tr.appendChild(tdTitulo)
    tr.appendChild(tdFechaLanzamiento)
    tr.appendChild(tdRecaudacion)
    tr.appendChild(tdFase)
    tr.appendChild(tdPostcreditos)
    tr.appendChild(tdAcciones)

    return tr
}

// Arrow functions
const crearTablaPeliculas = (listaPeliculas) => {
    const tbody = document.getElementById("dataPeliculas")
    for (let pelicula of listaPeliculas) {
        const tr = crearFilaPeliculas(pelicula)
        tbody.appendChild(tr)
    }
}

const crearCard = (pelicula) => {
    const divCard = document.createElement("div")
    divCard.setAttribute("class", "card")

    // Creamos img
    if (pelicula.cover_url != null) {
        const img = document.createElement("img")
        img.setAttribute("src", pelicula.cover_url)
        img.setAttribute("class", "card-img-top")
        divCard.appendChild(img)
    }

    // Creamos el card-body
    const divCardBody = document.createElement("div")
    divCardBody.setAttribute("class", "card-body")

    const h3 = document.createElement("h3")
    h3.setAttribute("class", "card-title")
    h3.innerText = pelicula.title
    divCardBody.appendChild(h3)

    const p = document.createElement("p")
    p.setAttribute("class", "card-text")
    p.innerText = pelicula.overview
    divCardBody.appendChild(p)

    const divRow1 = document.createElement("div")
    divRow1.setAttribute("class", "row")
    const divDirector = document.createElement("div")
    divDirector.setAttribute("class", "col-4")
    divDirector.innerText = "Director:"
    divRow1.appendChild(divDirector)
    const divDirectorValor = document.createElement("div")
    divDirectorValor.setAttribute("class", "col-4")
    divDirectorValor.innerText = pelicula.directed_by
    divRow1.appendChild(divDirectorValor)
    divCardBody.appendChild(divRow1)

    const divRow2 = document.createElement("div")
    divRow2.setAttribute("class", "row")
    const divSaga = document.createElement("div")
    divSaga.setAttribute("class", "col-4")
    divSaga.innerText = "Saga:"
    divRow2.appendChild(divSaga)
    const divSagaValor = document.createElement("div")
    divSagaValor.setAttribute("class", "col-4")
    divSagaValor.innerText = pelicula.saga
    divRow2.appendChild(divSagaValor)
    divCardBody.appendChild(divRow2)

    const button = document.createElement("button")
    button.setAttribute("type", "button")
    button.setAttribute("class", "btn btn-primary mt-3")
    button.innerText = "Seleccionar"
    button.addEventListener("click", () => {
        console.log(`ID: ${pelicula.id}`)
        sessionStorage.setItem("pelicula_id", pelicula.id)
        location.href = "/movie_detail.html"
    })
    divCardBody.appendChild(button)

    divCard.appendChild(divCardBody)

    return divCard
}

const crearSetCardsPeliculas = (listaPeliculas) => {
    const divCardsContainer = document.getElementById("v-pills-card")
    //for (let i=0;  i < listaPeliculas.length; i++)
    let divCardDeck;

    for (let i in listaPeliculas) {
        const pelicula = listaPeliculas[i]

        if (i % 2 == 0) {
            // 1. Crear un card deck
            divCardDeck = document.createElement("div")
            divCardDeck.setAttribute("class", "card-deck")
            divCardsContainer.appendChild(divCardDeck)
        }

        // Agregar el card
        const divCard = crearCard(pelicula)
        divCardDeck.appendChild(divCard)
    }
}

const obtenerDataPeliculas = async function() {
    // Promises
    /*fetch("https://mcuapi.herokuapp.com/api/v1/movies").then(function(response){
        return response.json()
    }).then(function(datos) {
        const listaPeliculas = datos.data
        crearTablaPeliculas(listaPeliculas)
        crearSetCardsPeliculas(listaPeliculas)
    })*/

    // async await
    const response = await fetch("https://mcuapi.herokuapp.com/api/v1/movies")
    const datos = await response.json()
    const listaPeliculas = datos.data
    crearTablaPeliculas(listaPeliculas)
    crearSetCardsPeliculas(listaPeliculas)

    // const req = new XMLHttpRequest();
    // req.addEventListener("load", function(event) {
    //     document.write(event.target.responseText)
    // })
    // req.open("GET", "https://mcuapi.herokuapp.com/api/v1/movies")
    // req.send()
}

const main = function() {
    obtenerDataPeliculas()
}

window.addEventListener("load", main)