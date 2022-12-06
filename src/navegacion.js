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
    else {
        homePage();
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function homePage() {
    // main.style.height = '90vh';
    header.style.background = '#fe0100';
    arrowButton.classList.add('inactive');
    mainSectionContainer.classList.remove('inactive');
    playedSectionContainer.classList.add('inactive');
    playingSectionContainer.classList.add('inactive');
    toplaySectionContainer.classList.add('inactive');
    searchSectionContainer.classList.add('inactive');
    homeButton.classList.add('inactive');

    console.log('Home!!!');
    location.hash = '#home';
}

function playedPage() {
    console.log('PLAYED!!!');
    header.style.background = '#105001';
    // main.style.height = 'auto';
    mainSectionContainer.classList.add('inactive');
    arrowButton.classList.remove('inactive');
    homeButton.classList.remove('inactive');
    playedSectionContainer.classList.remove('inactive');
    playingSectionContainer.classList.add('inactive');
    toplaySectionContainer.classList.add('inactive');
    searchSectionContainer.classList.add('inactive');

    // Invoco la función que renderiza los playED Games
    showPlayedGames(playED_games);
}

function playingPage() {
    console.log('PLAYING!!!');
    header.style.background = '#120c5a';
    // main.style.height = 'auto';
    mainSectionContainer.classList.add('inactive');
    arrowButton.classList.remove('inactive');
    homeButton.classList.remove('inactive');
    playedSectionContainer.classList.add('inactive');
    playingSectionContainer.classList.remove('inactive');
    toplaySectionContainer.classList.add('inactive');
    searchSectionContainer.classList.add('inactive');

    // Invoco la función que renderiza los playING Games
    showPlayingGames(playING_games);
}

function toplayPage() {
    console.log('TO PLAY!!!');
    header.style.background = '#630001';
    // main.style.height = 'auto';
    mainSectionContainer.classList.add('inactive');
    arrowButton.classList.remove('inactive');
    homeButton.classList.remove('inactive');
    playedSectionContainer.classList.add('inactive');
    playingSectionContainer.classList.add('inactive');
    toplaySectionContainer.classList.remove('inactive');
    searchSectionContainer.classList.add('inactive');

    // Invoco la función que renderiza los TO play Games
    showToPlayGames(TOplay_games);
}

function searchPage() {
    console.log('SEARCH!!!');
    header.style.background = '#0070d1';
    // main.style.height = 'auto';
    mainSectionContainer.classList.add('inactive');
    arrowButton.classList.remove('inactive');
    homeButton.classList.remove('inactive');
    playedSectionContainer.classList.add('inactive');
    playingSectionContainer.classList.add('inactive');
    toplaySectionContainer.classList.add('inactive');
    searchSectionContainer.classList.remove('inactive');

    // let query = location.hash.split('=');
    // Invoco la función que renderiza los Games buscados
}