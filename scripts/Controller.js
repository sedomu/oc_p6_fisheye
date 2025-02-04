class Controller{
    async displayPhotographersPage(){
        const model = new Model();
        const photographers = await model.getPhotographers();

        const vue = new listPhotographersVue();
        vue.displayPhotographers(photographers);
    }
}


