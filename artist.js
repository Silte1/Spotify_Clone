import { API_KEY, API_URL } from "./env.js";

const artistPlay = document.getElementById("artist-play");
const artistTop = document.getElementById("artist-top");
const monthlyListeners = document.getElementById("monthly-listeners");
const artistName = document.getElementById("artist-name");

const artistBottom = document.getElementById("artist-bottom");
const artistAlbumsContent = document.getElementById("artist-albums-content");

async function getAlbums(artist) {
  console.log(artist);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API_URL,
    },
  };

  const response = await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`,
    options
  );

  const data = await response.json();
  console.log(data);
  // von /artist/id kriegen wir mit data.name den Namen
  artistName.innerText = data.data[0].artist.name;
  artistTop.style.background = `url(${data.data[0].artist.picture_xl})`;

  data.data.map((track) => {
    const card = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("h5");
    const artistName = document.createElement("p");

    card.classList.add("card");
    image.classList.add("card-img-top");
    title.classList.add("card-title", "text-center", "text-light");
    artistName.classList.add("card-text", "text-center", "text-light");

    image.src = track.album.cover;
    title.innerText = track.title;
    artistName.innerText = track.artist.name;

    card.append(image, title, artistName);
    artistAlbumsContent.append(card);
  });
}

artistPlay.addEventListener("click", (e) => {
  getAlbums("daftpunk");
});
