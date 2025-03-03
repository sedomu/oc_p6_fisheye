class ContactModal{
    constructor(){
        this.modalBg = document.querySelector(".contact-bg");
        this.modalContent = document.querySelector(".contact-modal");

        this.mainPage = document.querySelector("main");

        this.openContactButton = document.querySelector(".contact-button");
        this.openContactButton.addEventListener("click", ()=>{this.openModal()});
        this.closeModalButton = document.querySelector(".contact-modal__close");
        this.closeModalButton.addEventListener("click", ()=>{this.closeModal()});

        this.sendFormButton = document.querySelector(".contact_button");
        this.sendFormButton.addEventListener("click", (e)=>{this.sendForm(e)});
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