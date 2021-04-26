import "../scss/style.scss";

const API = "2TY4syfpZow3IPSErV1LrYJrbdFhGL7W";
const out = document.querySelector(".gifs");
const loadMoreBtn = document.querySelector(".load-more");
const search = document.querySelector(".search");

let counter = 0;

document.addEventListener("DOMContentLoaded", init("trending"));
loadMoreBtn.addEventListener("click", () => {
  if (search.querySelector("input.value") !== "") {
    init(search.querySelector("input.value"));
  } else {
    init("trending");
  }
});
search.addEventListener("submit", (e) => {
  e.preventDefault();
  out.innerHTML = "";
  init(search.querySelector("input").value);
});

function init(keyword) {
  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${API}&limit=20&offset=${counter}&q=${keyword}`
  )
    .then((response) => response.json())
    .then((content) => {
      content.data.forEach((item) => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const figureCaption = document.createElement("figurecaption");
        figure.classList.add("gifs-item");
        image.classList.add("gifs-item__img");
        figureCaption.classList.add("gifs-item__caption");
        image.src = item.images.downsized.url;
        image.alt = item.title;
        figureCaption.textContent = item.title;
        figure.appendChild(image);
        figure.appendChild(figureCaption);
        out.insertAdjacentElement("beforeend", figure);
      });
      counter += 20;
    })
    .catch((error) => {
      console.error(error);
    });
}
