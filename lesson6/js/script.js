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

WebFont.load({
    google: {
      families: [
         'Catamaran',
         'Barlow Condensed'
      ]
    }
  });

  try {
    var t = parseFloat(document.getElementById("high").textContent);
    var s = parseFloat(document.getElementById("speed").textContent);
    var f = 0
    if ((t <= 50) && (s > 3)) {
        f = 35.74 + 0.6215 * t - 35.75 * Math.pow(s, 0.16) + 0.4275 * t * Math.pow(s, 0.16);
        document.getElementById("windchill").textContent = f.toFixed(0);
    } 
    else {
        document.getElementById("windchill").textContent = 'N/A';
    }

  } catch (e) {
    alert("Error with code");
}