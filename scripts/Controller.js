/**
 * Controller class handling the application's main logic and view management.
 * Manages the photographers' listing page (homepage), media sorting, and individual photographer profile pages.
 *
 * @class Controller
 * @property {PhotographerMediasSorter|null} mediasSorter - Handles media sorting functionality, initialized lazily.
 * @method displayPhotographersPage - Renders the photographers' listing page.
 * @method initMediasSorter - Initializes and triggers the media sorting functionality.
 * @method displayPhotographerProfile - Renders a photographer's profile page with their media content.
 */
class Controller {
    constructor() {
        /**
         * Media sorter instance, initialized only when needed.
         * @type {PhotographerMediasSorter|null}
         */
        this.mediasSorter = null;
    }

    /**
     * Displays the homepage with a list of photographers.
     * Fetches data from the model and passes it to the view for rendering.
     *
     * @async
     * @returns {Promise<void>} Resolves when the homepage is fully rendered.
     */
    async displayPhotographersPage() {
        const model = new Model();
        const photographers = await model.getPhotographers();
        const vue = new listPhotographersVue();
        await vue.displayPhotographers(photographers);
    }

    /**
     * Initializes the media sorting component if not already initialized,
     * and triggers the sorting functionality.
     *
     * @returns {void}
     */
    initMediasSorter() {
        if (!this.mediasSorter) {
            this.mediasSorter = new PhotographerMediasSorter(this);
        }
        this.mediasSorter.sortMedias();
    }

    /**
     * Displays a photographer's profile page with their media content.
     * Fetches profile header and media data based on the provided sorting method.
     * Executes a callback function if provided.
     *
     * @async
     * @param {string} sortMethod - The sorting method to apply to the media content.
     * @param {Function} [callback] - Optional callback function to execute after rendering.
     * @returns {Promise<void>} Resolves when the profile page is fully rendered.
     */
    async displayPhotographerProfile(sortMethod, callback) {
        const photographerId = Services.getParam("id");

        const model = new Model();
        const header = await model.getPhotographerProfileHeader(photographerId);
        const medias = await model.getPhotographerProfileContent(photographerId, sortMethod);

        const vue = new photographerDetails(header, medias);
        vue.displayPhotographerDetailsAssembler();

        // Execute the callback if provided
        if (typeof callback === "function") {
            callback();
        }
    }
}
