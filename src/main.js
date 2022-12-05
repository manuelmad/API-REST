// URL GENERAL
const API_URL = 'https://api.rawg.io/api';

// EJEMPLO DE URL QUE CONTIENE A LOS JUEGOS EN PÁGINAS DE 30 JUEGOS CADA UNA Y ACCEDO A LA PÁGINA 2
const API_URL_SONIC_SERIES = 'https://api.rawg.io/api/games/sonic-the-hedgehog/game-series?key=8d35f3d37cff4c7c816bce53458b3cb4';

// const API_URL_GAME = 'https://api.rawg.io/api/games/sonic-3-and-knuckles?key=8d35f3d37cff4c7c816bce53458b3cb4'

// EJEMPLO DE URL QUE CONTIENE A LOS GÉNEROS
// const API_URL_GENRES = 'https://api.rawg.io/api/genres?key=8d35f3d37cff4c7c816bce53458b3cb4';

let sonic_series = [];
// let playED_games = [];
// let playING_games = [];
// let TOplay_games = [];
let new_url;
let res2;
let data2;

async function showSonicSeries() {
    const res = await fetch(API_URL_SONIC_SERIES);
    const data = await res.json();

    if(res.status !== 200) {
        console.log("Hubo un error: " + res.status);
    } else {
        sonic_series.push(data.results);
        console.log('Games', data);
        console.log('Página 1', data.results);
        new_url = data.next;
        for(let i = 1; i <= (data.count)/10; i++) {
            // console.log('Games', data.results);
            res2 = await fetch(new_url);
            data2 = await res2.json();
            console.log('Página '+(i+1), data2.results);
            sonic_series.push(data2.results);
            new_url = data2.next;
        }
    }
    sonic_series = sonic_series.flat();
    console.log('Sonic Series', sonic_series);
    showPlayedGames();
}

showSonicSeries();

function showPlayedGames() {
    for(let i=0; i < playED_games.length; i++) {
        sonic_series.forEach(item => {
            if(item.slug == playED_games[i]) {
                const div = document.createElement('div');
                const img = document.createElement('img');
                img_name = item.slug;
                img_url = `../img/sonic/${img_name}.jpg`;
                //img.src = img_url;
                if(img_url == undefined) {
                    img.src = item.background_image;
                } else {
                    img.src = img_url;
                }
                //img.src = item.background_image;
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

// sonic_series[0].played = true;



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


/* Notas */
/*

* Cambiaré el color del header para cada vista.
* En la  vista de juegos jugados, jugando y por jugar, main no puede medir 90vh de height.
* Intentar colocar 90vh de height a la vista de descripción del juego.

*/