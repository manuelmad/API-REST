// URL GENERAL
const API_URL = 'https://api.rawg.io/api';

const API_URL_USER = 'https://api.rawg.io/api/users/manuelmad';

const API_URL_GAMES = 'https://api.rawg.io/api/games';

const API_URL_SEARCH = 'https://api.rawg.io/api/games?search=';

// Inicio a la dependencia RAWGer
// const Rawger = require('rawger');

// async function getOwned() {
//     const rawger = await Rawger();
//     const { users } = rawger;

//     // Accedo a los juegos beaten de mi usuario
//     const owned = await users('manuelmad').games('owned');
//     console.log(owned);
// }

// getOwned();


// Función para obtener información de usuario
async function getUserInfo() {
    const res = await fetch(`${API_URL_USER}/games?key=${API_KEY}`);
    const data = await res.json();

    console.log('User', data);
}

getUserInfo();


// Función para actualizar el status de un juego (NO ME FUNCIONA, 401 CORS)
// async function updateStatus() {
//     const res = await fetch(`${API_URL}/users/current/games/25807`, {
//         method: 'PATCH',
//         headers: {
//             "Content-Type": "application/json",
//             "token": token,
//         },
//         body: {
//             "game": 25807,
//             "status": "beaten",
//         },
//     });
//     const data = await res.json();

//     console.log('res', res);
//     console.log('data', data);
// }

// updateStatus();


// Array que contendrá todos los juegos del usuario en forma de objeto
let allGamesObjects = [];

async function createFullDataBase(list) {
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
createFullDataBase(playED_games);
createFullDataBase(playING_games);
createFullDataBase(TOplay_games);

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
    playedGamesContainer.innerHTML = '';
 
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

                // Evento para que la imagen lleve a la vista de descripción del juego
                img.addEventListener('click', () => { 
                    location.hash = '#game='+item.slug;
                    showGameDetails(item.slug);
                });

                // Evento para que el span2 con la X saque al objeto del array gerenal y al slug al array playED
                span2.addEventListener('click', () => { 
                    const indexSlug = playED_games.indexOf(item.slug);
                    const indexObject = allGamesObjects.indexOf(item);                 
                    playED_games.splice(indexSlug, 1);
                    allGamesObjects.splice(indexObject, 1);
                    console.log('deleted from playED!');
                    alert(`${item.name} eliminado de la lista de playED Games.`);
                    showPlayedGames(playED_games);
                });

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
    playingGamesContainer.innerHTML = '';
    
    for(let i=0; i < list.length; i++) {
        allGamesObjects.forEach(item => {
            if(item.slug == list[i]) {
                const div = document.createElement('div');
                const img = document.createElement('img');
                // const img_name = item.slug;
                // const img_url = `../img/sonic/${img_name}.jpg`;
                const img_url = item.background_image;
                // console.log('ruta de imagen', img_url);
                img.src = img_url;
                const span = document.createElement('span');
                const spanText = document.createTextNode(item.name);
                const span2 = document.createElement('span');
                span2.innerText = 'X';
                const span3 = document.createElement('span');
                span3.innerText = 'Agregar a playED';

                // Evento para que la imagen lleve a la vista de descripción del juego
                img.addEventListener('click', () => { 
                    location.hash = '#game='+item.slug;
                    showGameDetails(item.slug);
                });

                // Evento para que el span2 con la X saque al objeto del array general y al slug del array playING
                span2.addEventListener('click', () => { 
                    const indexSlug = playING_games.indexOf(item.slug);
                    const indexObject = allGamesObjects.indexOf(item);                 
                    playING_games.splice(indexSlug, 1);
                    allGamesObjects.splice(indexObject, 1);
                    console.log('deleted from playING!');
                    alert(`${item.name} eliminado de la lista de playING Games.`);
                    showPlayingGames(playING_games);
                });

                // Evento para que el span3 agregue el slug al array playED y lo elimine del array playING
                span3.addEventListener('click', () => {
                    playED_games.push(item.slug);
                    const indexSlug = playING_games.indexOf(item.slug);
                    playING_games.splice(indexSlug, 1);
                    console.log('added to playED! and deleted from playING');
                    alert(`${item.name} agregado a la lista de playED Games y eliminado de la lista playING Games.`);
                    showPlayingGames(playING_games);
                });

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
    toplayGamesContainer.innerHTML = '';
   
    for(let i=0; i < list.length; i++) {
        allGamesObjects.forEach(item => {
            if(item.slug == list[i]) {
                const div = document.createElement('div');
                const img = document.createElement('img');
                // const img_name = item.slug;
                // const img_url = `../img/sonic/${img_name}.jpg`;
                // console.log('ruta de imagen', img_url);
                const img_url = item.background_image;
                img.src = img_url;
                const span = document.createElement('span');
                const spanText = document.createTextNode(item.name);
                const span2 = document.createElement('span');
                span2.innerText = 'X';
                const span3 = document.createElement('span');
                span3.innerText = 'Agregar a playING';

                // Evento para que la imagen lleve a la vista de descripción del juego
                img.addEventListener('click', () => { 
                    location.hash = '#game='+item.slug;
                    showGameDetails(item.slug);
                });

                // Evento para que el span2 con la X saque al objeto del array general y al slug del array TOplay
                span2.addEventListener('click', () => { 
                    const indexSlug = TOplay_games.indexOf(item.slug);
                    const indexObject = allGamesObjects.indexOf(item);                 
                    TOplay_games.splice(indexSlug, 1);
                    allGamesObjects.splice(indexObject, 1);
                    console.log('deleted from TOplay!');
                    alert(`${item.name} eliminado de la lista de TOplay Games.`);
                    showToPlayGames(TOplay_games);
                });
                
                // Evento para que el span3 agregue el slug al array playING y lo elimine del array TOplay
                span3.addEventListener('click', () => {
                    playING_games.push(item.slug);
                    const indexSlug = TOplay_games.indexOf(item.slug);
                    TOplay_games.splice(indexSlug, 1);
                    console.log('added to playING! and deleted from TOplay');
                    alert(`${item.name} agregado a la lista de playING Games y eliminado de la lista TOplay Games.`);
                    showToPlayGames(TOplay_games);
                });

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

// Función que muestra los juegos resultantes de la búsqueda
async function searchGame() {
    let query = searchGamesInput.value;
    // const res = await fetch(`${API_URL}/games?search=${query}&key=${API_KEY}`);
    const res = await fetch(`${API_URL_SEARCH}${query}&key=${API_KEY}`);
    const data = await res.json();

    searchGamesContainer.innerHTML = '';
    trendingTitle.innerText = `Search results by "${query}"`;

    if(res.status !== 200) {
        console.log("Hubo un error: " + res.status);
    } else {
        console.log('Search', data);
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

            // Evento para que la imagen lleve a la vista de descripción del juego
            img.addEventListener('click', () => { 
                location.hash = '#game='+item.slug;
                showGameDetails(item.slug);
            });

            // Evento para que el span3 agregue el objeto al array general y el slug al array playED
            span2.addEventListener('click', () => {
                const check = allGamesObjects.find(element => element.slug === item.slug);
                console.log(check);
                if(!check) {
                    playED_games.push(item.slug);
                    allGamesObjects.push(item);
                    console.log('added to playED!');
                    alert(`${item.name} agregado a la lista de playED Games.`);
                } else {
                    console.log("Este juego ya existe en la Aplicación!");
                    alert("Este juego ya existe en la Aplicación!");
                }
            });

            // Evento para que el span3 agregue el objeto al array general y el slug al array playING
            span3.addEventListener('click', () => {
                const check = allGamesObjects.find(element => element.slug === item.slug);
                console.log(check);
                if(!check) {
                    playING_games.push(item.slug);
                    allGamesObjects.push(item);
                    console.log('added to playING!');
                    alert(`${item.name} agregado a  la lista de playING Games.`);
                } else {
                    console.log("Este juego ya existe en la Aplicación!");
                    alert("Este juego ya existe en la Aplicación!");
                }

            });

            // Evento para que el span4 agregue el objeto al array general y el slug al array TOplay
            span4.addEventListener('click', () => {
                const check = allGamesObjects.find(element => element.slug === item.slug);
                console.log(check);
                if(!check) {
                    TOplay_games.push(item.slug);
                    allGamesObjects.push(item);
                    console.log('added to TOplay!');
                    alert(`${item.name} agregado a  la lista de TOplay Games.`);
                } else {
                    console.log("Este juego ya existe en en la Aplicación!");
                    alert("Este juego ya existe en la Aplicación!");
                }
            });
            searchGamesContainer.appendChild(div);
        });
    }

    // Inicio el conteo de las páginas de resultados
    list_page = 1;
    page_number.innerText = `${list_page} / ${Math.ceil(data.count/20)}`;
    console.log(list_page);
}

// Función que muestra los detalles del juego seleccionado
async function showGameDetails(game) {
    let API_URL_GAME = `${API_URL}/games/${game}?key=${API_KEY}`;
    const res = await fetch(`${API_URL_GAME}`);
    const data = await res.json();

    detailGamesContainer.innerHTML = '';

    if(res.status !== 200) {
        console.log("Hubo un error: " + res.status);
    } else {
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = data.background_image;
        const span = document.createElement('span');
        span.classList.add('game-detail-name');
        const spanText = document.createTextNode(data.name);
        const span2 = document.createElement('span');
        span2.classList.add('game-detail-description');
        span2.innerHTML = `<b>Description:</b>
        ${data.description}`;
        const span3 = document.createElement('span');
        span3.classList.add('game-detail-released');
        span3.innerHTML = `<b>Released:</b> ${data.released}.`;

        const genres = data.genres;
        const genresP = document.createElement('p');
        genres.forEach(element => {
            const genreSpan = document.createElement('span');
            genreSpan.classList.add('game-genre');
            genreSpan.innerText = element.name;
            genresP.appendChild(genreSpan);
        });

        const metacriticSpan = document.createElement('span');
        metacriticSpan.classList.add('game-metacritic');
        if(data.metacritic != null) {
            metacriticSpan.innerHTML = `<b>Metacritic score:</b> ${data.metacritic} / 100.`;
        } else {
            metacriticSpan.innerHTML = `<b>Metacritic score:</b> No disponible.`;
        }

        span.appendChild(spanText);
        div.appendChild(img);
        div.appendChild(span);
        div.appendChild(span3);
        div.appendChild(genresP);
        div.appendChild(span2);
        div.appendChild(metacriticSpan);

        detailGamesContainer.appendChild(div);
    }
}


// Función que muestra los juegos resultantes de la búsqueda
async function trendingGames() {
    const res = await fetch(`${API_URL_GAMES}?key=${API_KEY}`);
    const data = await res.json();

    searchGamesContainer.innerHTML = '';
    trendingTitle.innerText = 'Trending Games';

    if(res.status !== 200) {
        console.log("Hubo un error: " + res.status);
    } else {
        console.log('Search', data);
        console.log('Search', data.results);
        let trendingGames = data.results; // Arroja un array de 20 juegos
        trendingGames.forEach(item => {
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

            // Evento para que la imagen lleve a la vista de descripción del juego
            img.addEventListener('click', () => { 
                location.hash = '#game='+item.slug;
                showGameDetails(item.slug);
            });

            // Evento para que el span3 agregue el objeto al array general y el slug al array playED
            span2.addEventListener('click', () => {
                const check = allGamesObjects.find(element => element.slug === item.slug);
                console.log(check);
                if(!check) {
                    playED_games.push(item.slug);
                    allGamesObjects.push(item);
                    console.log('added to playED!');
                    alert(`${item.name} agregado a la lista de playED Games.`);
                } else {
                    console.log("Este juego ya existe en la Aplicación!");
                    alert("Este juego ya existe en la Aplicación!");
                }
            });

            // Evento para que el span3 agregue el objeto al array general y el slug al array playING
            span3.addEventListener('click', () => {
                const check = allGamesObjects.find(element => element.slug === item.slug);
                console.log(check);
                if(!check) {
                    playING_games.push(item.slug);
                    allGamesObjects.push(item);
                    console.log('added to playING!');
                    alert(`${item.name} agregado a  la lista de playING Games.`);
                } else {
                    console.log("Este juego ya existe en la Aplicación!");
                    alert("Este juego ya existe en la Aplicación!");
                }

            });

            // Evento para que el span4 agregue el objeto al array general y el slug al array TOplay
            span4.addEventListener('click', () => {
                const check = allGamesObjects.find(element => element.slug === item.slug);
                console.log(check);
                if(!check) {
                    TOplay_games.push(item.slug);
                    allGamesObjects.push(item);
                    console.log('added to TOplay!');
                    alert(`${item.name} agregado a  la lista de TOplay Games.`);
                } else {
                    console.log("Este juego ya existe en en la Aplicación!");
                    alert("Este juego ya existe en la Aplicación!");
                }
            });
            searchGamesContainer.appendChild(div);
        });
    }

    // Inicio el conteo de las páginas de resultados
    list_page = 1;
    page_number.innerText = `${list_page} / ${Math.ceil(data.count/20)}`;
    console.log(list_page);
}

// Muestro siempre las tendencias en la página de search, hasta que el usuario haga una búsqueda.
trendingGames();
/* Notas */
/*
    * No he podido usar PATCH y POST en la API, por lo cual tengo que hacer una base de datos local conformada por arrays que se reinician cada vez que actualizo la aplicación.
    * No he podido lograr que la página muestre los cambios cuando agrego o elimino juegos, por la razón anterior.
    * Decidir qué hacer con los inputs de búsqueda de cada pantalla.
    * Cambiar el diseño de los botones de la pantalla principal.
*/