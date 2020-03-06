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
      let town = document.createElement('section');
      let h2 = document.createElement('h2');
      let h3 = document.createElement('h3');
      let div1 = document.createElement('div');
      let div2 = document.createElement('div');
      let div3 = document.createElement('div');
      let image = document.createElement('img');

      h2.textContent = towns[i].name;
      h3.textContent = towns[i].motto;
      div1.textContent = 'Year Founded: ' + towns[i].yearFounded;
      div2.textContent = 'Population: ' + towns[i].currentPopulation;
      div3.textContent = 'Annual Rainfall: ' + towns[i].averageRainfall;
      image.setAttribute('src', towns[i].photo);
      image.setAttribute('alt', towns[i].name);

      town.appendChild(h2);
      town.appendChild(h3);
      town.appendChild(div1);
      town.appendChild(div2);
      town.appendChild(div3);
      town.appendChild(image);

      document.querySelector('div.towninfo').appendChild(town);
    }
  });