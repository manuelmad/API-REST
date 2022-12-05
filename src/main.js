// URL GENERAL
const API_URL = 'https://api.rawg.io/api';

// URL DEL JUEGO SONIC DE HEDGEHOG (ORIGINAL)
const API_URL_SONIC = 'https://api.rawg.io/api/games/53551?key=8d35f3d37cff4c7c816bce53458b3cb4';

// URL QUE CONTIENE A LOS JUEGOS QUE FORMAN PARTE DE LA SERIE DE SONIC (ORIGINAL)
const API_URL_SONIC_SERIES = 'https://api.rawg.io/api/games/sonic-the-hedgehog/game-series?key=8d35f3d37cff4c7c816bce53458b3cb4';

// const API_URL_GAME = 'https://api.rawg.io/api/games/sonic-3-and-knuckles?key=8d35f3d37cff4c7c816bce53458b3cb4';

// EJEMPLO DE URL QUE CONTIENE A LOS GÉNEROS
// const API_URL_GENRES = 'https://api.rawg.io/api/genres?key=8d35f3d37cff4c7c816bce53458b3cb4';

const API_URL_SEARCH = 'https://api.rawg.io/api/games?search=sonic-the-hedgehog-2&key=8d35f3d37cff4c7c816bce53458b3cb4';

// Array que contendrá todos los juegos de la serie de Sonic
let sonic_series = [];
// let playED_games = [];
// let playING_games = [];
// let TOplay_games = [];

// Variables para recorrer todas las páginas de la serie de Sonic
let new_url;
let res2;
let data2;

// Fución para crear la lista de juegos de la serie Sonic
async function showSonicSeries() {
    // Accedo a la serie de Sonic, usando al juego original como referencia (Éste no aparecerá en la serie)
    const res = await fetch(API_URL_SONIC_SERIES);
    const data = await res.json();

    // Accedo al juego de Sonic Original (id)
    const res3 = await fetch(API_URL_SONIC);
    const data3 = await res3.json();

    if(res.status !== 200) {
        console.log("Hubo un error: " + res.status);
    } else {
        // Incluyo los 10 juegos de la primera página de la serie de Sonic en el array
        sonic_series.push(data.results);
        console.log('Página 1', data.results);

        // Accedo a la siguiente página de la serie
        new_url = data.next;

        // Ciclo que recorre las (62/10 = 6.2 => aprox. 6) páginas faltantes de la serie, accede a cada lista de juegos y los agregar al array
        for(let i = 1; i <= (data.count)/10; i++) {
            res2 = await fetch(new_url);
            data2 = await res2.json();
            console.log('Página '+(i+1), data2.results);
            sonic_series.push(data2.results);
            new_url = data2.next;
        }
    }

    // Agrego el juego original al array de último para mantener el orden por "released"
    sonic_series.push(data3);

    // Aplano el array de arrays (cada página es una array) para que sea un array de objetos
    sonic_series = sonic_series.flat();
    console.log('Sonic Series', sonic_series);

    // Invoco la función que renderiza los playED Games
    showPlayedGames();
}

showSonicSeries();

// Función que muestra los playED Games
function showPlayedGames() {
    for(let i=0; i < playED_games.length; i++) {
        sonic_series.forEach(item => {
            if(item.slug == playED_games[i]) {
                const div = document.createElement('div');
                const img = document.createElement('img');
                img.src = item.background_image;
                img.width =  140;
                const span = document.createElement('span');
                const spanText = document.createTextNode(item.name);
                
                span.appendChild(spanText);
                div.appendChild(img);
                div.appendChild(span);
                playedGamesContainer.appendChild(div);
            }
        });
    }
}

// showPlayedGames();

// async function showGame() {
//     const res = await fetch(API_URL_GAME);
//     const data = await res.json();

//     if(res.status !== 200) {
//         console.log("Hubo un error: " + res.status);
//     } else {
//         console.log('Games', data);
//         const img2 = document.getElementById('img2');
//         img2.src = data.background_image;
//         const span2 = document.getElementById('span2');
//         span2.innerHTML = data.name;
//         console.log(data.results);
//     }
// }

// showGame();


// async function showGenres() {
//     const res = await fetch(API_URL_GENRES);
//     const data = await res.json();

//     if(res.status !== 200) {
//         console.log("Hubo un error: " + res.status);
//     } else {
//         console.log('Genres', data);

//         const platforms = data.results[10];
//         console.log('Platforms', platforms);
//         const games = platforms.games;
//         console.log('Game', games);
//         const mario = games.find(item => item.name == 'Super Meat Boy');
//         console.log('Super Meat Boy', mario);
//     }
// }

// showGenres();

async function searchGame() {
    const res = await fetch(API_URL_SEARCH);
    const data = await res.json();

    if(res.status !== 200) {
        console.log("Hubo un error: " + res.status);
    } else {
        console.log('Search', data.results);
    }
}

searchGame();


/* Notas */
/*

* Cambiaré el color del header para cada vista.
* En la  vista de juegos jugados, jugando y por jugar, main no puede medir 90vh de height.
* Intentar colocar 90vh de height a la vista de descripción del juego.

*/