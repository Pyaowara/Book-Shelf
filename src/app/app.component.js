let isLeftMenuIcon = false;

function leftMenuToggleButton() {

    const toggleButton = document.getElementById("leftMenuToggleButton");
    const menu = document.getElementById("left-menu");
    const homeButton = document.getElementById("home-button");
    const bookButton = document.getElementById("book-button");
    const historyButton = document.getElementById("history-button");

    menu.classList.toggle("expanded");
    homeButton.classList.toggle("expanded");
    bookButton.classList.toggle("expanded");
    historyButton.classList.toggle("expanded");
    if (isLeftMenuIcon) {
        homeButton.innerText = "Home";
        bookButton.innerText = "Books";
        historyButton.innerText = "History";
    } else {
        homeButton.innerText = "";
        bookButton.innerText = "";
        historyButton.innerText = "";
    }
    isLeftMenuIcon = !isLeftMenuIcon;
}

function search() {
    let searchText = document.getElementById("search-input").value;
    window.open("https://www.google.com/search?q=" + searchText, "_self");
}