class Lightbox {
    constructor() {
        this.modalState = false;

        this.element = document.querySelector('.lightbox-bg');
        this.close = document.querySelector('.lightbox-modal__close');
        this.viewer = document.querySelector('.lightbox-modal__viewer');

        this.previous = document.querySelector('.lightbox-modal__previous');
        this.previous.addEventListener('click', () => {this.handlePreviousMedia()});
        this.next = document.querySelector('.lightbox-modal__next');
        this.next.addEventListener('click', () => {this.handleNextMedia()});


        // this.previousE = null;
        // this.nextE = null;

        this.heading = document.querySelector('.lightbox-modal__title');
        this.close.addEventListener('click', () => {this.closeModal()});
        this.body = document.querySelector("body");

        this.currentItem = null;
        this.medias = document.querySelectorAll(".media-card__media > *");


        // Keyboard controls
        document.addEventListener('keyup', (e) => {
            if (this.modalState && e.key === 'ArrowLeft'){
                this.handlePreviousMedia();
            } else if (this.modalState && e.key === 'ArrowRight'){
                this.handleNextMedia();
            } else if (this.modalState && e.key === 'Escape'){
                this.closeModal();
            }
        })

        // Keyboard navigation (photographer's page)
        document.addEventListener("keyup", (e) => {
            if ((!this.modalState && e.key === "Enter" && e.target.title) || (!this.modalState && e.key === " ")) {
                if (e.target.tagName === "IMG" || e.target.tagName === "VIDEO"){
                    this.handleOpenMedia(Number(e.target.getAttribute("e-number")));
                }
            }
        })

    }

    closeModal() {
        this.element.style.display = 'none';
        this.body.style.overflowY = 'auto';
        this.modalState = false;
    }

    openModal() {
        this.element.style.display = 'block';
        this.body.style.overflowY = 'hidden';
        this.modalState = true;
    }

    displayOpenMedia(media) {

        console.log(media);

        this.viewer.replaceChild(media, this.viewer.firstChild);
        this.heading.innerText = media.title;
        this.openModal();
    }

    handleControls(i, medias){
        // if (this.previousE && this.nextE){
        //     this.previous.removeEventListener('click', this.previousE);
        //     document.removeEventListener("keyup", (e) => {
        //         if (e.key === "ArrowLeft"){
        //             this.previousE();
        //         } else if (e.key === "ArrowRight"){
        //             this.nextE()
        //         }
        //
        //     })
        // }

        // this.previousE = () => {this.handleOpenMedia(i > 0 ? i-1 : medias.length - 1, medias);};
        // this.nextE = () => {this.handleOpenMedia(i < medias.length - 1 ? i+1 : 0, medias);};
        //
        // // mouse navigation
        // this.previous.addEventListener('click', this.previousE);
        // this.next.addEventListener('click', this.nextE);
        // // keyboard navigation
        // document.addEventListener("keyup", (e) => {
        //     if (e.key === "ArrowLeft"){
        //         this.previousE();
        //     } else if (e.key === "ArrowRight"){
        //         this.nextE()
        //     }
        //
        // })
    }

    handleOpenMedia(i){
        this.currentItem = i;

        console.log(this.currentItem);
        console.log(this.medias);

        const media = document.createElement(this.medias[this.currentItem].tagName);
        if (media.tagName === "VIDEO"){
            media.controls = "controls";
        }
        media.src = this.medias[this.currentItem].src;
        media.title = this.medias[this.currentItem].title;

        this.displayOpenMedia(media);
    }

    handlePreviousMedia(){
        this.handleOpenMedia((this.currentItem === 0) ? this.medias.length - 1 : this.currentItem - 1);
    }

    handleNextMedia(){
        this.handleOpenMedia((this.currentItem === this.medias.length - 1) ? 0 : this.currentItem + 1);
    }

    openMedia(){
        for (let i = 0; i < this.medias.length; i++) {
            this.medias[i].addEventListener("click", () => {this.handleOpenMedia(i)})
        }
    }
}