try {
    let option = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    document.getElementById("currentdate").textContent = new Date().toLocaleDateString("en-US", option);
} catch (e) {
    alert("Error with code or your browser does not support Locale");
}

function togglemenu() {
    document.getElementById("menuNav").classList.toggle("hide");
}

WebFont.load({
    google: {
        families: [
            'Catamaran',
            'Barlow Condensed'
        ]
    }
});

const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        const towns = jsonObject['towns'];
        console.table(jsonObject); // temporary checking for valid response and data parsing
        for (let i = 0; i < towns.length; i++) {
            if ((towns[i].name == "Fish Haven") || (towns[i].name == "Preston") || (towns[i].name == "Soda Springs")) {
                let town = document.createElement('section');
                let towntext = document.createElement('div');
                let townname = document.createElement('div');
                let townmotto = document.createElement('div');
                let townyear = document.createElement('div');
                let townpop = document.createElement('div');
                let townrain = document.createElement('div');
                let image = document.createElement('img');

                towntext.setAttribute('class', "towntext");
                townname.textContent = towns[i].name;
                townname.setAttribute('class', "townname");
                townmotto.textContent = towns[i].motto;
                townmotto.setAttribute('class', "townmotto");
                townyear.textContent = 'Year Founded: ' + towns[i].yearFounded;
                townpop.textContent = 'Population: ' + towns[i].currentPopulation;
                townrain.textContent = 'Annual Rainfall: ' + towns[i].averageRainfall;
                image.setAttribute('src', "images/" + towns[i].photo);
                image.setAttribute('alt', towns[i].name);

                towntext.appendChild(townname);
                towntext.appendChild(townmotto);
                towntext.appendChild(townyear);
                towntext.appendChild(townpop);
                towntext.appendChild(townrain);
                town.appendChild(towntext);
                town.appendChild(image);

                document.querySelector('div.towninfo').appendChild(town);
               // document.querySelector('section.town').appendChild(towntext);
            }
        }
    });