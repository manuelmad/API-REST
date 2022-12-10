played_button.addEventListener('click', () => {
    location.hash = '#played';
});

playing_button.addEventListener('click', () => {
    location.hash = '#playing';
});

toplay_button.addEventListener('click', () => {
    location.hash = '#toplay';
});

search_button.addEventListener('click', () => {
    location.hash = '#search';
});

search_game_button.addEventListener('click', () => {
    location.hash = '#search=' + searchGamesInput.value;
    searchGame();
});

next_page_button.addEventListener('click', nextPage);

previous_page_button.addEventListener('click', previousPage);

arrowButton.addEventListener('click', () => {
    history.back();
    //location.hash = '#home';
});

homeButton.addEventListener('click', () => {
    location.hash = '#home';
});


window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({location});

    if(location.hash.startsWith('#played')) {
        playedPage();
    }
    else if(location.hash.startsWith('#playing')) {
        playingPage();
    }
    else if(location.hash.startsWith('#toplay')) {
        toplayPage();
    }
    else if(location.hash.startsWith('#search')) {
        searchPage();
    }
    else if(location.hash.startsWith('#game=')) {
        detailPage();
    }
    else {
        homePage();
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function homePage() {
    header.style.background = '#fe0100';
    arrowButton.classList.add('inactive');
    mainSectionContainer.classList.remove('inactive');
    playedSectionContainer.classList.add('inactive');
    playingSectionContainer.classList.add('inactive');
    toplaySectionContainer.classList.add('inactive');
    searchSectionContainer.classList.add('inactive');
    detailSectionContainer.classList.add('inactive');
    homeButton.classList.add('inactive');

    console.log('Home!!!');
    location.hash = '#home';
}

function playedPage() {
    console.log('PLAYED!!!');
    header.style.background = '#105001';
    mainSectionContainer.classList.add('inactive');
    arrowButton.classList.remove('inactive');
    homeButton.classList.remove('inactive');
    playedSectionContainer.classList.remove('inactive');
    playingSectionContainer.classList.add('inactive');
    toplaySectionContainer.classList.add('inactive');
    searchSectionContainer.classList.add('inactive');
    detailSectionContainer.classList.add('inactive');

    // Invoco la función que renderiza los playED Games
    showPlayedGames(playED_games);
}

function playingPage() {
    console.log('PLAYING!!!');
    header.style.background = '#120c5a';
    mainSectionContainer.classList.add('inactive');
    arrowButton.classList.remove('inactive');
    homeButton.classList.remove('inactive');
    playedSectionContainer.classList.add('inactive');
    playingSectionContainer.classList.remove('inactive');
    toplaySectionContainer.classList.add('inactive');
    searchSectionContainer.classList.add('inactive');
    detailSectionContainer.classList.add('inactive');

    // Invoco la función que renderiza los playING Games
    showPlayingGames(playING_games);
}

function toplayPage() {
    console.log('TO PLAY!!!');
    header.style.background = '#630001';
    mainSectionContainer.classList.add('inactive');
    arrowButton.classList.remove('inactive');
    homeButton.classList.remove('inactive');
    playedSectionContainer.classList.add('inactive');
    playingSectionContainer.classList.add('inactive');
    toplaySectionContainer.classList.remove('inactive');
    searchSectionContainer.classList.add('inactive');
    detailSectionContainer.classList.add('inactive');

    // Invoco la función que renderiza los TO play Games
    showToPlayGames(TOplay_games);
}

function searchPage() {
    console.log('SEARCH!!!');
    header.style.background = '#0070d1';
    mainSectionContainer.classList.add('inactive');
    arrowButton.classList.remove('inactive');
    homeButton.classList.remove('inactive');
    playedSectionContainer.classList.add('inactive');
    playingSectionContainer.classList.add('inactive');
    toplaySectionContainer.classList.add('inactive');
    searchSectionContainer.classList.remove('inactive');
    detailSectionContainer.classList.add('inactive');
}

function detailPage() {
    console.log('GAME DETAIL!!!');
    header.style.background = '#5E4BB9';
    mainSectionContainer.classList.add('inactive');
    arrowButton.classList.remove('inactive');
    homeButton.classList.remove('inactive');
    playedSectionContainer.classList.add('inactive');
    playingSectionContainer.classList.add('inactive');
    toplaySectionContainer.classList.add('inactive');
    searchSectionContainer.classList.add('inactive');
    detailSectionContainer.classList.remove('inactive');
}

// Variable para guardar el númeor de página actual
let list_page;

// Función para ver siguiente página de la búsqueda
async function nextPage() {
    let query = searchGamesInput.value;

    let next_page = list_page + 1;
    const res = await fetch(`${API_URL_SEARCH}${query}&page=${next_page}&key=${API_KEY}`);
    if(res.status !== 200) {
        console.log("Hubo un error: " + res.status);
        alert("Has llegado a la última página");
        return;
    }
    else {
        const data = await res.json();
        list_page = list_page+1;
        page_number.innerText = `${list_page} / ${Math.ceil(data.count/20)}`;
        console.log(list_page);
    
        searchGamesContainer.innerHTML = '';

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

            searchGamesContainer.appendChild(div);
        });
    }
}


// Función para ver anterior página de la búsqueda
async function previousPage() {
    let query = searchGamesInput.value;

    let previous_page = list_page - 1;
    const res = await fetch(`${API_URL_SEARCH}${query}&page=${previous_page}&key=${API_KEY}`);
    if(res.status !== 200) {
        console.log("Hubo un error: " + res.status);
        alert("Has llegado a la primera página");
        return;
    }
    else {
        const data = await res.json();
        list_page = list_page-1;
        page_number.innerText = `${list_page} / ${Math.ceil(data.count/20)}`;
        console.log(list_page);
    
        searchGamesContainer.innerHTML = '';

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

            searchGamesContainer.appendChild(div);
        });
    }
}