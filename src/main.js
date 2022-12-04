// URL GENERAL
const API_URL = 'https://api.rawg.io/api';

// EJEMPLO DE URL QUE CONTIENE A LOS JUEGOS EN PÁGINAS DE 30 JUEGOS CADA UNA Y ACCEDO A LA PÁGINA 2
const API_URL_GAMES = 'https://api.rawg.io/api/games/super-mario-bros?key=8d35f3d37cff4c7c816bce53458b3cb4';

// EJEMPLO DE URL QUE CONTIENE A LOS GÉNEROS
const API_URL_GENRES = 'https://api.rawg.io/api/genres?key=8d35f3d37cff4c7c816bce53458b3cb4';


async function showGames() {
    const res = await fetch(API_URL_GAMES);
    const data = await res.json();

    if(res.status !== 200) {
        console.log("Hubo un error: " + res.status);
    } else {
        console.log('Games', data);
        const img2 = document.getElementById('img2');
        img2.src = data.background_image;
    }
}

showGames();


async function showGenres() {
    const res = await fetch(API_URL_GENRES);
    const data = await res.json();

    if(res.status !== 200) {
        console.log("Hubo un error: " + res.status);
    } else {
        console.log('Genres', data);

        const platforms = data.results[10];
        console.log('Platforms', platforms);
        const games = platforms.games;
        console.log('Game', games);
        const mario = games.find(item => item.name == 'Super Meat Boy');
        console.log('Super Meat Boy', mario);
    }
}

showGenres();


/* Notas */
/*

* Cambiaré el color del header para cada vista.
* En la  vista de juegos jugados, jugando y por jugar, main no puede medir 90vh de height.
* Intentar colocar 90vh de height a la vista de descripción del juego.

*/