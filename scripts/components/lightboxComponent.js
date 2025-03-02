class Lightbox {
    constructor() {
        this.element = document.querySelector('.lightbox-bg');
        this.close = document.querySelector('.lightbox-modal__close');
        this.viewer = document.querySelector('.lightbox-modal__viewer');
        this.previous = document.querySelector('.lightbox-modal__previous');
        this.next = document.querySelector('.lightbox-modal__next');
        this.previousE = null;
        this.nextE = null;
        this.heading = document.querySelector('.lightbox-modal__title');
        // this.close.addEventListener('click', this.closeModal.bind(this));
        this.close.addEventListener('click', () => {this.closeModal()});
    }

    closeModal() {
        this.element.style.display = 'none';
    }

    openModal() {
        this.element.style.display = 'block';
    }

    displayOpenMedia(media) {
        this.viewer.replaceChild(media, this.viewer.firstChild);
        this.heading.innerText = media.title;
        console.log(media.tagName.toLowerCase());
        this.openModal();
    }

    handleControls(i, medias){
        if (this.previousE && this.nextE){
            console.log("coucou toi le not null");
            this.previous.removeEventListener('click', this.previousE);
            this.next.removeEventListener('click', this.nextE);
        }

        this.previousE = () => {this.handleOpenMedia(i > 0 ? i-1 : medias.length - 1, medias);};
        this.nextE = () => {this.handleOpenMedia(i < medias.length - 1 ? i+1 : 0, medias);};
        this.previous.addEventListener('click', this.previousE);
        this.next.addEventListener('click', this.nextE);
    }

    handleOpenMedia(i, medias){
        console.log(i, medias);
        console.log(medias[i].tagName.toLowerCase());
        console.log(medias[i].src);

        const media = document.createElement(medias[i].tagName);
        if (media.tagName === "VIDEO"){
            media.controls = "controls";
        }
        media.src = medias[i].src;
        media.title = medias[i].title;

        console.log(media);
        this.displayOpenMedia(media);

        this.handleControls(i, medias);


        // console.log("media 0:")
        // console.log(medias[0]);
        //
        // const media = document.createElement(e.target.tagName);
        // media.src = e.target.src;
        //
        // this.displayOpenMedia(media);
        //
        // const previousE = medias[i-1];
        // const nextE = medias[i+1];
        //
        // this.previous.addEventListener('click', () => {this.displayOpenMedia(previousE, i-1, medias);});
        // this.next.addEventListener('click', () => {this.displayOpenMedia(nextE, i+1, medias);});
    }

    openMedia(){
        const medias = document.querySelectorAll(".media-card__media > *");

        for (let i = 0; i < medias.length; i++) {
            medias[i].addEventListener("click", () => {this.handleOpenMedia(i, medias)})
        }
    }
}