import { API_KEY, API_URL } from "../env.js";
//:::::::::.. Variables

// swiper for home page
const swiperWrapper = document.getElementsByClassName("swiper-wrapper")[0];

// Album Ids for Home page
const throwbackAlbumIds = [
  340077257, 352669977, 384131297, 6019334, 362299477, 230638702, 95185612,
  150710522, 15559256, 221439032, 108934,
];

// Links in the left-side nav
const sideNav = document.getElementById("sideNav");
// Audio player variables
const progressBar = document.getElementById("seek");
const song = document.getElementById("song");
const playerSong = document.getElementById("player-song-name");
const playerArtist = document.getElementById("player-artist-name");
const pPause = document.getElementById("pPause");
const playerPrevious = document.getElementById("playerPrevious");
const playerNext = document.getElementById("playerNext");
const playerArtistImage = document.getElementById("player-artist-image");
let playing = true;
//for fetching
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": API_URL,
  },
};
// variable to save the tracks
const tracks = [];

// :::::::::::::: H O M E P A G E Functions
//:::::::::::::::: S W I P E R for home page (swiperjs)

const swiper = new Swiper(".swiper", {
  // Optional parameters
  slidesPerView: 5,
  spaceBetween: 10,
  speed: 400,
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/** Function to fetch informations on an album */
async function fillSwiper(param) {
  try {
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

// this loop fills the "throwback" Element on homepage with albums
throwbackAlbumIds.forEach(async (element) => {
  try {
    // data needs to be defined before the do while loop or else the loop does not work
    let data;

    // repeats fetching, until data.title is NOT undefined
    do {
      data = await fillSwiper(element);
    } while (!data.title);

    //creates the HTML Elements for the album
    const card = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("p");
    card.classList.add("swiper-slide");

    // fills the HTML elements with content for the album
    image.src = `${data.cover_medium}`;
    title.innerText = data.title.toUpperCase();

    card.append(image, title);
    swiperWrapper.append(card);

    card.addEventListener("click", (e) => {
      localStorage.setItem("artistVariable", data.artist.name);
      window.location.href = "../artist.html";
    });
  } catch (error) {
    console.log("error when fetching album", error, error.message);
  }
});

//::::::::::::::::  AUDIO PLAYER
setInterval(updateProgressValue, 500);

function updateProgressValue() {
  progressBar.max = song.duration;
  progressBar.value = song.currentTime;
  document.querySelector("#currentStart").innerHTML = formatTime(
    Math.floor(song.currentTime)
  );
  if (document.querySelector("#currentEnd").innerHTML === "NaN:NaN") {
    document.querySelector("#currentEnd").innerHTML = "0:00";
  } else {
    document.querySelector("#currentEnd").innerHTML = formatTime(
      Math.floor(song.duration)
    );
  }
}

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}

pPause.addEventListener("click", playPause);

function playPause() {
  console.log("play clicked");
  if (playing) {
    pPause.classList.remove("bi-play-fill");
    pPause.classList.add("bi-pause-fill");
    song.play();
    playing = false;
  } else {
    pPause.classList.remove("bi-pause-fill");
    pPause.classList.add("bi-play-fill");
    song.pause();
    playing = true;
  }
}
/** function that puts in the next or previous track */
function prevnextTitles(param) {
  let title = tracks.filter((track) => track.preview === song.src)[0];
  let trackIndex = tracks.indexOf(title) + param;
  let track = tracks[trackIndex];
  console.log("nexttrack", track);
  song.src = tracks[trackIndex].preview;
  song.play();
  pPause.classList.remove("bi-play-fill");
  pPause.classList.add("bi-pause-fill");
  playing = false;
  console.log(track);
  playerSong.childNodes[0].data = "\n" + track.title;
  playerArtist.innerHTML = track.artist.name;
  playerArtistImage.src = track.album.cover;
}

// like button
$(".love").click(function () {
  $(".heart").toggleClass("love");
  $(".line, .heart")
    .addClass("active")
    .delay(100)
    .queue(function (next) {
      $(".line, .heart").removeClass("active");
      next();
    });
});

// :::::::::::::: Nav Functions

sideNav.addEventListener("click", (e) => {
  console.log(e.target);
  window.location.href = "home-page/home.html";
});
