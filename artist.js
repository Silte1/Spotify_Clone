import { API_KEY, API_URL } from "./env.js";

//::::::::::::::::: Variables

// Links in the left-side nav
const sideNav = document.getElementById("sideNav");

// Artist page
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

// use the artist variable to change the artists page
const artist = "beyonce";

//::::::::::::::::: Functions

/** creates a message that artist has been added to "follow" list. STILL NEEDS TO ADD ARTIST TO SAID LIST */
function followArtist() {
  artistAddMessage.style.display = "block";
  setTimeout(() => {
    artistAddMessage.style.display = "none";
  }, 2000);
}

/**function fills the artist page dynamically with content */
async function getAlbums(artist) {
  try {
    // data needs to be defined before the do while loop further down in the code. if we don't define it here, the loop does not work

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

    // enters artist Name and picture in the artist top page
    artistName.innerText = artist.toUpperCase();
    artistTop.style.background = `url(${data.data[0].artist.picture_xl}) center / cover no-repeat`;

    // loops over tracks of the artist and displays their information in the "albums-content" element
    data.data.map((track) => {
      tracks.push(track);
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

      // Eventlistener to play a song in player
      card.addEventListener("click", (e) => {
        song.src = track.preview;
        song.play();
        pPause.classList.remove("bi-play-fill");
        pPause.classList.add("bi-pause-fill");
        playing = false;
        console.log(track);
        playerSong.childNodes[0].data = "\n" + track.title;
        playerArtist.innerHTML = track.artist.name;
        playerArtistImage.src = track.album.cover;
      });
    });
    // Eventlistener on forward and previous song
    playerNext.addEventListener("click", (e) => {
      prevnextTitles(+1);
    });
    playerPrevious.addEventListener("click", (e) => {
      prevnextTitles(-1);
    });
    // Eventlistener on "play" : plays the preview of one of the first 25 songs
    artistPlay.addEventListener("click", (e) => {
      let random = Math.floor(Math.random() * 25);
      const a = new Audio(data.data[random].preview);
      a.play();
    });

    // Eventlistener on "follow", adds artist to follow list
    artistFollow.addEventListener("click", (e) => {
      followArtist();
    });
  } catch (error) {
    console.log("error fetching artist:", error, error.message);
  }
}

//::::::::::::::: Events

// Eventlistener "about": loads about artist page
artistAbout.addEventListener("click", (e) => {
  document.getElementById("artist-albums").innerText = "About";
  document.getElementById("artist-albums-content").innerText =
    "There is really not much to say about them.";
});

// Eventlistener "related artists": loads related artists page

artistRelatedArtists.addEventListener("click", (e) => {
  document.getElementById("artist-albums").innerText = "Related Artists";
  document.getElementById("artist-albums-content").innerText =
    "Nobody makes music the way they do!";
});

// Eventlistener "overview": loads album page
artistOverview.addEventListener("click", (e) => {
  getAlbums(artist);
});

// :::::::::::::: H O M E P A G E Functions

//::::::::::::  Variables
// swiper for home page
const swiperWrapper = document.getElementsByClassName("swiper-wrapper")[0];

// Album Ids for Home page
const throwbackAlbumIds = [
  340077257, 352669977, 384131297, 6019334, 362299477, 230638702, 95185612,
  150710522, 15559256, 221439032, 108934,
];
const topFortyId = [9574940];

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
  } catch (error) {
    console.log("error when fetching album", error, error.message);
  }
});

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
});

//fills the page with content
getAlbums(artist);
