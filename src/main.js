// key=8d35f3d37cff4c7c816bce53458b3cb4

// URL GENERAL
const API_URL = 'https://api.rawg.io/api';

// const API_URL_SEARCH = 'https://api.rawg.io/api/games?search=sonic-the-hedgehog-2?key=8d35f3d37cff4c7c816bce53458b3cb4';


// Array que contendrá todos los juegos del usuario en forma de objeto
let allGamesObjects = [];

async function getGame(list) {
    for(let j=0; j < list.length; j++) {
        let game = list[j];
        let API_URL_GAME = `${API_URL}/games/${game}?key=${API_KEY}`;
        let res = await fetch(API_URL_GAME);
        let data = await res.json();
        data.background_image = `../img/sonic/${game}.jpg`;

        if(res.status !== 200) {
            console.log("Hubo un error: " + res.status);
        } else {
            allGamesObjects.push(data);
            // console.log('Juego '+(j+1), data.name);
        }
    }
}
getGame(playED_games);
getGame(playING_games);
getGame(TOplay_games);

console.log('allGamesObjects', allGamesObjects);


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
    // showPlayedGames();
    // Invoco la función que renderiza los playING Games
    // showPlayingGames();
    // Invoco la función que renderiza los TO play Games
    // showToPlayingGames();
}

// showSonicSeries();

// Función que muestra los playED Games
function showPlayedGames(list) {
    for(let i=0; i < list.length; i++) {
        allGamesObjects.forEach(item => {
            if(item.slug == list[i]) {
                const div = document.createElement('div');
                const img = document.createElement('img');
                // const img_name = item.slug;
                // const img_url = `../img/sonic/${img_name}.jpg`;
                // console.log('ruta de imagen', img_url);
                // img.src = img_url;
                img.src = item.background_image;
                const span = document.createElement('span');
                const spanText = document.createTextNode(item.name);
                const span2 = document.createElement('span');
                span2.innerText = 'X';

                span.appendChild(spanText);
                div.appendChild(img);
                div.appendChild(span);
                div.appendChild(span2);
                playedGamesContainer.appendChild(div);
            }
        });
    }
}

// Función que muestra los playING Games
function showPlayingGames(list) {
    for(let i=0; i < list.length; i++) {
        allGamesObjects.forEach(item => {
            if(item.slug == list[i]) {
                const div = document.createElement('div');
                const img = document.createElement('img');
                const img_name = item.slug;
                const img_url = `../img/sonic/${img_name}.jpg`;
                // console.log('ruta de imagen', img_url);
                img.src = img_url;
                const span = document.createElement('span');
                const spanText = document.createTextNode(item.name);
                const span2 = document.createElement('span');
                span2.innerText = 'X';
                const span3 = document.createElement('span');
                span3.innerText = 'Agregar a playED';

                span.appendChild(spanText);
                div.appendChild(img);
                div.appendChild(span);
                div.appendChild(span2);
                div.appendChild(span3);
                playingGamesContainer.appendChild(div);
            }
        });
    }
}


// Función que muestra los TOplay Games
function showToPlayGames(list) {
    for(let i=0; i < list.length; i++) {
        allGamesObjects.forEach(item => {
            if(item.slug == list[i]) {
                const div = document.createElement('div');
                const img = document.createElement('img');
                const img_name = item.slug;
                const img_url = `../img/sonic/${img_name}.jpg`;
                // console.log('ruta de imagen', img_url);
                img.src = img_url;
                const span = document.createElement('span');
                const spanText = document.createTextNode(item.name);
                const span2 = document.createElement('span');
                span2.innerText = 'X';
                const span3 = document.createElement('span');
                span3.innerText = 'Agregar a playING';

                span.appendChild(spanText);
                div.appendChild(img);
                div.appendChild(span);
                div.appendChild(span2);
                div.appendChild(span3);
                toplayGamesContainer.appendChild(div);
            }
        });
    }
}


async function searchGame() {
    let query = searchGamesInput.value;
    const res = await fetch(`${API_URL}/games?search=${query}&key=${API_KEY}`);
    const data = await res.json();

    searchGamesContainer.innerHTML = '';

    if(res.status !== 200) {
        console.log("Hubo un error: " + res.status);
    } else {
        console.log('Search', data.results);
        let searchedGames = data.results; // Arroja un array de 20 juegos
        searchedGames.forEach(item => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = item.background_image;
            const span = document.createElement('span');
            const spanText = document.createTextNode(item.name);

            const span2 = document.createElement('span');
            span2.innerText = 'playED';

            const span3 = document.createElement('span');
            span3.innerText = 'playING';

            const span4 = document.createElement('span');
            span4.innerText = 'TOplay';

            span.appendChild(spanText);
            div.appendChild(img);
            div.appendChild(span);
            div.appendChild(span2);
            div.appendChild(span3);
            div.appendChild(span4);

            searchGamesContainer.appendChild(div);
        });
    }
}



/* Notas */
/*

* Cambiaré el color del header para cada vista.
* En la  vista de juegos jugados, jugando y por jugar, main no puede medir 90vh de height.
* Intentar colocar 90vh de height a la vista de descripción del juego.

*/