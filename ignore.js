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
      artistTop.style.background = `url(${data.data[0].artist.picture_xl})`;
  
      // loops over tracks of the artist and displays their information in the "albums-content" element
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

  tractSection.innerHTML = `
  <div class="card  bg-dark " id= 'artistCard' style="width: 20rem; height: 20rem; transition = 300ms">

<img src="${track.album.cover}"  class="card-img-top" style="width: 15rem; height: 15rem; alt="...">
<div class="card-body">
<h6 class = "card-title", "text-center", "text-light " >${track.title}</h6>
<p class = "card-text", "text-center", "text-light ">${track.artist.name}</p>
</div>
</div>
`