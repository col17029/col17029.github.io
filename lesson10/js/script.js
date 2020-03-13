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

//-------------------------------------------------------------------

function togglemenu() {
    document.getElementById("menuNav").classList.toggle("hide");
}

//--------------------------------------------------------------------

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

WebFont.load({
    google: {
        families: [
            'Catamaran',
            'Barlow Condensed'
        ]
    }
});

//---------------------------------------------------------------------

const apiURL = 'https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&APPID=45f0ac31381fb6b34cef9102a4a06f70';
fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);
        document.getElementById('current-temp').textContent = jsObject.main.temp;
        document.getElementById('high-temp').textContent = jsObject.main.temp_max;
        document.getElementById('low-temp').textContent = jsObject.main.temp_min;
        document.getElementById('humidity').textContent = jsObject.main.humidity;
        document.getElementById('wind-speed').textContent = jsObject.wind.speed;
        document.getElementById('current-desc').textContent = jsObject.weather[0].main;
        const imagesrc = 'https://openweathermap.org/img/w/' + jsObject.weather[0].icon + '.png'; // note the concatenation
        const desc = jsObject.weather[0].description; // note how we reference the weather array
        //document.getElementById('imagesrc').textContent = imagesrc; // informational specification only
        //document.getElementById('icon').setAttribute('src', imagesrc); // focus on the setAttribute() method
        //document.getElementById('icon').setAttribute('alt', desc);

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