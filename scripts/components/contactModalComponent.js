class ContactModal{
    constructor(){
        this.modalBg = document.querySelector(".contact-bg");
        this.modalContent = document.querySelector(".contact-modal");

        this.mainPage = document.querySelector("main");

        this.openContactButton = document.querySelector(".contact-button");
        this.openContactButton.addEventListener("click", ()=>{this.openModal()});
        this.closeModalButton = document.querySelector(".contact-modal__close");
        this.closeModalButton.addEventListener("click", ()=>{this.closeModal()});
    }

    openModal(){
        this.modalBg.style.display = "block";

        this.mainPage.style.position = "fixed";
        this.mainPage.style.top = "0";
    }

    closeModal(){
        this.modalBg.style.display = "none";

        this.mainPage.style.position = "";
        this.mainPage.style.top = "";
    }


}