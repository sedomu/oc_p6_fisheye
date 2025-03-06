/**
 * Handles sorting functionality for a photographer's media portfolio.
 * Listens for user interactions and updates the displayed media accordingly.
 *
 * @class PhotographerMediasSorter
 * @property {Controller} controller - Reference to the main application controller.
 * @method handleSortChange - Handles sorting option changes and updates the media display.
 * @method sortMedias - Attaches the sorting event listener to the sorting dropdown.
 */
class PhotographerMediasSorter {
    /**
     * Creates an instance of PhotographerMediasSorter.
     *
     * @param {Controller} controller - The main application controller responsible for handling media display.
     */
    constructor(controller) {
        /**
         * The controller instance that manages the photographer profile view.
         * @type {Controller}
         */
        this.controller = controller;

        // Ensure the correct `this` context is maintained when calling handleSortChange
        this.handleSortChange = this.handleSortChange.bind(this);

        this.sortMedias()

        // keyboard navigation
        const uiGlobal = document.querySelector(".component-visual");
        const uiButtons = document.querySelectorAll(".sorter-component-button");

        document.addEventListener("keyup", (e) => {
            if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("component-visual")){
                e.target.classList.add("hovered");
                uiGlobal.tabIndex = -1;
                for (let i = 0; i < uiButtons.length; i++) {
                    uiButtons[i].tabIndex = 0;
                }
                uiButtons[0].focus();
            }

            if (e.key === "Escape"  &&
                e.target.classList.contains("sorter-component-button") && uiGlobal.classList.contains("hovered"))
                    {
                        uiGlobal.classList.remove("hovered");
                        uiGlobal.tabIndex = 0;
                        for (let i = 0; i < uiButtons.length; i++) {
                            uiButtons[i].tabIndex = -1;
                        }
                        uiGlobal.focus();
                    }
        })
    }

    /**
     * Handles changes in the media sorting dropdown.
     * Reorder options in the front-end component (selected option becomes first).
     * Clears the existing media display and re-renders the sorted media.
     *
     * @param {Event} e - The change event triggered by selecting a new sort option.
     * @returns {void}
     */
    handleSortChange(e) {
        // Get option
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

        // Remove existing media elements from the portfolio
        const portfolio = document.querySelector('.photographer-portfolio');
        while (portfolio.firstChild) {
            portfolio.removeChild(portfolio.firstChild);
        }

        // Call the controller to refresh and display the sorted media
        this.controller.displayPhotographerProfile(
            sortMethod,
            // this.controller.initMediasSorter.bind(this.controller)
        );
    }

    /**
     * Initializes the media sorting event listener.
     * Ensures that duplicate event listeners are not attached.
     *
     * @returns {void}
     */
    sortMedias() {

        let buttons = document.querySelectorAll(".sorter-component-button");
        console.log(buttons);
        // Remove any existing event listener before adding a new one

        // for(let i = 0; i < buttons.length; i++) {
        //     buttons[i].removeEventListener("click", this.handleSortChange);
        // }

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", this.handleSortChange);
        }
    }
}
