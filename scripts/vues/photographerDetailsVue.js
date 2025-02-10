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
            <div><button>Contactez-moi</button></div>
            <div><img src=${profileImg} style="max-width: 100px" alt="Image de profil du photographe"></div>
        `
    }

    displayPhotographerMedia(){
        const photographerPortfolio = document.querySelector(".photographer-portfolio");

        for (let i = 0; i < this.media.length; i++) {
            const article = document.createElement("article");
            article.classList.add("media-card");

            let mediaLink = "";

            if (this.media[i].image){
                mediaLink = `<img alt="${this.media[i].title}" src="./assets/photos/${this.media[i].image}">`
            } else if (this.media[i].video){
                mediaLink = `<video" src="./assets/photos/${this.media[i].video}">`
            } else {
                console.log("media type not supported");
            }

            console.log(mediaLink);

            article.innerHTML = `
                ${mediaLink}
                <div class="media-card__txt">
                    <p>${this.media[i].title}</p>
                    <p>${this.media[i].likes} ❤️</p>
                </div>
            `

            photographerPortfolio.appendChild(article);
        }

        console.log(this.media.length);
        // console.log(media[0]);
        //
        // for (let i = 0; i < media.length; i++) {
        //     console.log(media[item]);
        // }
        console.log(`je retourne bien les ${this.media.length} médias du photographe : ${this.media[0].photographerId}`);
    }
}