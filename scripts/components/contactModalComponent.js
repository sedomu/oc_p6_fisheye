class ContactModal {
    constructor() {
        this.modalState = false;
        this.modalBg = document.querySelector(".contact-bg");
        this.modalContent = document.querySelector(".contact-modal");
        this.mainPageHeader = document.querySelector("body > header");
        this.mainPage = document.querySelector("main");
        this.closeModalButton = document.querySelector(".contact-modal__close");
        this.closeModalButton.addEventListener("click", () => {
            this.closeModal()
        });

        this.sendFormButton = document.querySelector(".contact_button");
        this.sendFormButton.addEventListener("click", (e) => {
            this.sendForm(e)
        });

        document.addEventListener("keyup", (e) => {
            if (this.modalState && e.key === "Escape") {
                this.closeModal();
            }
        })

        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("contact-button")) {
                this.openModal();
            }
        })

        // form control (valid e-mail + message >1char.)
        // names not required (rgpd compliance - it's not necessary for the functionnality)
        this.regexEmail = new RegExp("^[a-zA-Z0-9\\-_.]+@[a-zA-Z0-9\\-_.]+\\.[a-z]{2,}$");
        this.regexText = new RegExp("^.+$");

        this.inputEmail = document.getElementById("email");
        this.inputMsg = document.getElementById("message");
        this.inputSendBtn = document.querySelector(".contact_button");

        this.inputEmail.addEventListener("blur", (e) => {
            this.fieldValidation(e)
        });
        this.inputMsg.addEventListener("blur", (e) => {
            this.fieldValidation(e)
        });

        this.requiredInputs = [this.inputEmail, this.inputMsg];
        let i = 0;
        while (i < this.requiredInputs.length) {
            this.requiredInputs[i].addEventListener("blur", () => {
                this.formValidation()
            });
            i++;
        }
    }

    openModal() {
        this.modalBg.style.display = "block";

        this.mainPageHeader.ariaHidden = "true";
        this.mainPage.style.position = "fixed";
        this.mainPage.style.top = "90px";
        this.mainPage.ariaHidden = true;

        this.modalState = true;
        this.modalContent.ariaHidden = false;

        this.closeModalButton.focus();
    }

    closeModal() {
        this.modalBg.style.display = "none";

        this.mainPage.style.position = "";
        this.mainPage.style.top = "";
        this.mainPage.ariaHidden = false;

        this.modalState = false;
        this.modalContent.ariaHidden = true;
    }

    fieldTest(event) {
        let result;

        switch (event.target.id) {
            case ("email"):
                result = this.regexEmail.test(event.target.value);
                break;
            case ("message"):
                result = this.regexText.test(event.target.value);
                break;
            default:
                result = false;
                break;
        }

        return result;
    }

    fieldValidation(event) {
        event.target.classList.add("modified");
        if (this.fieldTest(event)) {
            event.target.classList.remove("inputError");
        } else {
            event.target.classList.add("inputError");
        }
    }

    formValidation() {
        let i = 0;
        let countValid = 0;
        while (i < this.requiredInputs.length) {
            if (this.requiredInputs[i].classList.contains("inputError") === false &&
                this.requiredInputs[i].classList.contains("modified") === true) {
                countValid++;
            }
            i++;
        }
        if (countValid === i) {
            this.inputSendBtn.removeAttribute("disabled");
        } else {
            this.inputSendBtn.setAttribute("disabled", "");
        }
    }

    sendForm(e) {
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
        this.inputSendBtn.setAttribute("disabled", "true");

        // closing form
        this.closeModal();
    }
}