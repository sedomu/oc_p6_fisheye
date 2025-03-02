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
        this.model = new Model();
    }

    /**
     * Displays the homepage with a list of photographers.
     * Fetches data from the model and passes it to the view for rendering.
     *
     * @async
     * @returns {Promise<void>} Resolves when the homepage is fully rendered.
     */
    async displayPhotographersPage() {
        // const model = new Model();
        const photographers = await this.model.getPhotographerDetails();
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
     * @returns {Promise<void>} Resolves when the profile page is fully rendered.
     */
    async displayPhotographerProfile(sortMethod) {
        const photographerId = Services.getParam("id");

        // const model = new Model();
        const header = await this.model.getPhotographerDetails(photographerId);
        const medias = await this.model.getPhotographerProfileContent(photographerId, sortMethod);

        const vue = new photographerDetails(header, medias);
        vue.displayPhotographerDetailsAssembler();


        // this.initMediasSorter();
    }
}
