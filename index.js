const searchBtn = document.querySelector('#addon-wrapping') ;
const searchInput = document.querySelector('#searchInput'),
artist = document.querySelector('#artist'),
searchResult = document.querySelector('#searchResult'),
tractSection = document.querySelector('#tract');

// console.log(searchInput.textContent);
// console.log(searchBtn.textContent);
// console.log(artist.textContent);
// console.log(searchResult.textContent);
// console.log(tractSection.textContent);




const key = "f5334cafbcmshb1e8fe95374091bp145087jsn2964757736a3";
const host = 'deezerdevs-deezer.p.rapidapi.com';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': key,
		'X-RapidAPI-Host': host
	}
};

const fetchingFunction = async () => {
  try {  
    let artistToSearch = (searchInput.value).toLowerCase();
    const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistToSearch}`, options);
    const data = await response.json();
    
    console.log(data.data);
    console.log(data);
    data.data.map(elm => {
      searchResult.innerHTML = `Search results for "${searchInput.value}"`;
  
      artist.innerHTML = `<h2>Artist</h2>
      <div class="card" style="width: 18rem;">
      <img src="${elm.artist.picture_medium}" class="card-img-top" alt="...">
      <div class="card-body">
        <h3 id = "artistName">${(searchInput.value)}</h3>
        <p id="card-text">artist</p>
      </div>
    </div>`
    document.querySelector('#artistName').style.color = 'black';
    document.querySelector('#card-text').style.color = 'black';



    })
    

    if(!response.ok){
      throw new Error(`Error: ${response.status}` )
    }
  }
  catch(error){
    console.log(error.message);
  }


}




searchBtn.addEventListener('click', (e)=>{
  console.log("hier",searchInput.value)

    
     fetchingFunction()
  }) 