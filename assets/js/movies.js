import { Pubsub } from "./pubsub.js";

export class Movies {
  init() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=d6bb809251c0e12adeccd2e3ab2fe857&page=1`;
    Pubsub.subscribe("moviesLoaded", this.renderMovies);
    Pubsub.subscribe("pageChanged", this.getMovies);
    this.getMovies(url);
  }
  async getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    Pubsub.publish("moviesLoaded", data);
    Pubsub.publish("modalData", data);
  }
  renderMovies(data) {
    scroll(0, 0);
    let content = "";
    const insert = document.getElementById("insert");
    insert.innerHTML = "";
    for (let i = 0; i < data.results.length; i++) {
      const url = `https://image.tmdb.org/t/p/original${data.results[i].poster_path}`;
      content += `<div class="col">
            <div
              class="card rounded-2 h-100"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              id= "${i}"
            >
              <img
                src="${url}"
                class=" rounded-2"
                alt="${data.results[i].title}"
              />
              <div class="card-body">
                <h5 class="card-title text-center text-uppercase">
                  ${data.results[i].title}
                </h5>
                <p
                  class="card-text text-center text-secondary"
                  
                >
                  ${data.results[i].vote_average}
                </p>
              </div>
              </div>
            </div>
          </div>`;
    }
    insert.insertAdjacentHTML("beforeend", content);
  }
  renderLoader() {}
}
