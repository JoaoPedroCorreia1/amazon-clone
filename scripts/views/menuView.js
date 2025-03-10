class MenuView {
  searchCategoryButton;
  searchCategoryButtonText;
  searchCategoryDropdownContent;
  searchInput;

  languageButton;
  languageDropdownContent;
  languageDropdownContentOptions;

  selectedLanguageOption;

  headerSlides;
  headerPrevButton;
  headerNextButton;

  productSliders;

  constructor(menuController) {
    this.menuController = menuController;

    this.#inicialize_elements();
    this.#inicialize_events();
  }

  #inicialize_elements() {
    this.searchCategoryButton = document.querySelector(".nav .search .category .button");
    this.searchCategoryButtonText = document.querySelector(".nav .search .category .button p");
    this.searchCategoryDropdownContent = document.querySelector(".nav .search .category .dropdown-content");
    this.searchInput = document.querySelector(".nav .search .input");

    this.languageButton = document.querySelector(".nav .language .button");
    this.languageDropdownContent = document.querySelector(".nav .language .dropdown-content")
    this.languageDropdownContentOptions = this.languageDropdownContent.querySelectorAll(".options *");

    this.selectedLanguageOption = document.querySelector(".nav .language .first-option");

    this.headerSlides = document.querySelectorAll(".header-slider ul img");
    this.headerPrevButton = document.querySelector(".header-slider .control-prev");
    this.headerNextButton = document.querySelector(".header-slider .control-next");

    this.productSliders = document.querySelectorAll(".product-slider-1, .product-slider-2");
  }

  #inicialize_events() {
    window.addEventListener("click", (e) => {
      this.menuController.eventWindowOnClick(e)
    });

    this.searchCategoryButton.addEventListener("click", (e) => {
      this.menuController.eventSearchCategoryButtonOnClick();
    })

    this.searchCategoryDropdownContent.addEventListener("click", (e) => {
      this.menuController.eventSearchCategoryDropdownButtonOnClick(e);
    });

    this.searchInput.addEventListener("keypress", (e) => {
      this.menuController.eventSearchInputKeypress(e);
    });

    this.headerPrevButton.addEventListener("click", (e) => {
      this.menuController.eventHeaderPrevButtonOnClick()
    });

    this.headerNextButton.addEventListener("click", (e) => {
      this.menuController.eventHeaderNextButtonOnClick()
    });

    for (let i = 0; i < this.productSliders.length; i++) {
      const ps = this.productSliders[i];
      const slider = ps.querySelector(".products");
      const prevButton = ps.querySelector("#control-prev");
      const nextButton = ps.querySelector("#control-next");

      slider.addEventListener("scrollend", (e) => {
        this.menuController.eventProductSliderFinishScroll(i);
      });

      prevButton.addEventListener("click", (e) => {
        this.menuController.eventProductSliderPrevButtonOnClick(i);
      });

      nextButton.addEventListener("click", (e) => {
        this.menuController.eventProductSliderNextButtonOnClick(i);
      });
    }
  }

  // search category
  setSearchCategoryButtonText(text) {
    this.searchCategoryButtonText.innerHTML = text;
  }

  showSearchCategoryContent() {
    this.searchCategoryDropdownContent.style.visibility = "visible";
    const p = this.searchCategoryButton.querySelector("p");
    const dropdownIcon = this.searchCategoryButton.querySelector(".nav-dropdown-icon");

    p.style.color = "#000000";
    this.searchCategoryButton.style.backgroundColor = "rgb(212, 212, 212)";
    dropdownIcon.style.filter = "brightness(0)";
  }

  hideSearchCategoryContent() {
    this.searchCategoryDropdownContent.style.visibility = "hidden";
    const p = this.searchCategoryButton.querySelector("p");
    const dropdownIcon = this.searchCategoryButton.querySelector(".nav-dropdown-icon");

    p.style.color = null;
    this.searchCategoryButton.style.backgroundColor = null;
    dropdownIcon.style.filter = null;
  }

  // header slider
  changeSlide(slideNumber) {
    const slide = this.headerSlides[slideNumber];
    if (slide.classList.contains("animation")) {
      slide.classList.remove("animation");
    }

    for (let i = 0; i < this.headerSlides.length; i++) {
      if (i === slideNumber) continue;
      this.headerSlides[i].style.display = "none";
    }

    setTimeout(() => {
      slide.classList.add("animation");
    }, 1);

    setTimeout(() => {
      slide.style.display = "block";
    }, 1)
  }

  // product slider
  productSliderScroll(sliderNumber, direction) {
    const productSlider = this.productSliders[sliderNumber];

    const slider = productSlider.querySelector(".products");

    let velocity = 1000;

    if (direction === "left") velocity *= -1;

    slider.scrollBy(
      { left: velocity, behavior: "smooth" });
  }

  fadeSliderButton(button) {
    button.style.opacity = 0.5;
  }

  unfadeSliderButton(button) {
    button.style.opacity = 1;
  }
}

export default MenuView
