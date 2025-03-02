class ContactModal{
    constructor(){
        this.modalBg = document.querySelector(".contact-bg");
        this.openContactButton = document.querySelector(".contact-button");
        this.openContactButton.addEventListener("click", ()=>{this.openModal()});
        this.closeModalButton = document.querySelector(".contact-modal__close");
        this.closeModalButton.addEventListener("click", ()=>{this.closeModal()});

    }

    openModal(){
        this.modalBg.style.display = "block";
    }

    closeModal(){
        this.modalBg.style.display = "none";
    }


}