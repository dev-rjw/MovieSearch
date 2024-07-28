const API_KEY = "20f0ecb59c6cafabe067c9e78cc2a42a";
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

function setMovieList(data) {
    data.results.forEach((element) => {
        let posterPath = "https://image.tmdb.org/t/p/w500" + element["poster_path"];
        let title = element["original_title"];
        let overview = element["overview"];
        let id = element["id"];
        let rating = element["vote_average"];

        const temp = document.createElement("div");
        temp.className = "col";
        temp.innerHTML = `
        <div class="card" onclick="getId(${id})">
            <img src="${posterPath}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title"><b>${title}</b></h5>
                <p class="card-text">${overview}</p>
                <p class="rating">Rating: ${rating}</p>
            </div>
        </div>
        `;

        document.querySelector("#cards").append(temp);
    });
}

function getId(id) {
    alert("영화 id: " + id);
}

function getSearchMovie() {}

window.onload = function () {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            setMovieList(data);
        })
        .catch((error) => console.error("Error:", error));
};
