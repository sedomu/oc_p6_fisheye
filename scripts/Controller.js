/**
 * Manages the main logic and view for the application,
 * including the homepage, photographer profiles, and media sorting.
 *
 * @class Controller
 * @property {PhotographerMediasSorter|null} mediasSorter - Lazily initialized media sorter instance.
 */
class Controller {
    constructor() {
        /** @type {PhotographerMediasSorter|null} */
        this.mediasSorter = null;
        this.model = new Model();
    }

    /**
     * Renders the photographers' listing page by fetching and displaying photographer details.
     *
     * @async
     * @returns {Promise<void>} Resolves when the page is fully rendered.
     */
    async displayPhotographersPage() {
        const photographers = await this.model.getPhotographerDetails();
        const vue = new listPhotographersVue();
        await vue.displayPhotographers(photographers);
    }

    /**
     * Displays a photographer's profile page with media, applying the given sorting method.
     *
     * @async
     * @param {string} sortMethod - Sorting method for media.
     * @param {boolean} [init=false] - Whether to initialize additional components (like, lightbox, etc.).
     * @returns {Promise<void>} Resolves when the profile page is fully rendered.
     */
    async displayPhotographerProfile(sortMethod, init = false) {
        const photographerId = Services.getParam("id");
        const photographer = await this.model.getPhotographerDetails(photographerId);
        const medias = await this.model.getPhotographerProfileContent(photographerId, sortMethod);

        const vue = new photographerDetails(photographer, medias);
        vue.displayPhotographerDetailsAssembler();

        if (init) {
            new PopularityBar(photographerId).displayPopularityBar();
            new Lightbox();
            new ContactModal();
        }
    }
}
