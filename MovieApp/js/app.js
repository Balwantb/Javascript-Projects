const API_key = "273d2cf5e4b80f747755b0d5efa31c31";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const url = "https://api.themoviedb.org/3/search/movie?api_key=273d2cf5e4b80f747755b0d5efa31c31";


const inputElement = document.querySelector('#inputValue');
const buttonElement = document.querySelector('#search');
const movieSearchable = document.querySelector('#movies-searchable');

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
        <p id="content-close>X</p>
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

buttonElement.addEventListener('click', function () {
    event.preventDefault();
    const value = inputElement.value;
    const newUrl = url + '&query=' + value;
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