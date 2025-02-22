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
    }

    /**
     * Handles changes in the media sorting dropdown.
     * Clears the existing media display and re-renders the sorted media.
     *
     * @param {Event} e - The change event triggered by selecting a new sort option.
     * @returns {void}
     */
    handleSortChange(e) {
        const sortMethod = e.target.value;

        // Remove existing media elements from the portfolio
        const portfolio = document.querySelector('.photographer-portfolio');
        while (portfolio.firstChild) {
            portfolio.removeChild(portfolio.firstChild);
        }

        // Call the controller to refresh and display the sorted media
        this.controller.displayPhotographerProfile(
            sortMethod,
            this.controller.initMediasSorter.bind(this.controller)
        );
    }

    /**
     * Initializes the media sorting event listener.
     * Ensures that duplicate event listeners are not attached.
     *
     * @returns {void}
     */
    sortMedias() {
        const sorter = document.querySelector('#mediasSorter');

        // Remove any existing event listener before adding a new one
        sorter.removeEventListener('change', this.handleSortChange);
        sorter.addEventListener('change', this.handleSortChange);
    }
}
