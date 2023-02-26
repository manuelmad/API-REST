// Condicionales para verificar al cargar la aplicación si las listas de juegos existen en localStorage. En caso afirmativo, traer los juegos en forma de array y agregarlos a las variables de listas. En caso negativo, asignarle el valor de array vacío.

if(localStorage.getItem('all_games')) {
    allGamesObjects = Object.values(JSON.parse(localStorage.getItem('all_games')));
} else {
    allGamesObjects = [];
}

if(localStorage.getItem('played_games')) {
    let a = Object.values(JSON.parse(localStorage.getItem('played_games')));
    playED_games = a.map(item => item.slug);
} else {
    playED_games = [];
}

if(localStorage.getItem('playing_games')) {
    let b = Object.values(JSON.parse(localStorage.getItem('playing_games')));
    playING_games = b.map(item => item.slug);
} else {
    playING_games = [];
}

if(localStorage.getItem('toplay_games')) {
    let c = Object.values(JSON.parse(localStorage.getItem('toplay_games')));
    TOplay_games = c.map(item => item.slug);
} else {
    TOplay_games = [];
}


// Funciones para verificar que existen las listas de juegos en el local storage
function allGamesList() {
    const item = JSON.parse(localStorage.getItem('all_games'));
    let games;
    if(item) {
        games = item;
    } else {
        games = {};
    }
    return games;
}

function playedGamesList() {
    const item = JSON.parse(localStorage.getItem('played_games'));
    let games;
    if(item) {
        games = item;
    } else {
        games = {};
    }
    return games;
}

function playingGamesList() {
    const item = JSON.parse(localStorage.getItem('playing_games'));
    let games;
    if(item) {
        games = item;
    } else {
        games = {};
    }
    return games;
}

function toPlayGamesList() {
    const item = JSON.parse(localStorage.getItem('toplay_games'));
    let games;
    if(item) {
        games = item;
    } else {
        games = {};
    }
    return games;
}

// Funciones para agregar el juego a la lista correspondiente, si no existía allí. Si ya existe, lo ignora.
function allGames(game) {
    const allGames = allGamesList();

    if(allGames[game.id]) {
        console.log('El juego ya está en storage');
    } else {
        allGames[game.id] = game;
        console.log('El juego no está en storage');
    }
    localStorage.setItem('all_games', JSON.stringify(allGames));
    allGamesObjects = Object.values(JSON.parse(localStorage.getItem('all_games')));
}

function playedGames(game) {
    const playedGames = playedGamesList();

    if(playedGames[game.id]) {
        console.log('El juego ya está en storage');
    } else {
        playedGames[game.id] = game;
        console.log('El juego no está en storage');
    }
    localStorage.setItem('played_games', JSON.stringify(playedGames));
    let a = Object.values(JSON.parse(localStorage.getItem('played_games')));
    playED_games = a.map(item => item.slug);
}

function playingGames(game) {
    const playingGames = playingGamesList();

    if(playingGames[game.id]) {
        console.log('El juego ya está en storage');
    } else {
        playingGames[game.id] = game;
        console.log('El juego no está en storage');
    }
    localStorage.setItem('playing_games', JSON.stringify(playingGames));
    let b = Object.values(JSON.parse(localStorage.getItem('playing_games')));
    playING_games = b.map(item => item.slug);
}

function toPlayGames(game) {
    const toplayGames = toPlayGamesList();

    if(toplayGames[game.id]) {
        console.log('El juego ya está en storage');
    } else {
        toplayGames[game.id] = game;
        console.log('El juego no está en storage');
    }
    localStorage.setItem('toplay_games', JSON.stringify(toplayGames));
    let c = Object.values(JSON.parse(localStorage.getItem('toplay_games')));
    TOplay_games = c.map(item => item.slug);
}


// Funciones para eliminar un juego de las listas correspondientes.
function allGamesDelete(game) {
    const allGames = allGamesList();
    delete allGames[game.id];

    localStorage.setItem('all_games', JSON.stringify(allGames));
    allGamesObjects = Object.values(JSON.parse(localStorage.getItem('all_games')));
}

function playedGamesDelete(game) {
    const playedGames = playedGamesList();
    delete playedGames[game.id];

    localStorage.setItem('played_games', JSON.stringify(playedGames));
    let a = Object.values(JSON.parse(localStorage.getItem('played_games')));
    playED_games = a.map(item => item.slug);
}

function playingGamesDelete(game) {
    const playingGames = playingGamesList();
    delete playingGames[game.id];

    localStorage.setItem('playing_games', JSON.stringify(playingGames));
    let b = Object.values(JSON.parse(localStorage.getItem('playing_games')));
    playING_games = b.map(item => item.slug);
}

function toPlayGamesDelete(game) {
    const toplayGames = toPlayGamesList();
    delete toplayGames[game.id];

    localStorage.setItem('toplay_games', JSON.stringify(toplayGames));
    let c = Object.values(JSON.parse(localStorage.getItem('toplay_games')));
    TOplay_games = c.map(item => item.slug);
}


// Función que muestra los playED Games
function showPlayedGames(list) {
    playedGamesContainer.innerHTML = '';

    // Condicional para mostrar un mensaje de categoría vacía
    if(playED_games.length == 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty');
        emptyDiv.innerText = 'You have not added any game in this category yet';
        playedGamesContainer.appendChild(emptyDiv);
    }

    // Ciclo que genera un div por cada juego
    for(let i=0; i < list.length; i++) {
        allGamesObjects.forEach(item => {
            if(item.slug == list[i]) {
                const div = document.createElement('div');
                const img = document.createElement('img');
                img.dataset.src = item.background_image; // Le asigno el atributo data-src para que no renderice la imagen todavía
                const span = document.createElement('span');
                const spanText = document.createTextNode(item.name);
                const span2 = document.createElement('span');
                span2.className = 'span-x';
                span2.innerText = 'X';

                // Agregar un solo listener, al div contenedor, y delegarle eventos a la etiqueta img y al span de la x. También modifica el localStorage
                div.addEventListener('click', (event) => {
                    // Evento para que la imagen lleve a la vista de descripción del juego
                    if(event.target.nodeName === 'IMG') {
                        location.hash = '#game='+item.slug;
                        showGameDetails(item.slug);
                    }
                    // Evento para que el span2 con la X saque al objeto del array general y al slug al array playED. También modifica el localStorage
                    if(event.target.className === 'span-x') {
                        allGamesDelete(item);
                        playedGamesDelete(item);
                        console.log('deleted from playED!');
                        alert(`${item.name} deleted from playED Games.`);
                        showPlayedGames(playED_games);
                    }
                });

                span.appendChild(spanText);
                div.appendChild(img);
                div.appendChild(span);
                div.appendChild(span2);
                playedGamesContainer.appendChild(div);
                registerImage(div);
            }
        });
    }
}

// Función que muestra los playING Games
function showPlayingGames(list) {
    playingGamesContainer.innerHTML = '';

    // Condicional para mostrar un mensaje de categoría vacía
    if(playING_games.length == 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty');
        emptyDiv.innerText = 'You have not added any game in this category yet';
        playingGamesContainer.appendChild(emptyDiv);
    }
    
     // Ciclo que genera un div por cada juego
    for(let i=0; i < list.length; i++) {
        allGamesObjects.forEach(item => {
            if(item.slug == list[i]) {
                const div = document.createElement('div');
                const img = document.createElement('img');
                img.dataset.src = item.background_image; // Le asigno el atributo data-src para que no renderice la imagen todavía
                const span = document.createElement('span');
                const spanText = document.createTextNode(item.name);
                const span2 = document.createElement('span');
                span2.className = 'span-x';
                span2.innerText = 'X';
                const span3 = document.createElement('span');
                span3.className = 'span-add-to-played';
                span3.innerText = 'Add to playED';

                // Agregar un solo listener, al div contenedor, y delegarle eventos a la etiqueta img, al span add-to-played y al span de la x
                div.addEventListener('click', (event) => {
                    // Evento para que la imagen lleve a la vista de descripción del juego
                    if(event.target.nodeName === 'IMG') {
                        location.hash = '#game='+item.slug;
                        showGameDetails(item.slug);
                    }
                    // Evento para que el span2 con la X saque al objeto del array general y al slug del array playING. También modifica el localStorage
                    if(event.target.className === 'span-x') {
                        allGamesDelete(item);
                        playingGamesDelete(item);
                        console.log('deleted from playING!');
                        alert(`${item.name} deleted from playING Games.`);
                        showPlayingGames(playING_games);
                    }
                    // Evento para que el span3 agregue el slug al array playED y lo elimine del array playING. También modifica el localStorage
                    if(event.target.className === 'span-add-to-played') {
                        playedGames(item);
                        playingGamesDelete(item);
                        console.log('added to playED! and deleted from playING');
                        alert(`${item.name} added to playED and deleted from playING.`);
                        showPlayingGames(playING_games);
                    }
                });

                span.appendChild(spanText);
                div.appendChild(img);
                div.appendChild(span);
                div.appendChild(span2);
                div.appendChild(span3);
                playingGamesContainer.appendChild(div);
                registerImage(div);
            }
        });
    }
}


// Función que muestra los TOplay Games
function showToPlayGames(list) {
    toplayGamesContainer.innerHTML = '';

    // Condicional para mostrar un mensaje de categoría vacía
    if(TOplay_games.length == 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty');
        emptyDiv.innerText = 'You have not added any game in this category yet';
        toplayGamesContainer.appendChild(emptyDiv);
    }
    
    // Ciclo que genera un div por cada juego
    for(let i=0; i < list.length; i++) {
        allGamesObjects.forEach(item => {
            if(item.slug == list[i]) {
                const div = document.createElement('div');
                const img = document.createElement('img');
                img.dataset.src = item.background_image; // Le asigno el atributo data-src para que no renderice la imagen todavía
                const span = document.createElement('span');
                const spanText = document.createTextNode(item.name);
                const span2 = document.createElement('span');
                span2.className = 'span-x';
                span2.innerText = 'X';
                const span3 = document.createElement('span');
                span3.className = 'span-add-to-playing';
                span3.innerText = 'Add to playING';

                 // Agregar un solo listener, al div contenedor, y delegarle eventos a la etiqueta img, al span add-to-playing y al span de la x
                 div.addEventListener('click', (event) => {
                    // Evento para que la imagen lleve a la vista de descripción del juego
                    if(event.target.nodeName === 'IMG') {
                        location.hash = '#game='+item.slug;
                        showGameDetails(item.slug);
                    }
                    // Evento para que el span2 con la X saque al objeto del array general y al slug del array TOplay. También modifica el localStorage
                    if(event.target.className === 'span-x') {
                        allGamesDelete(item);
                        toPlayGamesDelete(item);
                        console.log('deleted from TOplay!');
                        alert(`${item.name} deleted from TOplay Games.`);
                        showToPlayGames(TOplay_games);
                    }
                    // Evento para que el span3 agregue el slug al array playING y lo elimine del array TOplay. También modifica el localStorage
                    if(event.target.className === 'span-add-to-playing') {
                        playingGames(item);
                        toPlayGamesDelete(item);
                        console.log('added to playING! and deleted from TOplay');
                        alert(`${item.name} added to playING and deleted from TOplay.`);
                        showToPlayGames(TOplay_games);
                    }
                 });

                span.appendChild(spanText);
                div.appendChild(img);
                div.appendChild(span);
                div.appendChild(span2);
                div.appendChild(span3);
                toplayGamesContainer.appendChild(div);
                registerImage(div);
            }
        });
    }
}

// Función que muestra los juegos resultantes de la búsqueda
async function searchGame() {
    let query = searchGamesInput.value;
    const res = await fetch(`${API_URL_SEARCH}${query}&key=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    searchGamesContainer.innerHTML = '';
    trendingTitle.innerHTML = `Search results by <span>"${query}"</span>`;

    if(res.status !== 200) {
        console.log("There was an error: " + res.status);
    } else {
        let searchedGames = data.results; // Arroja un array de 20 juegos
        searchedGames.forEach(item => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.dataset.src = item.background_image; // Le asigno el atributo data-src para que no renderice la imagen todavía
            const span = document.createElement('span');
            const spanText = document.createTextNode(item.name);

            const span2 = document.createElement('span');
            span2.innerText = 'playED';
            span2.className = 'span-add-to-played';

            const span3 = document.createElement('span');
            span3.innerText = 'playING';
            span3.className = 'span-add-to-playing';

            const span4 = document.createElement('span');
            span4.innerText = 'TOplay';
            span4.className = 'span-add-to-toplay';

            span.appendChild(spanText);
            div.appendChild(img);
            div.appendChild(span);
            div.appendChild(span2);
            div.appendChild(span3);
            div.appendChild(span4);

            // Agregar un solo listener, al div contenedor, y delegarle eventos a la etiqueta img,al span add-to-played, al span add-to-playing, al span add-to-toplay y al span de la x
            div.addEventListener('click', (event) => {
                // Evento para que la imagen lleve a la vista de descripción del juego
                if(event.target.nodeName === 'IMG') {
                    location.hash = '#game='+item.slug;
                    showGameDetails(item.slug);
                }
                // Evento para que el span3 agregue el objeto al array general y el slug al array playED. También modifica el localStorage
                if(event.target.className === 'span-add-to-played') {
                    allGamesList();
                    playedGamesList();
                    const check = allGamesObjects.find(element => element.slug === item.slug);
                    if(!check) {
                        playedGames(item);
                        allGames(item);
                        console.log('added to playED!');
                        alert(`${item.name} added to playED Games.`);
                    } else {
                        console.log("This game already exists in the App!");
                        alert("This game already exists in the App!");
                    }
                }
                // Evento para que el span3 agregue el objeto al array general y el slug al array playING. También modifica el localStorage
                if(event.target.className === 'span-add-to-playing') {
                    allGamesList();
                    playingGamesList();
                    const check = allGamesObjects.find(element => element.slug === item.slug);
                    console.log(check);
                    if(!check) {
                        playingGames(item);
                        allGames(item);
                        console.log('added to playING!');
                        alert(`${item.name} added to playING Games.`);
                    } else {
                        console.log("This game already exists in the App!");
                        alert("This game already exists in the App!");
                    }
                }
                // Evento para que el span4 agregue el objeto al array general y el slug al array TOplay. También modifica el localStorage
                if(event.target.className === 'span-add-to-toplay') {
                    allGamesList();
                    toPlayGamesList();
                    const check = allGamesObjects.find(element => element.slug === item.slug);
                    console.log(check);
                    if(!check) {
                        toPlayGames(item);
                        allGames(item);
                        console.log('added to TOplay!');
                        alert(`${item.name} added to TOplay Games.`);
                    } else {
                        console.log("This game already exists in the App!");
                        alert("This game already exists in the App!");
                    }
                }
            });
            searchGamesContainer.appendChild(div);
            registerImage(div);
        });
    }

    // Inicio el conteo de las páginas de resultados
    list_page = 1;
    // Mostrar el número de página actual / número de páginas totales
    page_number.innerText = `${list_page} / ${Math.ceil(data.count/20)}`;
}


// Función que muestra por defecto en la vista de búsqueda los juegos en tendencia. Estos serán sustituidos luego por los juegos resultantes de la búsqueda
async function trendingGames() {
    const res = await fetch(`${API_URL_GAMES}?key=${API_KEY}&limit=20`);
    const data = await res.json();

    searchGamesContainer.innerHTML = '';
    trendingTitle.innerText = 'Popular Games';

    if(res.status !== 200) {
        console.log("Hubo un error: " + res.status);
    } else {
        let trendingGames = data.results; // Arroja un array de 20 juegos
        trendingGames.forEach(item => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.dataset.src = item.background_image; // Le asigno el atributo data-src para que no renderice la imagen todavía
            const span = document.createElement('span');
            const spanText = document.createTextNode(item.name);

            const span2 = document.createElement('span');
            span2.innerText = 'playED';
            span2.className = 'span-add-to-played';

            const span3 = document.createElement('span');
            span3.innerText = 'playING';
            span3.className = 'span-add-to-playing';

            const span4 = document.createElement('span');
            span4.innerText = 'TOplay';
            span4.className = 'span-add-to-toplay';

            span.appendChild(spanText);
            div.appendChild(img);
            div.appendChild(span);
            div.appendChild(span2);
            div.appendChild(span3);
            div.appendChild(span4);

            // Agregar un solo listener, al div contenedor, y delegarle eventos a la etiqueta img,al span add-to-played, al span add-to-playing, al span add-to-toplay y al span de la x
            div.addEventListener('click', (event) => {
                // Evento para que la imagen lleve a la vista de descripción del juego
                if(event.target.nodeName === 'IMG') {
                    location.hash = '#game='+item.slug;
                    showGameDetails(item.slug);
                }
                // Evento para que el span3 agregue el objeto al array general y el slug al array playED. También modifica el localStorage
                if(event.target.className === 'span-add-to-played') {
                    allGamesList();
                    playedGamesList();
                    const check = allGamesObjects.find(element => element.slug === item.slug);
                    if(!check) {
                        playedGames(item);
                        allGames(item);
                        console.log('added to playED!');
                        alert(`${item.name} added to playED Games.`);
                    } else {
                        console.log("This game already exists in the App!");
                        alert("This game already exists in the App!");
                    }
                }
                // Evento para que el span3 agregue el objeto al array general y el slug al array playING. También modifica el localStorage
                if(event.target.className === 'span-add-to-playing') {
                    allGamesList();
                    playingGamesList();
                    const check = allGamesObjects.find(element => element.slug === item.slug);
                    console.log(check);
                    if(!check) {
                        playingGames(item);
                        allGames(item);
                        console.log('added to playING!');
                        alert(`${item.name} added to playING Games.`);
                    } else {
                        console.log("This game already exists in the App!");
                        alert("This game already exists in the App!");
                    }
                }
                // Evento para que el span4 agregue el objeto al array general y el slug al array TOplay. También modifica el localStorage
                if(event.target.className === 'span-add-to-toplay') {
                    allGamesList();
                    toPlayGamesList();
                    const check = allGamesObjects.find(element => element.slug === item.slug);
                    console.log(check);
                    if(!check) {
                        toPlayGames(item);
                        allGames(item);
                        console.log('added to TOplay!');
                        alert(`${item.name} added to TOplay Games.`);
                    } else {
                        console.log("This game already exists in the App!");
                        alert("This game already exists in the App!");
                    }
                }
            });
            searchGamesContainer.appendChild(div);
            registerImage(div);
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
