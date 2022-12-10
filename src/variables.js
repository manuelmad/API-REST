// VARIABLES DE JUEGOS
const sonic_the_hedgehog = 'sonic-the-hedgehog';
const sonic_the_hedgehog_2 = 'sonic-the-hedgehog-2';
const sonic_and_tails = 'sonic-chaos';
const sonic_cd = 'sonic-cd';
const sonic_the_hedgehog_3 = 'sonic-the-hedgehog-3';
const sonic_and_knuckles = 'sonic-knuckles';
const sonic_3_and_knuckles = 'sonic-3-and-knuckles';
const sonic_and_tails_2 = 'sonic-the-hedgehog-triple-trouble';
const knuckles_chaotix = 'knuckles-chaotix';
const sonic_blast = 'sonic-blast';
const sonic_3d_blast = 'sonic-3d-blast-1996';
const sonic_adventure = 'sonic-adventure';
const sonic_the_hedgehog_pocket_adventure = 'sonic-the-hedgehog-pocket-adventure';
const sonic_adventure_2 = 'sonic-adventure-2';
const sonic_advance = 'sonic-advance';
const sonic_advance_2 = 'sonic-advance-2';
const sonic_advance_3 = 'sonic-advance-3';
const sonic_heroes = 'sonic-heroes';
const shadow_the_hedgehog =  'shadow-the-hedgehog';
const sonic_rush = 'sonic-rush';
const sonic_rivals = 'sonic-rivals';
const sonic_the_hedgehog_2006 =  'sonic-the-hedgehog-4';
const sonic_rivals_2 = 'sonic-rivals-2';
const sonic_rush_adventure = 'sonic-rush-adventure';
const sonic_and_the_secrets_rings = 'sonic-and-the-secret-rings';
const sonic_unleashed = 'sonic-unleashed';
const sonic_and_the_black_knight = 'sonic-and-the-black-knight';
const sonic_colors = 'sonic-colors';
const sonic_the_hedgehog_4_episode_1 = 'sonic-the-hedgehog-4-episode-1';
const sonic_generations = 'sonic-generations';
const sonic_the_hedgehog_4_episode_2 =  'sonic-the-hedgehog-4-episode-ii-2';
const sonic_lost_world = 'sonic-lost-world';
const sonic_mania = 'sonic-mania';
const sonic_forces = 'sonic-forces';
const sonic_frontiers = 'sonic-frontiers'; // No está en la base de datos

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const arrowButton = document.querySelector('.bi-arrow-left');
const homeButton = document.querySelector('.bi-house-door-fill');
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

const played_button = document.getElementById('played_button');
const playing_button = document.getElementById('playing_button');
const toplay_button = document.getElementById('to_play_button');
const search_button = document.getElementById('search_button');
const search_game_button = document.getElementById('search_game_button');
const next_page_button = document.getElementById('next_page_button');
const page_number = document.getElementById('page_number');
const previous_page_button = document.getElementById('previous_page_button');


// ARRAYS DE CATEGORÍAS

let playED_games = [
    sonic_the_hedgehog,
    sonic_the_hedgehog_2,
    sonic_and_tails,
    sonic_cd,
    sonic_the_hedgehog_3,
    sonic_and_knuckles,
    sonic_3_and_knuckles,
    sonic_and_tails_2,
    knuckles_chaotix,
    sonic_blast,
    sonic_3d_blast,
    sonic_adventure,
    sonic_the_hedgehog_pocket_adventure,
    sonic_adventure_2
];

let playING_games = [
    sonic_advance,
    sonic_advance_2,
    sonic_advance_3
];

let TOplay_games = [
    sonic_heroes,
    shadow_the_hedgehog,
    sonic_rush,
    sonic_rivals,
    sonic_the_hedgehog_2006,
    sonic_rivals_2,
    sonic_rush_adventure,
    sonic_and_the_secrets_rings,
    sonic_unleashed,
    sonic_and_the_black_knight,
    sonic_colors,
    sonic_the_hedgehog_4_episode_1,
    sonic_generations,
    sonic_the_hedgehog_4_episode_2,
    sonic_lost_world,
    sonic_mania,
    sonic_forces,
    sonic_frontiers
];