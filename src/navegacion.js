played_button.addEventListener('click', () => {
    location.hash = '#played';
});

arrowButton.addEventListener('click', () => {
    history.back();
    //location.hash = '#home';
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({location});

    if(location.hash.startsWith('#played')) {
        playedPage();
    }
    // else if(location.hash.startsWith('#search=')) {
    //     searchPage();
    // }
    // else if(location.hash.startsWith('#movie=')) {
    //     movieDetailsPage();
    // }
    // else if(location.hash.startsWith('#category=')) {
    //     categoriesPage();
    // }
    else {
        homePage();
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function homePage() {
    main.style.height = '90vh';
    main.style.background = '#f8f6f6';
    header.style.background = '#fe0100';
    // headerSection.classList.remove('header-container--long');
    // headerSection.style.background = '';
    arrowButton.classList.add('inactive');
    // arrowBtn.classList.remove('header-arrow--white');
    // headerTitle.classList.remove('inactive');
    // headerCategoryTitle.classList.add('inactive');
    // searchForm.classList.remove('inactive');

    mainSectionContainer.classList.remove('inactive');
    // categoriesPreviewSection.classList.remove('inactive');
    playedSectionContainer.classList.add('inactive');
    // movieDetailSection.classList.add('inactive');

    // getTrendingMoviesPreview();
    // getCategoriresPreview();
    console.log('Home!!!');
    location.hash = '#home';
}

function playedPage() {
    console.log('PLAYED!!!');
    header.style.background = '#105001';
    main.style.height = 'auto';
    main.style.background = '#c1bfbf';
    mainSectionContainer.classList.add('inactive');
    // headerSection.classList.remove('header-container--long');
    // headerSection.style.background = '';
    arrowButton.classList.remove('inactive');
    // arrowBtn.classList.remove('header-arrow--white');
    // headerTitle.classList.add('inactive');
    playedSectionContainer.classList.remove('inactive');
    // searchForm.classList.add('inactive');

    // trendingPreviewSection.classList.add('inactive');
    // categoriesPreviewSection.classList.add('inactive');
    // genericSection.classList.remove('inactive');
    // movieDetailSection.classList.add('inactive');

    // headerCategoryTitle.innerHTML = 'Tendencias';

    // getTrendingMovies();
}