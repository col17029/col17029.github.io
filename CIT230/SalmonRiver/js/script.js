WebFont.load({
    google: {
      families: [
         'Raleway'
      ]
    }
  });


//-------------------------------------------------------------------

function togglemenu() {
  document.getElementById("menuNav").classList.toggle("hide");
}


//------------------------------------------------------------------

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


//--------------------------------------------------------------------
//Weather 
//Todays Weather
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?id=4092267&units=imperial&APPID=45f0ac31381fb6b34cef9102a4a06f70';
fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
        //console.log(jsObject);
        //let tDate = new Date();
        //document.querySelector('span.fcDate').textContent = (tDate.getMonth() + 1) + '/' + tDate.getDate();
        document.querySelector('span.fcTemp').textContent =  Math.round(jsObject.main.temp)+ "\xB0 F";    
        document.querySelector('span.fcDesc').textContent = jsObject.weather[0].description;
        document.querySelector('img.toImage').setAttribute('src', 'https://openweathermap.org/img/wn/' + jsObject.weather[0].icon + '@2x.png'); // note the concatenation
        document.querySelector('img.toImage').setAttribute('alt', jsObject.weather[0].description);
    });

// 5 Day forecast
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const apiForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?id=4092267&units=imperial&APPID=45f0ac31381fb6b34cef9102a4a06f70';
fetch(apiForecastURL)
    .then((response) => response.json())
    .then((jsObject) => {
        const fcList = jsObject.list.filter(fcList => fcList.dt_txt.includes('18:00:00'))
        console.log(jsObject);
        //console.log(fcList);

        fcList.forEach(forecast => {
            let fcCol = document.createElement('div');
            let fcDay = document.createElement('span');
            let fcDate = document.createElement('span');
            let image = document.createElement('img');
            let fcTemp = document.createElement('span');
            let fcDesc = document.createElement('span');
            let valDate = new Date(forecast.dt_txt);

            fcDay.textContent = weekday[valDate.getDay()];
            fcDay.setAttribute('class', "fcDay");
            fcDate.textContent = (valDate.getMonth() + 1) + '/' + valDate.getDate();
            console.log(valDate);
            fcDate.setAttribute('class', "fcDate");
            image.setAttribute('src', 'https://openweathermap.org/img/wn/' + forecast.weather[0].icon + '@2x.png');
            image.setAttribute('alt', forecast.weather[0].description);
            fcTemp.textContent = Math.round(forecast.main.temp) + "\xB0 F";
            fcTemp.setAttribute('class', "fcTemp");
            fcDesc.textContent = forecast.weather[0].description;
            fcDesc.setAttribute('class', "fcDesc");
            fcCol.setAttribute('class', "fcCol");
            fcCol.appendChild(fcDay);
            fcCol.appendChild(fcDate);
            fcCol.appendChild(image);
            fcCol.appendChild(fcTemp);
            fcCol.appendChild(fcDesc);

            document.querySelector('div.homeForecast').appendChild(fcCol);
        })
    });

// River guide json

const rgURL = 'https://col17029.github.io/SalmonRiver/json/riverGuide.json';
fetch('./json/riverGuide.json')
    .then((response) => response.json())
    .then(jsObject => {
        const guides = jsObject['guides'];
        console.log(jsObject); // temporary checking for valid response and data parsing
        for (let i = 0; i < guides.length; i++) {
                let guide = document.createElement('section');
                let rgInfo = document.createElement('div');
                let rgName = document.createElement('div');
                let rgImage = document.createElement('img');
                let rgCert = document.createElement('div');
                let rgYears = document.createElement('div');
                let rgEmail = document.createElement('div');
                let rgBio = document.createElement('div');

                rgInfo.setAttribute('class', "rgInfo");
                rgName.textContent = guides[i].name;
                rgName.setAttribute('class', "rgName");
                rgImage.setAttribute('src', "images/" + guides[i].photo);
                rgImage.setAttribute('alt', guides[i].name);
                rgCert.textContent = 'Certification: ' + guides[i].certlevel;
                rgCert.setAttribute('class', "rgCert");
                rgYears.textContent = 'Years of experience: ' + guides[i].experience;
                rgYears.setAttribute('class', "rgYears");
                rgEmail.textContent = 'Email: ' + guides[i].email;
                rgEmail.setAttribute('class', "rgEmail");
                rgBio.textContent = 'Biography: ' + guides[i].biography;
                rgBio.setAttribute('class', "rgBio");

                
                rgInfo.appendChild(rgName);
                rgInfo.appendChild(rgCert);
                rgInfo.appendChild(rgYears);
                rgInfo.appendChild(rgEmail);
                rgInfo.appendChild(rgBio); 
                
                guide.appendChild(rgImage);
                guide.appendChild(rgInfo);

                document.querySelector('div.rgDiv').appendChild(guide);
            }
    });  