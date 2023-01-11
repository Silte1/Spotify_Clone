

let apiModel = "https://api.deezer.com/version/service/id/method/?parameters"

// Pagination parameters with index and limit

let example = "https://api.deezer.com/playlist/4341978/tracks?index=0&limit=10"

const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://spotify23.p.rapidapi.com/search/',
  params: {
    q: '<REQUIRED>',
    type: 'multi',
    offset: '0',
    limit: '10',
    numberOfTopResults: '5'
  },
  headers: {
    'X-RapidAPI-Key': 'f5334cafbcmshb1e8fe95374091bp145087jsn2964757736a3',
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
  console.log(options);

  const myFunction = async () =>{
    const response = await fetch("https://spotify23.p.rapidapi.com/search/")
    const data = await response.json()
    console.log(data);
  }

  myFunction()