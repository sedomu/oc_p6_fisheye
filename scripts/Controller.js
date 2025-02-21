class Controller {
    constructor() {
        this.mediasSorter = new PhotographerMediasSorter(this); // Passe l'instance actuelle du Controller
    }

    async displayPhotographersPage() {
        const model = new Model();
        const photographers = await model.getPhotographers();
        const vue = new listPhotographersVue();
        await vue.displayPhotographers(photographers);
    }

    initMediasSorter() {
        this.mediasSorter.sortMedias(); // Utilise toujours la même instance
    }

    async displayPhotographerProfile(sortMethod, callback) {
        const photographerId = Services.getParam("id");

        const model = new Model();
        const header = await model.getPhotographerProfileHeader(photographerId);
        const medias = await model.getPhotographerProfileContent(photographerId, sortMethod);

        const vue = new photographerDetails(header, medias);
        for (let i = 0; i < medias.length; i++) {
            medias[i].mediaHtmlCode = vue.displayPhotographerMediaFactory(medias[i]);
        }

        vue.displayPhotographerDetails();
        vue.displayPhotographerContent();
        vue.initiateLike();

        // Exécuter le callback si défini
        if (typeof callback === "function") {
            callback();
        }
    }
}
