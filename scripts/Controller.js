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

    async displayPhotographerProfile(){
        // using search parameter to get the photographer's id
        const url = window.location.search;
        const urlParams = new URLSearchParams(url);
        const photographerId = urlParams.get('id');

        const model = new Model();
        const header = await model.getPhotographerProfileHeader(photographerId); // return data as an object send it to vue
        const medias = await model.getPhotographerProfileContent(photographerId); // return array of html tags, send it to view

        console.log(header);
        console.log(medias);

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



    }
       //  const model = new Model();
       //  const allPhotographers = await model.getPhotographers();
       //  const allMedia = await model.getMedia();
       //
       //  // filter arrays
       //  const photographer = model.filterByPhotographer(allPhotographers, photographerId);
       //  const media = model.filterByPhotographer(allMedia, photographerId)
       //
       // // vue for photographer's details
       //  const vue = new photographerDetails(photographer, media);
       //  vue.displayPhotographerDetails();
       //
       //  // vue for photographer's medias via a Factory Pattern
       //  this.displayPhotographerMediaFactory(media);
    // }

    // displayPhotographerMediaFactory(media){
    //     const vue = new photographerDetails();
    //     for (let item of media){
    //         if (item.image !== undefined){
    //             vue.displayPhoto(item);
    //         } else if (item.video !== undefined){
    //             vue.displayVideo(item);
    //         } else {
    //             throw "Unknown data format for item.id";
    //         }
    //     }
    // }

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