const url = 'https://icanhazdadjoke.com/';

function getJoke(url){
	return fetch(url, {
		headers: {
			'accept': 'application/JSON'
		}
	})
	.then(function (response) {
		if (!response.ok) {
			throw Error(response.statusText);
		} else {
			return response.json();
		}
	})
	//.then(text => console.log(text))
	.catch(function (error) {
		console.log(error);
	});
}
// Display Joke ?? Needs work
function renderJoke(data){
	console.log(data.joke);
	console.log(data.id)
	const jokeText = document.getElementById('joke-text');
	const jokeID = document.getElementById('joke-id');
	jokeText.innerHTML = data.joke;
	jokeID.innerHTML = data.id;
}

function showJokes(url = 'https://icanhazdadjoke.com/'){
	getJoke(url).then(function (data) {
		console.log(data);
		//const results = data.results;

		// render joke
		renderJoke(data);

	});
}

function searchJokes(searchUrl){
	getJoke(searchUrl).then(function (data) {
		console.log(data);
		renderJoke(data);
	})
}

const randomBtn = document.getElementById("random");
randomBtn.addEventListener("click", function (event){
	event.preventDefault();
	showJokes();
});

const btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", function (event){
	event.preventDefault();
	const jokeTerm = document.getElementById("jokeTerm").value;
	console.log(jokeTerm);
	let searchUrl = 'https://icanhazdadjoke.com/search/?term=' + jokeTerm;
	searchJokes(searchUrl);
})

showJokes();