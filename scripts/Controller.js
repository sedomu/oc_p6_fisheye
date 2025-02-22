/**
 * Controller class handling the application's main logic and view management
 * Manages photographer pages, media sorting, and profile displays
 *
 * @class Controller
 * @property {PhotographerMediasSorter} mediasSorter - Handles media sorting functionality
 * @method displayPhotographersPage - Renders the photographers listing page
 * @method initMediasSorter - Initializes and triggers the media sorting functionality
 * @method displayPhotographerProfile - Renders a photographer's profile page with their media content
 */
class Controller {
    constructor() {
        this.mediasSorter = null; // Ne pas instancier directement
    }

    async displayPhotographersPage() {
        const model = new Model();
        const photographers = await model.getPhotographers();
        const vue = new listPhotographersVue();
        await vue.displayPhotographers(photographers);
    }

    initMediasSorter() {
        if (!this.mediasSorter) {
            this.mediasSorter = new PhotographerMediasSorter(this);
        }
        this.mediasSorter.sortMedias();
    }

    async displayPhotographerProfile(sortMethod, callback) {
        const photographerId = Services.getParam("id");

        const model = new Model();
        const header = await model.getPhotographerProfileHeader(photographerId);
        const medias = await model.getPhotographerProfileContent(photographerId, sortMethod);

        const vue = new photographerDetails(header, medias);

        vue.displayPhotographerDetailsAssembler();

        // Exécuter le callback si défini
        if (typeof callback === "function") {
            callback();
        }
    }
}
