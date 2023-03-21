import { initialSetup } from "./index.js";

initialSetup();

function trim_words(theString, numWords) {
  const expString = theString.split(/\s+/, numWords);
  const theNewString = expString.join(" ");
  return theNewString;
}

function get_remain_string(theString, numWords) {
  const trimmedString = trim_words(theString, numWords);
  const remainString = theString.slice(trimmedString.length).trim();
  return remainString;
}

const titleEl = document.getElementById("title");
const descriptionEl = document.getElementById("shortText");
const moreTextEl = document.getElementById("moreText");
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
  const fullText = data.description;
  const maxWords = 50;
  const trimmedString = trim_words(fullText, maxWords);
  descriptionEl.innerHTML = trimmedString;
  moreTextEl.innerHTML = get_remain_string(fullText, maxWords);
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
