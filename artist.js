import { API_KEY, API_URL } from "./env.js";

const artistPlay = document.getElementById("artist-play");
const artistTop = document.getElementById("artist-top");
const artistFollow = document.getElementById("artist-follow");
const artistName = document.getElementById("artist-name");
const artistAddMessage = document.getElementById("artistAddMessage");
const artistOverview = document.getElementById("artist-overview");
const artistRelatedArtists = document.getElementById("artist-related-artists");
const artistAbout = document.getElementById("artist-about");

const artistBottom = document.getElementById("artist-bottom");
const artistAlbumsContent = document.getElementById("artist-albums-content");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": API_URL,
  },
};
// use the artist variable to change the artists page
const artist = "ksbloom";

// creates a message that artist has been added to list. STILL NEEDS TO ADD ARTIST TO SAID LIST
function followArtist() {
  artistAddMessage.style.display = "block";
  setTimeout(() => {
    artistAddMessage.style.display = "none";
  }, 2000);
}

/**function fills the artist page dynamically with content */
async function getAlbums(artist) {
  try {
    let data;
    // resets the artist bottom page
    document.getElementById("artist-albums").innerText = "Albums";
    document.getElementById("artist-albums-content").innerText = "";

    //tries to fetch artist data until data.data is no longer undefined
    do {
      const response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`,
        options
      );
      data = await response.json();
    } while (!data.data);

    // von /artist/id kriegen wir mit data.name den Namen
    artistName.innerText = artist.toUpperCase(); //data.data[0].artist.name;
    artistTop.style.background = `url(${data.data[0].artist.picture_xl})`;

    data.data.map((track) => {
      const card = document.createElement("div");
      const image = document.createElement("img");
      const title = document.createElement("h6");
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

    // plays the preview of one of the first 25 songs when clicking on "PLAY"
    artistPlay.addEventListener("click", (e) => {
      let random = Math.floor(Math.random() * 25);
      const a = new Audio(data.data[random].preview);
      a.play();
    });
    // Eventlistener on "follow"
    artistFollow.addEventListener("click", (e) => {
      console.log("added Artist to your playlist");
      followArtist();
    });
  } catch (error) {
    console.log("error fetching artist:", error, error.message);
  }
}

artistAbout.addEventListener("click", (e) => {
  document.getElementById("artist-albums").innerText = "About";
  document.getElementById("artist-albums-content").innerText =
    "There is really not much to say about them.";
});

artistRelatedArtists.addEventListener("click", (e) => {
  document.getElementById("artist-albums").innerText = "Related Artists";
  document.getElementById("artist-albums-content").innerText =
    "Nobody makes music the way they do!";
});

artistOverview.addEventListener("click", (e) => {
  getAlbums(artist);
});
//fills the page with content
getAlbums(artist);

// Album Ids for Home page
const throwbackAlbumIds = [
  340077257, 352669977, 384131297, 6019334, 362299477, 230638702, 95185612,
  150710522, 15559256, 221439032, 108934,
];
const topFourtyId = [9574940];

// fill swiper with albums
const swiperWrapper = document.getElementsByClassName("swiper-wrapper")[0];

async function fillSwiper(param) {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_URL,
      },
    };

    const response = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/album/${param}`,
      options
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error when fetching artist", error, error.message);
  }
}

throwbackAlbumIds.forEach(async (element) => {
  try {
    let data;
    let n = 0;
    do {
      n++;
      data = await fillSwiper(element);
      console.log(n);
    } while (!data.title);
    const card = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("p");
    card.classList.add("swiper-slide");
    image.src = `${data.cover_medium}`;
    title.innerText = data.title.toUpperCase();

    card.append(image, title);
    swiperWrapper.append(card);
  } catch (error) {
    console.log("error when fetching album", error, error.message);
  }
});

////////////////////swiper js begins

const swiper = new Swiper(".swiper", {
  // Optional parameters
  slidesPerView: 7,
  spaceBetween: 10,
  speed: 400,
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
