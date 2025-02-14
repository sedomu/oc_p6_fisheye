class Controller{
    async displayPhotographersPage(){
        const model = new Model();
        const photographers = await model.getPhotographers();

        const vue = new listPhotographersVue();
        await vue.displayPhotographers(photographers);
    }

    async displayPhotographerProfile(){
        // using search parameter to get the photographer's id
        const url = window.location.search;
        const urlParams = new URLSearchParams(url);
        const photographerId = urlParams.get('id');

        const model = new Model();
        const allPhotographers = await model.getPhotographers();
        const allMedia = await model.getMedia();

        // filter arrays
        const photographer = model.filterByPhotographer(allPhotographers, photographerId);
        const media = model.filterByPhotographer(allMedia, photographerId)

       // vue for photographer's details
        const vue = new photographerDetails(photographer, media);
        vue.displayPhotographerDetails();

        // vue for photographer's medias via a Factory Pattern
        this.displayPhotographerMediaFactory(media);
    }

    displayPhotographerMediaFactory(media){
        const vue = new photographerDetails();
        for (let item of media){
            if (item.image !== undefined){
                vue.displayPhoto(item);
            } else if (item.video !== undefined){
                vue.displayVideo(item);
            } else {
                throw "Unknown data format for item.id";
            }
        }
    }

    router(){
        const currentPage = window.location.pathname;

        if (currentPage.endsWith("index.html")) {
            this.displayPhotographersPage();
        } else if (currentPage.endsWith(".html")) {
            this.displayPhotographerProfile();
        }
    }
}

const controller = new Controller();
controller.router();