try {
    let today = new Date().getDay()
    if (today == 5) {
        document.getElementsByClassName("noticeText")[0].style.display = "block";
    } else {
        document.getElementsByClassName("noticeText")[0].style.display = "none";
    };

} catch (e) {
    alert("Error with code");
}

//--------------------------------------------------------------------

const cityID = document.getElementsByName('cityID')[0].getAttribute('content')

const apiURL = 'https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&units=imperial&APPID=45f0ac31381fb6b34cef9102a4a06f70';
fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
        //console.log(jsObject);
        document.getElementById('current-temp').textContent = jsObject.main.temp;
        document.getElementById('high-temp').textContent = jsObject.main.temp_max;
        document.getElementById('low-temp').textContent = jsObject.main.temp_min;
        document.getElementById('humidity').textContent = jsObject.main.humidity;
        document.getElementById('wind-speed').textContent = jsObject.wind.speed;
        document.getElementById('current-desc').textContent = jsObject.weather[0].main;
        const imagesrc = 'https://openweathermap.org/img/w/' + jsObject.weather[0].icon + '.png'; // note the concatenation
        const desc = jsObject.weather[0].description; 

        try {
            var t = jsObject.main.temp;
            var s = jsObject.wind.speed;
            var f = 0
            if ((t <= 50) && (s > 3)) {
                f = 35.74 + 0.6215 * t - 35.75 * Math.pow(s, 0.16) + 0.4275 * t * Math.pow(s, 0.16);
                document.getElementById("windchill").textContent = f.toFixed(0);
            } else {
                document.getElementById("windchill").textContent = 'N/A';
            }

        } catch (e) {
            alert("Error with code");
        }
    });

//--------------------------------------------------------------------

var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const apiForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?id=' + cityID + '&units=imperial&APPID=45f0ac31381fb6b34cef9102a4a06f70';
fetch(apiForecastURL)
    .then((response) => response.json())
    .then((jsObject) => {
        const fcList = jsObject.list.filter(fcList => fcList.dt_txt.includes('18:00:00'))
        //console.log(jsObject);
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
                fcDate.setAttribute('class', "fcDate");
                image.setAttribute('src', 'https://openweathermap.org/img/wn/' + forecast.weather[0].icon + '@2x.png');
                image.setAttribute('alt', forecast.weather[0].description);
                fcTemp.textContent = Math.round(forecast.main.temp) + "\xB0 F";
                fcTemp.setAttribute('class', "fcTemp");
                fcDesc.textContent = forecast.weather[0].description;
                fcDesc.setAttribute('class', "fcDesc");
                
                fcCol.appendChild(fcDay);
                fcCol.appendChild(fcDate);
                fcCol.appendChild(image);
                fcCol.appendChild(fcTemp);
                fcCol.appendChild(fcDesc);
                
                document.querySelector('div.fcFlex').appendChild(fcCol);
            })
        });


//----------------------------------------------------------------------------------


const eventURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(eventURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        const towns = jsonObject['towns'];
        //console.table(jsonObject); // temporary checking for valid response and data parsing
               
            console.log(cityID);
            
            var townID = "";
            switch (cityID) {
                case "5585010": 
                    townID = "Fish Haven";
                    console.log(townID);
                    break;
                case "5604473": 
                    townID = "Preston";
                    console.log(townID);
                    console.log(cityID);
                    break;
                case "5607916": 
                   townID = "Soda Springs";
                    console.log(townID);
                    break; 
            }

            for (let i = 0; i < towns.length; i++) {
            console.log(townID);
            if (towns[i].name == townID)  {
                let event = document.createElement('section');
                let eventList = document.createElement('div');
                

                eventList.textContent = towns[i].events.join(" <br> ");
                eventList.setAttribute('class', "eventList");           
                           
                event.appendChild(eventList);
                
                document.querySelector('div.eventInfo').appendChild(event);
            }
        }
    });