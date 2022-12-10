// URL GENERAL
const API_URL = 'https://api.rawg.io/api';

const API_URL_USER = 'https://api.rawg.io/api/users/manuelmad';

const API_URL_GAMES = 'https://api.rawg.io/api/games';

const API_URL_SEARCH = 'https://api.rawg.io/api/games?search=';

// Array general que contendrá todos los juegos del usuario en forma de objetos
let allGamesObjects = [];

// Función para agregar al array anterior los juegos de los arrays creados en variables.js
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
        }
    }
}
// A la función anterior, le paso los array que creé en variables.js para agregar todos esos juegos a la lista general
createFullDataBase(playED_games);
createFullDataBase(playING_games);
createFullDataBase(TOplay_games);


// Función que muestra los playED Games
function showPlayedGames(list) {
    playedGamesContainer.innerHTML = '';
 
    for(let i=0; i < list.length; i++) {
        allGamesObjects.forEach(item => {
            if(item.slug == list[i]) {
                const div = document.createElement('div');
                const img = document.createElement('img');
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

                // Evento para que el span2 con la X saque al objeto del array general y al slug al array playED
                span2.addEventListener('click', () => { 
                    const indexSlug = playED_games.indexOf(item.slug);
                    const indexObject = allGamesObjects.indexOf(item);                 
                    playED_games.splice(indexSlug, 1);
                    allGamesObjects.splice(indexObject, 1);
                    console.log('deleted from playED!');
                    alert(`${item.name} deleted from playED Games.`);
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
                const img_url = item.background_image;
                img.src = img_url;
                const span = document.createElement('span');
                const spanText = document.createTextNode(item.name);
                const span2 = document.createElement('span');
                span2.innerText = 'X';
                const span3 = document.createElement('span');
                span3.innerText = 'Add to playED';

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
                    alert(`${item.name} deleted from playING Games.`);
                    showPlayingGames(playING_games);
                });

                // Evento para que el span3 agregue el slug al array playED y lo elimine del array playING
                span3.addEventListener('click', () => {
                    playED_games.push(item.slug);
                    const indexSlug = playING_games.indexOf(item.slug);
                    playING_games.splice(indexSlug, 1);
                    console.log('added to playED! and deleted from playING');
                    alert(`${item.name} added to playED and deleted from playING.`);
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
                const img_url = item.background_image;
                img.src = img_url;
                const span = document.createElement('span');
                const spanText = document.createTextNode(item.name);
                const span2 = document.createElement('span');
                span2.innerText = 'X';
                const span3 = document.createElement('span');
                span3.innerText = 'Add to playING';

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
                    alert(`${item.name} deleted from TOplay Games.`);
                    showToPlayGames(TOplay_games);
                });
                
                // Evento para que el span3 agregue el slug al array playING y lo elimine del array TOplay
                span3.addEventListener('click', () => {
                    playING_games.push(item.slug);
                    const indexSlug = TOplay_games.indexOf(item.slug);
                    TOplay_games.splice(indexSlug, 1);
                    console.log('added to playING! and deleted from TOplay');
                    alert(`${item.name} added to playING and deleted from TOplay.`);
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
    const res = await fetch(`${API_URL_SEARCH}${query}&key=${API_KEY}`);
    const data = await res.json();

    searchGamesContainer.innerHTML = '';
    trendingTitle.innerText = `Search results by "${query}"`;

    if(res.status !== 200) {
        console.log("There was an error: " + res.status);
    } else {
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
                if(!check) {
                    playED_games.push(item.slug);
                    allGamesObjects.push(item);
                    console.log('added to playED!');
                    alert(`${item.name} added to playED Games.`);
                } else {
                    console.log("This game already exists in the App!");
                    alert("This game already exists in the App!");
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
                    alert(`${item.name} added to playING Games.`);
                } else {
                    console.log("This game already exists in the App!");
                    alert("This game already exists in the App!");
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
                    alert(`${item.name} added to TOplay Games.`);
                } else {
                    console.log("This game already exists in the App!");
                    alert("This game already exists in the App!");
                }
            });
            searchGamesContainer.appendChild(div);
        });
    }

    // Inicio el conteo de las páginas de resultados
    list_page = 1;
    // Mostrar el número de página actual / número de páginas totales
    page_number.innerText = `${list_page} / ${Math.ceil(data.count/20)}`;
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
            metacriticSpan.innerHTML = `<b>Metacritic score:</b> Not Available.`;
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


// Función que muestra por defecto en la vista de búsqueda los juegos en tendencia. Estos serán sustituidos luego por los juegos resultantes de la búsqueda
async function trendingGames() {
    const res = await fetch(`${API_URL_GAMES}?key=${API_KEY}`);
    const data = await res.json();

    searchGamesContainer.innerHTML = '';
    trendingTitle.innerText = 'Trending Games';

    if(res.status !== 200) {
        console.log("Hubo un error: " + res.status);
    } else {
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
                    alert(`${item.name} added to playED Games.`);
                } else {
                    console.log("This game already exists in the App!");
                    alert("This game already exists in the App!");
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
                    alert(`${item.name} added to playING Games.`);
                } else {
                    console.log("This game already exists in the App!");
                    alert("This game already exists in the App!");
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
                    alert(`${item.name} added to TOplay Games.`);
                } else {
                    console.log("This game already exists in the App!");
                    alert("This game already exists in the App!");
                }
            });
            searchGamesContainer.appendChild(div);
        });
    }

    // Inicio el conteo de las páginas de resultados
    list_page = 1;
    // Mostrar el número de página actual / número de páginas totales
    page_number.innerText = `${list_page} / ${Math.ceil(data.count/20)}`;
}

// Muestro siempre las tendencias en la página de search, hasta que el usuario haga una búsqueda.
trendingGames();