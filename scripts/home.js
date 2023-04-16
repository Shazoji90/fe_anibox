import { bannerCarouselItem, section } from "./components/components.js";
import { ApiUrl, initialSetup } from "./index.js";

initialSetup();

const setBannerCarouselItem = (banner) => {
  const bannerContainer = document.getElementById("banner-container");

  const carouselItems = banner.map((item) =>
    bannerCarouselItem({
      id: item.id,
      title: item.title.romaji,
      description: item.description,
      banner: item.bannerImage,
      year: item.year,
      genre: item.genres[0],
      format: item.format,
    })
  );

  bannerContainer.innerHTML = carouselItems.join("");

  const items = [];
  let index = 0;
  for (const item of bannerContainer.children) {
    items.push({
      position: index++,
      el: item,
    });
  }

  const carousel = new Carousel(items);
  carousel.cycle();

  const prevButton = document.querySelector("[data-carousel-prev]");
  const nextButton = document.querySelector("[data-carousel-next]");

  prevButton.onclick = () => {
    carousel.prev();
  };

  nextButton.onclick = () => {
    carousel.next();
  };
};

const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {}
};

const trending = await fetchData(`${ApiUrl}?sort=trending`);
const banner = trending.slice(0, 5);
const popular = await fetchData(`${ApiUrl}?sort=popularity`);
const newest = await fetchData(`${ApiUrl}?sort=newest`);
const top = await fetchData(`${ApiUrl}?sort=top`);

setBannerCarouselItem(banner);

const listSection = [
  {
    name: "Trending",
    data: trending,
  },
  {
    name: "Popular",
    data: popular,
  },
  {
    name: "Latest",
    data: newest,
  },
  {
    name: "Top",
    data: top,
  },
];

// menampilkan data ke halaman HTML
document.querySelector("main").innerHTML = listSection
  .map((item) => section(item))
  .join("");

// memberi action pada button scroll kiri dan kanan
listSection.forEach((item) => {
  const sectionName = item.name.toLowerCase();

  const prev = document.querySelector(
    "#" + sectionName + " button[data-carousel-prev]"
  );
  prev.onclick = () => {
    document.getElementById(sectionName + "-container").scrollLeft -= 1000;
  };

  const next = document.querySelector(
    "#" + sectionName + " button[data-carousel-next]"
  );
  next.onclick = () => {
    document.getElementById(sectionName + "-container").scrollLeft += 1000;
  };
});
