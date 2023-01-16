const thumbnail = document.querySelector('#thumbnail');
const song = document.querySelector('#song');
const songArtist = document.querySelector('.song-artist'); // element where track artist appears
const songTitle = document.querySelector('.song-title'); // element where track title appears
const progressBar = document.querySelector('#progress-bar'); // element where progress bar appears
let pPause = document.querySelector('#play-pause'); // element where play and pause image appears




songIndex = 0;
songs = ['../musicSong/beyonce.mp3', '../musicSong/dontstartnow.mp3']; // object storing paths for audio objects
thumbnails = ["../picAsset/song for my father.jpg", " ../picAsset/song for my father.jpg"]; // object storing paths for album covers and backgrounds
songArtists = ['Horace silver', 'Horace silver']; // object storing track artists
songTitles = ["Song For My Father", "Song For My Father"]; // object storing track titles

let playing = true;

function playPause() {
 if (playing) {
  const song = document.querySelector('#song'),
   thumbnail = document.querySelector('#thumbnail');

  pPause.src = "../icons/pause.png";
  thumbnail.style.transform = "scale(1.15)";

  song.play();
  playing = false;
 } else {
  pPause.src = "../icons/play.png"
  thumbnail.style.transform = "scale(1)"

  song.pause();
  playing = true;
 }
}
song.addEventListener('ended', function () {
 nextSong();
});
function nextSong() {
 songIndex++;
 if (songIndex > 1) {
  songIndex = 0;
 };
 song.src = songs[songIndex];
 thumbnail.src = thumbnails[songIndex];
 background.src = thumbnails[songIndex];

 songArtist.innerHTML = songArtists[songIndex];
 songTitle.innerHTML = songTitles[songIndex];

 playing = true;
 playPause();
}
function previousSong() {
 songIndex--;
 if (songIndex < 0) {
  songIndex = 1;
 };
 song.src = songs[songIndex];
 thumbnail.src = thumbnails[songIndex];
 background.src = thumbnails[songIndex];

 songArtist.innerHTML = songArtists[songIndex];
 songTitle.innerHTML = songTitles[songIndex];

 playing = true;
 playPause();
}
function updateProgressValue() {
 progressBar.max = song.duration;
 progressBar.value = song.currentTime;
 document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
 if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
  document.querySelector('.durationTime').innerHTML = "0:00";
 } else {
  document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
 }
};
function formatTime(seconds) {
 let min = Math.floor((seconds / 60));
 let sec = Math.floor(seconds - (min * 60));
 if (sec < 10) {
  sec = `0${sec}`;
 };
 return `${min}:${sec}`;
};
setInterval(updateProgressValue, 500);
function changeProgressBar() {
 song.currentTime = progressBar.value;
};




