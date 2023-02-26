// VARIABLES DE LA API
const API_KEY = '8d35f3d37cff4c7c816bce53458b3cb4';

const API_URL = 'https://api.rawg.io/api';

const API_URL_USER = 'https://api.rawg.io/api/users/manuelmad';

const API_URL_GAMES = 'https://api.rawg.io/api/games';

const API_URL_SEARCH = 'https://api.rawg.io/api/games?search=';

// VARIABLES DE LISTAS DE JUEGOS
let allGamesObjects;
let playED_games;
let playING_games;
let TOplay_games;

// VARIABLES DE CONTENEDORES
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const mainSectionContainer = document.querySelector('.main-section-container');
const playedSectionContainer = document.querySelector('.played-section-container');
const playedGamesContainer = document.querySelector('.played-games-container');
const playingSectionContainer = document.querySelector('.playing-section-container');
const playingGamesContainer = document.querySelector('.playing-games-container');
const toplaySectionContainer = document.querySelector('.toplay-section-container');
const toplayGamesContainer = document.querySelector('.toplay-games-container');
const searchSectionContainer = document.querySelector('.search-section-container');
const trendingTitle = document.querySelector('.trending-title');
const searchGamesContainer = document.querySelector('.search-games-container');
const searchGamesInput = document.querySelector('.search-games');
const detailSectionContainer = document.querySelector('.detail-section-container');
const detailGamesContainer = document.querySelector('.detail-games-container');

// VARIABLES DE BOTONES
const arrowButton = document.querySelector('.bi-arrow-left');
const homeButton = document.querySelector('.bi-house-door-fill');
const played_button = document.getElementById('played_button');
const playing_button = document.getElementById('playing_button');
const toplay_button = document.getElementById('to_play_button');
const search_button = document.getElementById('search_button');
const search_game_button = document.getElementById('search_game_button');
const next_page_button = document.getElementById('next_page_button');
const page_number = document.getElementById('page_number');
const previous_page_button = document.getElementById('previous_page_button');