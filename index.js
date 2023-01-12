const searchBtn = document.querySelector('#addon-wrapping') ;
const searchInput = document.querySelector('#searchInput').value,
artistSection = document.querySelector('artist'),
searchResult = document.querySelector('searchResult'),
tractSection = document.querySelector('tract');



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
    const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search`, options);
    const data = await response.json()
    console.log(data);
    if(!response.ok){
      throw new Error(`Error: ${response.status}` )
    }
  }
  catch(error){
    console.log(error.message);
  }


}




searchBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    fetchingFunction()
  }) 