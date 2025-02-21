class Controller{
    async displayPhotographersPage(){
        const model = new Model();
        const photographers = await model.getPhotographers();
        const vue = new listPhotographersVue();
        await vue.displayPhotographers(photographers);
    }

    async displayPhotographerProfile(sortMethod){
        const photographerId = Services.getParam("id");

        const model = new Model();
        const header = await model.getPhotographerProfileHeader(photographerId); // return data as an object send it to vue
        const medias = await model.getPhotographerProfileContent(photographerId, sortMethod); // return array of html tags, send it to view

        const vue = new photographerDetails(header, medias);
        for (let i = 0; i < medias.length; i++){
            medias[i].mediaHtmlCode = vue.displayPhotographerMediaFactory(medias[i]);
        }

        vue.displayPhotographerDetails();
        vue.displayPhotographerContent();
        vue.initiateLike();

        //sort - MAIS JE PENSE QU'IL SE LANCE LUI MEME 1-2-4-8-etc.
        const mediasSorter = new PhotographerMediasSorter();
        mediasSorter.sortMedias();

    }
}