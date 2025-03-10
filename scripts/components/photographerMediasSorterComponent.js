/**
 * Handles media sorting for a photographer's portfolio.
 * Listens for sorting changes and updates media display accordingly.
 *
 * @class PhotographerMediasSorter
 * @property {Controller} controller - Reference to the main controller.
 */
class PhotographerMediasSorter {
    /**
     * Initializes the media sorter with the given controller and sets up event listeners.
     *
     * @param {Controller} controller - The main application controller.
     */
    constructor(controller) {
        this.controller = controller;
        this.handleSortChange = this.handleSortChange.bind(this);

        this.sortMedias();

        const uiGlobal = document.querySelector(".component-visual");
        const uiButtons = document.querySelectorAll(".sorter-component-button");

        document.addEventListener("keyup", (e) => {
            // "Entering" sorting options with Enter or Space
            if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("component-visual")) {
                e.target.classList.add("hovered");
                uiGlobal.tabIndex = -1;
                uiButtons.forEach(button => button.tabIndex = 0);
                uiButtons[0].focus();
            }

            // "Exiting" sorting options with Escape
            // "Selecting" sorting option
            if (e.target.classList.contains("sorter-component-button") && uiGlobal.classList.contains("hovered")) {
                if (e.key === " ") {
                    e.target.click();
                }

                if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
                    uiGlobal.classList.remove("hovered");
                    uiGlobal.tabIndex = 0;
                    for (let i = 0; i < uiButtons.length; i++) {
                        uiButtons[i].tabIndex = -1;
                    }
                    uiGlobal.focus();
                }
            }
        });
    }

    /**
     * Handles sorting option changes and updates media display.
     *
     * @param {Event} e - The change event from the sorting dropdown.
     * @returns {void}
     */
    handleSortChange(e) {
        const sortMethod = e.target.value;

        // Re-order options in the buttons list
        // Selected option becomes first
        let firstElement = document.querySelector(".sorter-component-button.first-option");
        let eValue = e.target.value;
        let eInnerText = e.target.innerText;
        e.target.value = firstElement.value;
        e.target.innerText = firstElement.innerText;
        firstElement.value = eValue;
        firstElement.innerText = eInnerText;

        const portfolio = document.querySelector('.photographer-portfolio');
        while (portfolio.firstChild) portfolio.removeChild(portfolio.firstChild);

        this.controller.displayPhotographerProfile(sortMethod);
    }

    /**
     * Initializes the media sorting event listener.
     *
     * @returns {void}
     */
    sortMedias() {
        const buttons = document.querySelectorAll(".sorter-component-button");
        buttons.forEach(button => button.addEventListener("click", this.handleSortChange));
    }
}
