import axios from "axios";

const API_KEY = "9deadd48-727f-420f-b571-96e840c97a79";
const URL = "https://api.thecatapi.com/v1/images/search";

const prevBtn = document.querySelector(".prev");
const nextBTn = document.querySelector(".next");
const pageIndicator = document.querySelector(".indicator");
const imageResults = document.querySelector(".images");

let page = 0;

prevBtn.addEventListener("click", () => {
  page--;
  fetchImages();
});

nextBTn.addEventListener("click", () => {
  page++;
  fetchImages();
});

async function fetchImages() {
  pageIndicator.textContent = "LOADING..";

  toggleAbleButtons(true);

  try {
    const resp = await axios.get(URL, {
      headers: { "x-api-key": API_KEY },
      params: {
        limit: 12,
        page: page,
        order: "asc",
      },
    });

    console.log();

    renderImages(resp.data);

    toggleAbleButtons(false);

    page === 0 ? (prevBtn.disabled = true) : (prevBtn.disabled = false);
    pageIndicator.textContent = `Showing page ${page}`;
  } catch (error) {
    pageIndicator.textContent = "Something went wrong 💣💣";
    imageResults.textContent = null;
  }
}

function renderImages(data) {
  imageResults.textContent = null;

  data.forEach((img) => {
    const { url } = img;
    const image = document.createElement("img");
    image.src = url;
    imageResults.append(image);
  });
}

function toggleAbleButtons(boolean) {
  prevBtn.disabled = boolean;
  nextBTn.disabled = boolean;
}

fetchImages();
