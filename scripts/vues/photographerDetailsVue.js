class photographerDetails {
    constructor(photographer, medias) {
        this.photographer = photographer; //1 objet représentant le photographe
        this.medias = medias; //tableau contenant les informations relatives aux médias
    }

    displayPhotographerDetails() {
        // preparing data
        const name = this.photographer.name;
        const location = this.photographer.city + ", " + this.photographer.country;
        const tagline = this.photographer.tagline;
        const profileImg = "./assets/photographers/" + this.photographer.portrait;

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

    displayPhotographerMedia(media){
        const photographerPortfolio = document.querySelector(".photographer-portfolio");
        const article = document.createElement("article");
        article.classList.add("media-card");
        article.innerHTML = `
            ${media.mediaHtmlCode}
            <div class="media-card__txt">
                <p>${media.title}</p>
                <p class="media-card__like-counter" updated="false">${media.likes}</p>
            </div>`
        photographerPortfolio.appendChild(article);
    }

    displayPhotographerContent() {
        //initialising content (after sorting)
        const photographerPortfolio = document.querySelector(".photographer-portfolio");
        photographerPortfolio.innerHTML = ``

        //creating elements
        for (let i = 0; i < this.medias.length; i++) {
            this.displayPhotographerMedia(this.medias[i]);
        }
    }

    displayPhotographerDetailsAssembler(){
        for (let i = 0; i < this.medias.length; i++) {
            this.medias[i].mediaHtmlCode = this.displayPhotographerMediaFactory(this.medias[i]); //4
        }

        this.displayPhotographerDetails();
        this.displayPhotographerContent();
        this.initiateLike();
    }
}