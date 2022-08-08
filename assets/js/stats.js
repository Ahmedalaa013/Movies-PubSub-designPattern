import { Pubsub } from "./pubsub.js";
export class Stats {
  init() {
    Pubsub.subscribe("moviesLoaded", this.updateStats);
    Pubsub.subscribe("statsDataReady", this.renderStats);
  }

  updateStats(data) {
    let arr = [];
    data.results.forEach((element) => {
      arr.push(element.vote_average);
    });
    let currentPage = data.page;
    let numberOfMovies = data.results.length;

    let highestRatingIndex = arr.indexOf(Math.max(...arr));
    let topRatedMovie = data.results[highestRatingIndex].title;
    let highestRating = Math.max(...arr);

    let renderData = {
      currentPage,
      numberOfMovies,
      topRatedMovie,
      highestRating,
    };
    Pubsub.publish("statsDataReady", renderData);
  }
  renderStats(data) {
    $("#current").text(`Current page : ${data.currentPage}`);
    $("#number").text(`Number of Movies : ${data.numberOfMovies}`);
    $("#top-rated").text(`Top rated movie : ${data.topRatedMovie}`);
    $("#rating").text(`Rating : ${data.highestRating}`);
  }
}
