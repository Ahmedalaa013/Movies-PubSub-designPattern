import { Pubsub } from "./pubsub.js";

export class Modal {
  init() {
    Pubsub.subscribe("modalData", this.modalHandler);
    Pubsub.subscribe("renderModal", this.renderModal);
  }
  modalHandler(data) {
    $(".card").click(function () {
      var getImgSrc = $(this).children(":first").attr("src");
      var getCardId = $(this).attr("id");
      var getDescription = data.results[getCardId].overview;
      var getVoteCount = data.results[getCardId].vote_count;
      var getVoteAvg = data.results[getCardId].vote_average;
      var rating = `IMDB Rating : ${getVoteAvg}/10 (${getVoteCount} votes)`;
      var getTitleText = $(this)
        .children(":nth-child(2)")
        .children(":first")
        .text()
        .trim();

      let modalData = { getImgSrc, getTitleText, getDescription, rating };
      Pubsub.publish("renderModal", modalData);
    });
  }
  renderModal(data) {
    $(".modal-body").children(":first").attr("src", data.getImgSrc);
    $(".modal-body")
      .children(":nth-child(2)")
      .children(":first")
      .text(data.getTitleText);
    $(".modal-body")
      .children(":nth-child(2)")
      .children(":nth-child(2)")
      .text(data.rating);
    $(".modal-body")
      .children(":nth-child(2)")
      .children(":nth-child(3)")
      .text(data.getDescription);
  }
}
