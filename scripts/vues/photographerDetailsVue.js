class photographerDetails {
    constructor(photographer, media) {
        this.photographer = photographer; //tableau de longueur 1 contenant 1 objet contenant le photographe
        this.media = media; //tableau contenant plusieurs objets représentant les media du photographe
    }

    displayPhotographerDetails() {
        // preparing data
        const name = this.photographer[0].name;
        const location = this.photographer[0].city + ", " + this.photographer[0].country;
        const tagline = this.photographer[0].tagline;
        const profileImg = "./assets/photographers/" + this.photographer[0].portrait;

        // creating element
        document.querySelector(".photograph-header").innerHTML = `
            <div>
                <h1 class="name">${name}</h1>
                <p class="location">${location}</p>
                <p class="tagline">${tagline}</p>
            </div>
            <div class="contact_photographer"><button class="contact_button">Contactez-moi</button></div>
            <div class="photographer__profilePic">
                <div class="photographer__profilePic--frame">
                    <img src=${profileImg} alt="Image de profil du photographe">
                </div>    
            </div>
        `
    }

    displayPhoto(photo){
        const photographerPortfolio = document.querySelector(".photographer-portfolio");
        const article = document.createElement("article");
        article.classList.add("media-card");
        article.innerHTML = `
            <img alt="${photo.title}" src="./assets/photos/${photo.image}">
            <div class="media-card__txt">
                <p>${photo.title}</p>
                <p class="media-card__like-counter">${photo.likes}</p>
            </div>`
        photographerPortfolio.appendChild(article);
    }

    displayVideo(video){
        const photographerPortfolio = document.querySelector(".photographer-portfolio");
        const article = document.createElement("article");
        article.classList.add("media-card");
        article.innerHTML = `
            <video src="./assets/photos/${video.video}"></video>
            <div class="media-card__txt">
                <p>${video.title}</p>
                <p class="media-card__like-counter">${video.likes}</p>
            </div>`
        photographerPortfolio.appendChild(article);
    }

    // displayPhotographerMedia(){
    //     const photographerPortfolio = document.querySelector(".photographer-portfolio");
    //
    //     for (let i = 0; i < this.media.length; i++) {
    //         const article = document.createElement("article");
    //         article.classList.add("media-card");
    //
    //         let mediaLink = "";
    //
    //
    //         //########################## À sortir de la méthode pour construire un Factory Pattern
    //         // Ici, on va appeler une factory qui va réaliser le if. Celui-ci appellera l'une au l'autre des méthodes
    //         // en fonction du type de données ou renvoyer l'erreur (type de données inconnu).
    //         // Je vais alors devoir lui envoyer l'objet media complet (sorti de la liste)
    //         // Si MVC --> la factory sera un Controller (Vue -X- Model)
    //         // Sauf que la Vue ne devrait pas appeler ses propres méthodes?
    //         if (this.media[i].image){
    //             mediaLink = `<img alt="${this.media[i].title}" src="./assets/photos/${this.media[i].image}">`
    //         } else if (this.media[i].video){
    //             mediaLink = `<video src="./assets/photos/${this.media[i].video}"></video>`
    //         } else {
    //             console.log("media type not supported");
    //         }
    //
    //         // console.log(mediaLink);
    //
    //         article.innerHTML = `
    //             ${mediaLink}
    //             <div class="media-card__txt">
    //                 <p>${this.media[i].title}</p>
    //                 <p class="media-card__like-counter">${this.media[i].likes}</p>
    //             </div>
    //         `
    //
    //         photographerPortfolio.appendChild(article);
    //     }

        // console.log(this.media.length);
        // console.log(media[0]);
        //
        // for (let i = 0; i < media.length; i++) {
        //     console.log(media[item]);
        // }
        // console.log(`je retourne bien les ${this.media.length} médias du photographe : ${this.media[0].photographerId}`);
    // }
}