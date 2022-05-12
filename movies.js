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

const obtenerDataPeliculas = function() {
    // Promises
    fetch("https://mcuapi.herokuapp.com/api/v1/movies").then(function(response){
        return response.json()
    }).then(function(datos) {
        const listaPeliculas = datos.data
        const tbody = document.getElementById("dataPeliculas")
        for (let pelicula of listaPeliculas) {
            const tr = crearFilaPeliculas(pelicula)
            tbody.appendChild(tr)
        }
    })

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