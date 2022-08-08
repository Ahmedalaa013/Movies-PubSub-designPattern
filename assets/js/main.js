import { Movies } from "./movies.js";
import { Stats } from "./stats.js";
import { Pagination } from "./pagination.js";
import { Modal } from "./modal.js";

const movie = new Movies();
const stat = new Stats();
const page = new Pagination();
const newModal = new Modal();
movie.init();
stat.init();
page.init();
newModal.init();
