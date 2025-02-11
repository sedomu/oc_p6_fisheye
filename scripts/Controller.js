// console.log("Controller.js est correctement chargé!");

class Controller{
    constructor(photographerId){
        this.photographerId = photographerId;
    }

    async displayPhotographersPage(){
        const model = new Model();
        const photographers = await model.getPhotographers();

        const vue = new listPhotographersVue();
        await vue.displayPhotographers(photographers);
    }

    async displayPhotographerProfile(){
        const model = new Model();
        const allPhotographers = await model.getPhotographers();
        const allMedia = await model.getMedia();

        // filter arrays
        const photographer = model.filterByPhotographer(allPhotographers, this.photographerId);
        const media = model.filterByPhotographer(allMedia, this.photographerId)

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
}