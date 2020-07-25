//const url = 'https://icanhazdadjoke.com/';

function getJoke(url) {
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
		.catch(function (error) {
			console.log(error);
		});
}
// Display Joke
// function renderJoke(data) {
// 	console.log(data.joke);
// 	console.log(data.id)
// 	const jokeText = document.getElementById('joke-text');
// 	const jokeID = document.getElementById('joke-id');
// 	jokeText.innerHTML = data.joke;
// 	jokeID.innerHTML = data.id;
// }

function showRandomJoke() {
	let url = 'https://icanhazdadjoke.com/'
	getJoke(url).then(function (data) {
		console.log(data);
		// render joke
		//renderJoke(data);
		document.getElementById('joke-text').innerHTML = data.joke;
		document.getElementById('joke-text').className = "";
		document.getElementById('joke-table').className = "hidden";
	});
}

function showJokeList(jokeTerm) {
	const term = jokeTerm;
	let url = 'https://icanhazdadjoke.com/search?term=' + term
	getJoke(url).then(function (data) {
		console.log(data);
		const results = data.results;
		const jokeListElement = document.getElementById("jokeList");
		renderJokeList(results, jokeListElement);
		document.getElementById('joke-text').className = "hidden";
		document.getElementById('joke-table').className = "";
		document.getElementById('jokeCount').innerHTML = "Found " + data.total_jokes + " jokes!"; 
	});
}

function renderJokeList(jokes, jokeListElement) {
	//console.table(jokes);
	const list = jokeListElement;
	list.innerHTML = "";
	
	jokes.forEach(joke => {
		let listItem = document.createElement("ul");
		listItem.innerHTML = `
        	<li>${joke.joke}</li>
			`;
		list.appendChild(listItem);
	});
	
};


const randomBtn = document.getElementById("random");
randomBtn.addEventListener("click", function (event) {
	event.preventDefault();
	showRandomJoke();
});

const searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", function (event) {
	event.preventDefault();
	const jokeTerm = document.getElementById("jokeTerm").value;
	console.log(jokeTerm);
	//let searchUrl = 'https://icanhazdadjoke.com/search/?term=' + jokeTerm;
	showJokeList(jokeTerm);
})

showRandomJoke();