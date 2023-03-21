import { initialSetup } from "./index.js";

initialSetup();

const titleEl = document.getElementById("title");
const descriptionEl = document.getElementById("description");
const bannerImageEl = document.getElementById("banner-image");
const coverImageEl = document.getElementById("cover-image");
const infoEl = document.getElementById("info");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const getDetail = async (id) => {
  try {
    const res = await fetch("https://animeapi-askiahnur1.b4a.run/anime/" + id);
    const detail = await res.json();

    return detail;
  } catch (error) {}
};

const render = async () => {
  const data = await getDetail(id);

  titleEl.innerHTML = data.title.romaji;
  descriptionEl.innerHTML = data.description.substr(0, 256) + "...";
  bannerImageEl.setAttribute("src", data.bannerImage);
  coverImageEl.setAttribute("src", data.coverImage);

  const info = [
    data.year,
    data.format,
    data.episodes ? +`${data.episodes} Episodes` : "",
    data.genres[0],
  ];

  let result = "";
  info.forEach((item) => {
    if (item) {
      result += `<span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">${item}</span>`;
    }
  });

  infoEl.innerHTML = result;
};

render();
