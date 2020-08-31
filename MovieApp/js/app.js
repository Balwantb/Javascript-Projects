const API_key = "273d2cf5e4b80f747755b0d5efa31c31";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const url = "https://api.themoviedb.org/3/search/movie?api_key=273d2cf5e4b80f747755b0d5efa31c31";

const inputElement = document.querySelector('#inputValue');
const buttonElement = document.querySelector('#search');
const movieSearchable = document.querySelector('#movies-searchable');

function generateUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=273d2cf5e4b80f747755b0d5efa31c31`;
    return url;
}

function movieSection(movies) {
    return movies.map((movie) => {
        if (movie.poster_path) {
            return `<img 
            src=${IMAGE_URL + movie.poster_path}
            data-movie-id= ${movie.id} />`;
        }
    })
}


function createMovieContainer(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movieTemplate = `
        <section class="section">
            ${movieSection(movies)}
        </section>
        <div class="content">
        <p id="content-close">X</p>
        </div>
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

function renderSeachMovies(data) {
    movieSearchable.innerHTML = "";
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock)
}

function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;
    return iframe;
}

buttonElement.addEventListener('click', function () {
    event.preventDefault();
    const value = inputElement.value;
    const path = '/search/movie';
    const newUrl = generateUrl(path) + '&query=' + value;
    fetch(newUrl)
        .then(res =>
            res.json()
        )
        .then(data => {
            renderSeachMovies(data);
            //console.log('Data', data)
        })
        .catch(error =>
            console.log('Error', error)
        )
    //console.log(value);
    inputElement.value = "";
})

document.onclick = function () {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'img') {
        // console.log('event', event);
        const movieId = target.dataset.movieId;
        console.log('movieId', movieId);
        const section = event.target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');
        const path = `/movie/${movieId}/videos`;
        const url = generateUrl(path);
        console.log(url);
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const videos = data.results;
                const length = videos.length > 4 ? 4 : videos.length;
                const iframeContainer = document.createElement('div');

                for (let i = 0; i < length; i++) {
                    const video = videos[i];
                    const iframe = createIframe(video);
                    iframeContainer.appendChild(iframe);
                    content.appendChild(iframeContainer);
                }
                console.log('videos', data)
            })
            .catch((error) => {
                console.log('error', error);
            })
    }
    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display');
    }
}