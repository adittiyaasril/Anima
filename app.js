const base_url = "https://api.jikan.moe/v3";


function searchAnime(event) {
    event.preventDefault();
    const form = new FormData(this);
    const query = form.get("search");

    console.log(query);

    fetch(`${base_url}/search/anime?q=${query}&page=1`)
        .then((res) => res.json())
        .then(updateDom)
        .catch((err) => {
            console.log(err);
        })
}

function updateDom(data) {

    const searchResults = document.getElementById('search-results');


    const animeByCategory = data.results
        .reduce((acc, anime) => {
            const { type } = anime;
            if (acc[type] === undefined) acc[type] = [];
            acc[type].push(anime);
            return acc;
        }, {});
    searchResults.innerHTML = Object.keys(animeByCategory).map(key => {
        const animesHTML = animeByCategory[key]
            .sort((a, b) => a.episodes - b.episodes)
            .map(anime => {

                return `   
                
                    <div class="card" >
                        <div class="card-image">
                            <img src="${anime.image_url}">
                        </div>
                        <div class="card-content">
                            <span class="card-title">${anime.title}</span>
                                <p>${anime.synopsis}</p>
                        </div>
                        <div class="card-action">
                            <a href="${anime.url}">More</a>
                        </div>
                    </div>
                    `
                            }).join("");
                        return `
                        <section> 
                        <h1>${key.toUpperCase()}</h1>
                        <div class="row">${animesHTML}</div>
                        </section>
       `

    }).join("");


}

function pageLoaded() {
    const form = document.getElementById('search_form')
    form.addEventListener("submit", searchAnime);
}

window.addEventListener("load", pageLoaded);