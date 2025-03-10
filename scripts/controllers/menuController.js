import MenuModel from "../models/menuModel.js";
import MenuView from "../views/menuView.js";

class MenuController {
  constructor() {
    this.menuModel = new MenuModel(this);
    this.menuView = new MenuView(this)

    this.#inicialize();
  }

  #inicialize() {
    this.menuView.changeSlide(0);
  }

  // events
  eventWindowOnClick(e) {
    if (!this.menuView.searchCategoryButton.contains(e.target)
      && !this.menuView.searchCategoryDropdownContent.contains(e.target)) {
      this.menuView.hideSearchCategoryContent();
    }
  }

  eventSearchInputKeypress(e) {
    if (!this.menuView.searchInput.value) return;

    if (e.key === "Enter") {
      this.#changeToSearchPage();
    }
  }

  eventHeaderPrevButtonOnClick() {
    let slide = this.menuModel.getSlideNumber();
    const length = this.menuModel.getTotalSlides();

    if (slide > 0) {
      slide--;
    } else {
      slide = length - 1;
    }
    this.menuModel.setSlideNumber(slide);

    this.menuView.changeSlide(slide);
  }

  eventHeaderNextButtonOnClick() {
    let slide = this.menuModel.getSlideNumber();
    const length = this.menuModel.getTotalSlides();

    if (slide < length - 1) {
      slide++;
    } else {
      slide = 0;
    }
    this.menuModel.setSlideNumber(slide);

    this.menuView.changeSlide(slide);
  }

  eventSearchCategoryButtonOnClick() {
    const searchCategoryVisibility = this.menuView.searchCategoryDropdownContent.style.visibility;
    if (searchCategoryVisibility === "hidden"
      || searchCategoryVisibility === "") {
      this.menuView.showSearchCategoryContent();
    }
  }

  eventSearchCategoryDropdownButtonOnClick(e) {
    const text = e.target.innerText;

    if (!text) return;

    this.menuView.setSearchCategoryButtonText(text);

    this.menuView.hideSearchCategoryContent()
  }

  eventProductSliderPrevButtonOnClick(sliderNumber) {
    this.menuView.productSliderScroll(sliderNumber, "left");
  }

  eventProductSliderNextButtonOnClick(sliderNumber) {
    this.menuView.productSliderScroll(sliderNumber, "right");
  }

  eventProductSliderFinishScroll(sliderNumber) {
    this.#checkSliderButton(sliderNumber);
  }

  // private functions
  #changeToSearchPage() {
    return
  }

  #checkSliderButton(sliderNumber) {
    const slider = this.menuView
      .productSliders[sliderNumber]
      .querySelector(".products");

    const width = slider.scrollWidth - slider.clientWidth;
    const position = slider.scrollLeft;

    const prevButton = this.menuView
      .productSliders[sliderNumber]
      .querySelector("#control-prev");

    if (position === 0) {
      this.menuView.fadeSliderButton(prevButton);
    } else {
      this.menuView.unfadeSliderButton(prevButton);
    }

    const nextButton = this.menuView
      .productSliders[sliderNumber]
      .querySelector("#control-next");

    if (position === width) {
      this.menuView.fadeSliderButton(nextButton);
    } else {
      this.menuView.unfadeSliderButton(nextButton);
    }
  }
}

export { MenuController };