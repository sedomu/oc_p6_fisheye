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
       const photographer = allPhotographers.filter(photographer => photographer.id == this.photographerId);
       const media = allMedia.filter(photographer => photographer.photographerId == this.photographerId);

       // vue
        const vue = new photographerDetails(photographer, media);
        vue.displayPhotographerDetails();
        vue.displayPhotographerMedia()
    }
}


