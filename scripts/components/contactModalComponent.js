class ContactModal{
    constructor(){
        this.modalState = false;

        this.modalBg = document.querySelector(".contact-bg");
        this.modalContent = document.querySelector(".contact-modal");

        this.mainPageHeader = document.querySelector("body > header");
        this.mainPage = document.querySelector("main");

        this.openContactButton = document.querySelector(".contact-button");
        this.openContactButton.addEventListener("click", ()=>{this.openModal()});
        this.closeModalButton = document.querySelector(".contact-modal__close");
        this.closeModalButton.addEventListener("click", ()=>{this.closeModal()});

        this.sendFormButton = document.querySelector(".contact_button");
        this.sendFormButton.addEventListener("click", (e)=>{this.sendForm(e)});

        document.addEventListener("keyup", (e)=>{
            if (this.modalState && e.key === "Escape") {
                this.closeModal();
            }
        })
    }

    openModal(){
        this.modalBg.style.display = "block";

        this.mainPageHeader.ariaHidden = "true";
        this.mainPage.style.position = "fixed";
        this.mainPage.style.top = "90px";
        this.mainPage.ariaHidden = true;

        this.modalState = true;
        this.modalContent.ariaHidden = false;

        this.closeModalButton.focus();
    }

    closeModal(){
        this.modalBg.style.display = "none";

        this.mainPage.style.position = "";
        this.mainPage.style.top = "";
        this.mainPage.ariaHidden = false;

        this.modalState = false;
        this.modalContent.ariaHidden = true;
    }

    sendForm(e){
        // prevent form's default behaviour
        e.preventDefault();

        // forms elements as variables
        let firstname = document.getElementById("firstname");
        let lastname = document.getElementById("lastname");
        let email = document.getElementById("email");
        let message = document.getElementById("message");

        // preparing return values from form
        const visitorName = "Sender : " + firstname.value + " " + lastname.value;
        const visitorEmail = "E-mail address : " + email.value;
        const visitorMsg = "Message : " + message.value;

        // displaying return to the console
        console.log(visitorName);
        console.log(visitorEmail);
        console.log(visitorMsg);

        // resetting form
        firstname.value = "";
        lastname.value = "";
        email.value = "";
        message.value = "";

        // closing form
        this.closeModal();
    }
}