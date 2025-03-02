class Lightbox {
    constructor() {
        this.element = document.querySelector('.lightbox-bg');
        this.close = document.querySelector('.lightbox-modal__close');
        this.viewer = document.querySelector('.lightbox-modal__viewer');
        // this.close.addEventListener('click', this.closeModal.bind(this));
        this.close.addEventListener('click', () => {this.closeModal()});
    }

    closeModal() {
        this.element.style.display = 'none';
    }

    openModal() {
        this.element.style.display = 'block';
    }

    handleOpenMedia(e){
        const media = document.createElement(e.target.tagName);
        media.src = e.target.src;
        this.viewer.replaceChild(media, this.viewer.firstChild);
        console.log(e.target.tagName.toLowerCase());
        this.openModal();
    }

    openMedia(){
        const medias = document.querySelectorAll(".media-card__media");

        for (let i = 0; i < medias.length; i++) {
            medias[i].addEventListener("click", this.handleOpenMedia.bind(this));
        }


    }
}