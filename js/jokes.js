
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
function showRandomJoke() {
	let url = 'https://icanhazdadjoke.com/'
	getJoke(url).then(function (data) {
		//console.log(data);
		document.getElementById('joke-text').innerHTML = data.joke;
		document.getElementById('joke-text').className = "";
		document.getElementById('joke-table').className = "hidden";
		document.getElementById('jokeTerm').value = ""
	});
}

function showJokeList(jokeTerm) {
	const term = jokeTerm;
	let url = 'https://icanhazdadjoke.com/search?term=' + term
	getJoke(url).then(function (data) {
		//console.log(data);
		const results = data.results;
		const jokeListElement = document.getElementById("jokeList");
		renderJokeList(results, jokeListElement);
		document.getElementById('joke-text').className = "hidden";
		document.getElementById('joke-table').className = "";
		document.getElementById('jokeCount').innerHTML = "Found " + data.total_jokes + " jokes!"; 
	});
}

function renderJokeList(jokes, jokeListElement) {
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
	showJokeList(jokeTerm);
})

showRandomJoke();