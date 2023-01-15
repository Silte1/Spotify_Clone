import { API_KEY, API_URL } from "./env.js";


// Target all variable a need for my work
const searchBtn = document.querySelector('#addon-wrapping') ;
const searchInput = document.querySelector('#searchInput'),
artist = document.querySelector('#artist'),
searchResult = document.querySelector('#searchResult'),
tractSection = document.querySelector('#tract');

// sage 

// let api = API_KEY;
// let host = API_URL;

console.log(API_KEY);
console.log(API_URL);


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key':API_KEY,
		'X-RapidAPI-Host': API_URL
	}
};

// const fetchingFunction = async () => {
  try {  
    let artistToSearch = (searchInput.value).toLowerCase();
    const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistToSearch}`, options);
    const data = await response.json();
    
    // console.log(data.data);


  
    

    if(!response.ok){
      throw new Error(`Error: ${response.status}` )
    }
  }
  catch(error){
    console.log(error.message);
  }


// }

async function getAlbums() {
  try {
    // data needs to be defined before the do while loop further down in the code. if we don't define it here, the loop does not work

    let data;

    // resets the artist bottom page
    // document.getElementById("artist-albums").innerText = "Albums";
    // document.getElementById("artist-albums-content").innerText = "";

    //tries to fetch artist data until data.data is no longer undefined
    do {
      const response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchInput.value}`,
        options
      );
      data = await response.json();
    } while (!data.data);

    // enters artist Name and picture in the artist top page
    // artistName.innerText = artist.toUpperCase();
    // artistTop.style.background = `url(${data.data[0].artist.picture_xl})`;

    // create a card to display the name and the picture of the searching artist
     console.log(data.data[0].artist.picture_medium);
   
     searchResult.innerHTML = `Search results for "${searchInput.value}"`;

     artist.innerHTML = `
     <h2>Artist</h2>
     <div class="card  bg-dark" id= 'artistCard' style="width: 12rem;">
     <img src="${data.data[0].artist.picture_medium}" id = 'artistPicture' alt="...">
     <div class="card-body">
       <h3 id = "artistName">${(searchInput.value)}</h3>
       <p id="cardText">artist</p>
     </div>
   </div>`
  //  document.querySelector('#artistName').style.color = 'black';
  //  document.querySelector('#cardText').style.color = 'black';
  //  document.querySelector('#artistCard').style.width = '120px';
   document.querySelector('#artistCard').style.min_height = '150px';
   document.querySelector('#artistCard').style.margin_bottom = '300px';


    // loops over tracks of the artist and displays their information in the "albums-content" element
    const cardTitle = document.createElement("h2");
    cardTitle.innerText = 'Tracks'
    tractSection.before(cardTitle)

    data.data.map((track) => {
      // console.log(track);
      const card = document.createElement("div");
      const image = document.createElement("img");
      const title = document.createElement("h6");
      const artistName = document.createElement("p");

      // card.classList.add("card");
      card.style.width = '200px';
      card.style.height = '200px';
      card.style.transition = '300ms';

      // card.classList.add("card");
      image.classList.add("card-img-top");
      image.style.width = '150px';
      image.style.height = '150px';
      title.classList.add("card-title", "text-center", "text-light");
      title.style.color = 'black';
      artistName.classList.add("card-text", "text-center", "text-light");
      artistName.style.color = 'black';

      image.src = track.album.cover;
      title.innerText = track.title;
      artistName.innerText = track.artist.name;

      card.append( image, title, artistName);
      tractSection.append(card);
      card.addEventListener('mouseover', (e)=>{
        e.target.style.opacity = '0.4';
      })
      card.addEventListener('mouseout', (e)=>{
        e.target.style.opacity = '1';
      })
    });

    // Eventlistener on "play" : plays the preview of one of the first 25 songs
    // artistPlay.addEventListener("click", (e) => {
    //   let random = Math.floor(Math.random() * 25);
    //   const a = new Audio(data.data[random].preview);
    //   a.play();
    // });

    // // Eventlistener on "follow", adds artist to follow list
    // artistFollow.addEventListener("click", (e) => {
    //   followArtist();
    // });
  } catch (error) {
    console.log("error fetching artist:", error, error.message);
  }
}


searchBtn.addEventListener('click', (e)=>{
      // fetchingFunction()
     getAlbums(searchInput.value)
  }) 