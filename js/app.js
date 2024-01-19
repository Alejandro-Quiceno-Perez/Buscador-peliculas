const inputSearch = document.querySelector("#search");
const container = document.querySelector(".cards-container");
let timer;

function loadEvenListenerBtn() {
    const btnsShowMore = document.querySelectorAll(".btn-show");
    btnsShowMore.forEach(btn => {
        btn.addEventListener("click", () => {
            const movieId = btn.getAttribute("move-id");
            console.log(movieId);
        });
    });
};

inputSearch.addEventListener("input", (event) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
        getMovies(event.target.value);
    }, 500);
});

async function getMovies(title) {
    const URL = `https://www.omdbapi.com/?apikey=690d22ef&s=${title}`;
    const response = await fetch(URL);
    const data = await response.json();

    printMovies(data.Search);
}

function printMovies(movies) {
    cleanHTML();
    if (!movies) {
        const titleAlert = document.createElement("h2");
        titleAlert.textContent = "No se encontraron peliculas con este nombre";
        titleAlert.classList.add("alert");
        container.appendChild(titleAlert);
        return;
    }
    movies.forEach(movie => {
        console.log(movie);
        container.innerHTML += `
        <div class="card">
        <div class="img">
        <img
        src="${movie.Poster}"
        alt="Poster"
        />
        </div>

            <h2 class="title-card">${movie.Title}</h2>
            <p>Año:<span>${movie.Year}</span></p>
            <p>Tipo:<span>${movie.Type}</span></p>
            <button type="button" class="btn-show" movie-id="${movie.imdbID}">Ver más</button>
        </div>
        `;
    });
    loadEvenListenerBtn();
}

function cleanHTML() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}