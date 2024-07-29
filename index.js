const API_KEY = "20f0ecb59c6cafabe067c9e78cc2a42a";

// 영화 리스트 뿌려주기
function setMovieList(URL) {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            document.querySelector("#cards").innerHTML = "";

            data.results
                .filter((element) => {
                    return element["poster_path"] !== null; // 안 나오는 이미지는 아예 뜨지 않도록 수정
                })
                .forEach((element) => {
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
        })
        .catch((error) => console.error("Error:", error));
}

// 영화 클릭 시 아이디값 alert
function getId(id) {
    alert("영화 id: " + id);
}

// 영화 검색
function getSearchMovie() {
    const input = document.getElementById("input").value;

    let URL = "";
    if (input === "") {
        URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
        URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${input}&language=en-US&page=1`;
    }
    setMovieList(URL);
}

window.onload = function () {
    // 웹사이트 랜딩 또는 새로고침 후 검색 입력란에 커서 자동 위치시키기
    document.getElementById("input").focus();

    // 영화 목록
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    setMovieList(URL);

    // 영화 검색 Enter
    const input = document.getElementById("input");
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("button").click();
        }
    });
};
