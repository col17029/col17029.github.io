try {
    let option = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    document.getElementById("currentdate").textContent = document.lastModified;
} catch (e) {
    alert("Error with code or your browser does not support Locale");
}