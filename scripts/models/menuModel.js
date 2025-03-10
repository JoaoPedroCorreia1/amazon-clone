class MenuModel {
    #slideNumber = 0;
    #totalSlides = 2;

    constructor(menuController) {
        this.menuController = menuController;
    }

    getSlideNumber() {
        return this.#slideNumber;
    }

    getTotalSlides() {
        return this.#totalSlides;
    }

    setSlideNumber(value) {
        this.#slideNumber = value;
    }
}

export default MenuModel;