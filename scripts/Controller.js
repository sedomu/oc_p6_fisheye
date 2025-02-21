class Controller{
    async displayPhotographersPage(){
        const model = new Model();
        const photographers = await model.getPhotographers();
        const vue = new listPhotographersVue();
        await vue.displayPhotographers(photographers);
    }

    displayPhotographerMediaFactory(media){
        if (media.image !== undefined){
            return `<img alt="${media.title}" src="./assets/photos/${media.image}">`;
        } else if (media.video !== undefined) {
            return `<video src="./assets/photos/${media.video}"></video>`;
        } else {
            throw new Error('Unknown media type');
        }
    }

    initiateLike() {
        //likes management
        const likeButtons = document.querySelectorAll('.media-card__like-counter');

        for (const likeButton of likeButtons){
            likeButton.addEventListener("click", (e) => {
                console.log(e.target.attributes.getNamedItem("updated"));
                if (e.target.attributes.getNamedItem("updated").value === "true") {
                    e.target.setAttribute("updated", "false");
                    e.target.innerText = (parseInt(e.target.innerText)) - 1;
                } else {
                    e.target.setAttribute("updated", "true");
                    e.target.innerText = (parseInt(e.target.innerText)) + 1;
                }
            })
        }
    }

    async displayPhotographerProfile(sortMethod){
        const photographerId = Services.getParam("id");

        const model = new Model();
        const header = await model.getPhotographerProfileHeader(photographerId); // return data as an object send it to vue

        console.log(header)
        const medias = await model.getPhotographerProfileContent(photographerId, sortMethod); // return array of html tags, send it to view

        for (let i = 0; i < medias.length; i++){
            medias[i].mediaHtmlCode = this.displayPhotographerMediaFactory(medias[i]);
        }

        console.log(medias);
    //     Et ici, on construit la page
        const vue = new photographerDetails(header, medias);
        vue.displayPhotographerDetails();
        vue.displayPhotographerContent();

        //like
        this.initiateLike();

        //sort - MAIS JE PENSE QU'IL SE LANCE LUI MEME 1-2-4-8-etc.
        const mediasSorter = new PhotographerMediasSorter();
        mediasSorter.sortMedias();

    }
}