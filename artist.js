import { API_KEY, API_URL } from "./env.js";

const artistPlay = document.getElementById("artist-play");
const artistTop = document.getElementById("artist-top");
const monthlyListeners = document.getElementById("monthly-listeners");
const artistName = document.getElementById("artist-name");

const artistbottom = document.getElementById("artist-bottom");

async function getAlbums(artist) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API_URL,
    },
  };

  const response = await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=artist:'${artist}'`,
    options
  );
  const data = await response.json();
  console.log(data);
  // von /artist/id kriegen wir mit data.name den Namen
  // artistName.innerText = data.name;
  // artistTop.style.background = `url(${data.picture_xl})`;
}

artistPlay.addEventListener("click", (e) => {
  getAlbums("daftpunk");
});
