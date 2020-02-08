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
    alert("Error with code or your browser does not support Locale");
}
