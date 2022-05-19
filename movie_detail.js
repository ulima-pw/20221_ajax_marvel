const main = () => {

    const idPelicula = sessionStorage.getItem("pelicula_id")
    console.log(`ID DE LA PELICULA: ${idPelicula}`)
}

window.addEventListener("load", main)