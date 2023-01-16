import { API_KEY, API_URL } from "../env.js";

// Target all variable a need for my work
const searchBtn = document.querySelector("#addon-wrapping");
const searchInput = document.querySelector("#searchInput"),
  artist = document.querySelector("#artist"),
  searchResult = document.querySelector("#searchResult"),
  tractSection = document.querySelector("#tract");

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

// variable to save the tracks
const tracks = [];

// console.log("hier", tractSection.innerHTML == "");

// sage

// let api = API_KEY;
// let host = API_URL;

console.log(API_KEY);
console.log(API_URL);

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": API_URL,
  },
};

async function getAlbums(par) {
  try {
    // data needs to be defined before the do while loop further down in the code. if we don't define it here, the loop does not work

    let data;

    // resets the artist bottom page
    // document.getElementById("artist-albums").innerText = "Albums";
    // document.getElementById("artist-albums-content").innerText = "";

    //tries to fetch artist data until data.data is no longer undefined
    do {
      const response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/search?q=${par}`,
        options
      );
      data = await response.json();
    } while (!data.data);

    // enters artist Name and picture in the artist top page
    // artistName.innerText = artist.toUpperCase();
    // artistTop.style.background = `url(${data.data[0].artist.picture_xl})`;

    // create a card to display the name and the picture of the searching artist

    searchResult.innerHTML = `Search results for "${par}"`;

    artist.innerHTML = `
     <h2>Artist</h2>

     <div class="card  bg-dark " id= 'artistCard' style="width: 12rem; min-height: 15rem">

     <img src="${data.data[0].artist.picture_medium}" id = 'artistPicture' alt="...">
     <div class="card-body">
       <h3 id = "artistName">${par}</h3>
       <p id="cardText">artist</p>
     </div>
   </div>`;

    document.getElementById("artistCard").addEventListener("click", (e) => {
      localStorage.setItem("artistVariable", data.data[0].artist.name);
      window.location.href = "../artist.html";
      console.log(data.data[0].artist.name);
    });

    // loops over tracks of the artist and displays their information in the "albums-content" element

    data.data.map((track) => {
      tracks.push(track);
      document.querySelector("#trackTitle").removeAttribute("hidden");
      const card = document.createElement("div");
      const image = document.createElement("img");
      const title = document.createElement("h6");
      const artistName = document.createElement("p");

      card.style.width = "200px";
      card.style.height = "200px";
      card.style.transition = "300ms";

      image.classList.add("card-img-top");
      image.style.width = "150px";
      image.style.height = "150px";
      title.classList.add("card-title", "text-center", "text-light");
      artistName.classList.add("card-text", "text-center", "text-light");

      image.src = track.album.cover;
      title.innerText = track.title;
      artistName.innerText = track.artist.name;

      card.append(image, title, artistName);
      tractSection.append(card);
      card.addEventListener("mouseover", (e) => {
        e.target.style.opacity = "0.4";
      });
      card.addEventListener("mouseout", (e) => {
        e.target.style.opacity = "1";
      });
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
  } catch (error) {
    console.log("error fetching artist:", error, error.message);
  }
}

searchBtn.addEventListener("click", (e) => {
  tractSection.innerHTML = "";
  getAlbums(searchInput.value);
  searchInput.value = "";
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
  if (e.target.id === "home-page" || e.target.classList.contains("fa-house")) {
    window.location.href = "../home-page/home.html";
  } else if (
    e.target.id === "search-page" ||
    e.target.classList.contains("fa-magnifying-glass")
  ) {
    window.location.href = "#";
  }
  console.log(e.target);
});
