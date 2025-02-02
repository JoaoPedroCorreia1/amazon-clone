/*
global

nav
  search-category
  language
  accounts & Lists

  nav bottom
  
main page
  header
  box-1
  box-2
  slider-1
  slider-2

search page
    options
    content

utils
  language
*/
//global
let currentPage;
let currentLanguage;

//nav
//  search-category
const searchCategoryButton = document.querySelector(".nav .search .category .button");
const searchCategoryDropdownContent = document.querySelector(".nav .search .category .dropdown-content");

searchCategoryButton.addEventListener("click", (e) => {
    if (searchCategoryDropdownContent.style.visibility === "hidden"
        || searchCategoryDropdownContent.style.visibility === "") {
        showSearchCategoryContent();
    }
});

window.addEventListener("click", (e) => {
    if (!searchCategoryButton.contains(e.target)
        && !searchCategoryDropdownContent.contains(e.target)) {
        hideSearchCategoryContent();
    }
});

let variable;

searchCategoryDropdownContent.addEventListener("click", (e) => {
    let text;
    let elements = e.target.querySelectorAll('p');
    if (elements.length !== 0) {
        elements.forEach((element) => {
            if (element.id !== "hidden") {
                text = element.innerHTML;
            }
        });
    } else {
        text = e.target.innerHTML;
    }

    searchCategoryButton.querySelectorAll("p").forEach((element) => {
        if(element.id !== "hidden") {
            element.innerHTML = text;
        }
    });

    hideSearchCategoryContent();
});

function showSearchCategoryContent() {
    searchCategoryDropdownContent.style.visibility = "visible";
    const p = searchCategoryButton.querySelector("p");
    const dropdownIcon = searchCategoryButton.querySelector(".nav .dropdown-icon");

    p.style.color = "#000000";
    searchCategoryButton.style.backgroundColor = "rgb(212, 212, 212)";
    dropdownIcon.style.filter = "brightness(0)";
}

function hideSearchCategoryContent() {
    searchCategoryDropdownContent.style.visibility = "hidden";
    const p = searchCategoryButton.querySelector("p");
    const dropdownIcon = searchCategoryButton.querySelector(".nav .dropdown-icon");

    p.style.color = null;
    searchCategoryButton.style.backgroundColor = null;
    dropdownIcon.style.filter = null;
}

//  search-input
const searchInput = document.querySelector(".nav ,search .input");

searchInput.addEventListener("keypress", (e) => {
    if (!searchInput.value) return;

    if (e.key === "Enter") {
        changeToSearchPage();
    }
});

// language
const languageButton = document.querySelector(".nav .language .button");
const languageDropdownContent = document.querySelector(".nav .language .dropdown-content")
const languageDropdownContentOptions = languageDropdownContent.querySelectorAll(".options *");
let selectedLanguageOption = document.querySelector(".nav .language .first-option");

languageDropdownContentOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
        let target = e.currentTarget.querySelector('p');
        if(!target) return;

        let language = target.innerHTML;
        language = language.substring(language.length - 2, language.length);
        
        languageButton.querySelector("p").innerHTML = language;

        selectedLanguageOption.id = "unselected";
        option.id = "selected";

        selectedLanguageOption = option;

        language = language.toLowerCase();
        changeLanguage(language);
    });
});

// accounts & Lists
function buttonSignInOnClick() {

}

//nav bottom

//  header
const imgs = document.querySelectorAll(".header-slider ul img");
const prevBtn = document.querySelector(".header-slider .control-prev");
const nextBtn = document.querySelector(".header-slider .control-next");

let n = 0;
changeSlide();
function changeSlide() {
    let img = imgs[n];
    if (img.classList.contains("animation")) {
        img.classList.remove("animation");
    }

    for (let i = 0; i < imgs.length; i++) {
        if (i === n) continue;
        imgs[i].style.display = "none";
    }

    setTimeout(() => { img.classList.add("animation"); }, 1);
    setTimeout(() => {
        img.style.display = "block";
    }, 1)
}

prevBtn.addEventListener("click", (e) => {
    if (n > 0) {
        n--;
    } else {
        n = imgs.length - 1;
    }
    changeSlide();
});

nextBtn.addEventListener("click", (e) => {
    if (n < imgs.length - 1) {
        n++;
    } else {
        n = 0;
    }
    changeSlide();
});
//  box-1

//  box-1

//  slider-1

//  slider-2

//utils
// language
changeLanguage("en");

function changeLanguage(language) {
    currentLanguage = language;
    const elements = document.querySelectorAll("*");
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].lang === "") continue;

        if (elements[i].lang !== language) {
            elements[i].id = "hidden";
        } else {
            elements[i].id = null;
        }
    }
    changeSearchCategoryLanguage();
    changeInputPlaceholderLanguage();
}

function changeSearchCategoryLanguage() {
    let elements = searchCategoryButton.querySelectorAll('p');
    elements.forEach((element) => {
        switch(element.lang) {
            case "en":
                element.innerHTML = "All";
                break;
            case "pt":
                element.innerHTML = "Todos";
                break;
        }
    });
}

function changeInputPlaceholderLanguage() {
    switch(currentLanguage) {
        case "en":
            searchInput.placeholder = "Search Amazon";
            break;
        case "pt":
            searchInput.placeholder = "Procurar Amazon";
            break;
    }
}
