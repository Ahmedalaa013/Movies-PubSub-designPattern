import { Pubsub } from "./pubsub.js";

export class Pagination {
  counter = 1;
  url = "";
  init() {
    $("#switch").click(
      function (e) {
        if (e.target.id === "next") {
          this.next();
        } else if (e.target.id === "prev" && this.counter > 1) {
          this.previous();
        }
      }.bind(this)
    );
  }
  next() {
    this.counter++;
    this.url = `https://api.themoviedb.org/3/movie/popular?api_key=d6bb809251c0e12adeccd2e3ab2fe857&page=${this.counter}`;
    Pubsub.publish("pageChanged", this.url);
  }
  previous() {
    this.counter--;
    this.url = `https://api.themoviedb.org/3/movie/popular?api_key=d6bb809251c0e12adeccd2e3ab2fe857&page=${this.counter}`;
    Pubsub.publish("pageChanged", this.url);
  }
}
