/**
 * Handles the display and interactions of a photographer's profile page.
 *
 * @class photographerDetails
 * @property {Object} photographer - The photographer's profile data.
 * @property {Array<Object>} medias - The photographer's media content.
 * @method displayPhotographerDetails - Renders the photographer's profile section.
 * @method displayPhotographerMediaFactory - Generates HTML for images or videos.
 * @method initiateLike - Adds event listeners to handle media likes.
 * @method displayPhotographerMedia - Renders an individual media card.
 * @method displayPhotographerContent - Displays all media content in the portfolio.
 * @method displayPhotographerDetailsAssembler - Assembles all components on the profile page.
 */
class photographerDetails {
    /**
     * Creates an instance of photographerDetails.
     *
     * @param {Object} photographer - The photographer's profile information.
     * @param {Array<Object>} medias - An array containing media objects associated with the photographer.
     */
    constructor(photographer, medias) {
        this.photographer = photographer; // Single object representing the photographer
        this.medias = medias; // Array containing media information
    }

    /**
     * Displays the photographer's details in the profile section.
     *
     * @returns {void}
     */
    displayPhotographerDetails() {
        // Preparing data
        const name = this.photographer.name;
        const location = this.photographer.city + ", " + this.photographer.country;
        const tagline = this.photographer.tagline;
        const profileImg = "./assets/photographers/" + this.photographer.portrait;

        // Creating and inserting HTML content
        document.querySelector(".photograph-header").innerHTML = `
            <div>
                <h1 class="name">${name}</h1>
                <p class="location">${location}</p>
                <p class="tagline">${tagline}</p>
            </div>
            <div class="contact_photographer"><button class="contact_button">Contactez-moi</button></div>
            <div class="photographer__profilePic">
                <div class="photographer__profilePic--frame">
                    <img src="${profileImg}" alt="Portrait de ${name}">
                </div>    
            </div>
        `;
    }

    /**
     * Generates the appropriate HTML code for an image or video.
     *
     * @param {Object} media - The media object containing either an image or video.
     * @param {string} [media.image] - The image file name (if applicable).
     * @param {string} [media.video] - The video file name (if applicable).
     * @returns {string} The HTML string for the media.
     * @throws {Error} If the media type is unknown.
     */
    displayPhotographerMediaFactory(media) {
        if (media.image !== undefined) {
            return `<img alt="${media.title}" src="./assets/photos/${media.image}">`;
        } else if (media.video !== undefined) {
            return `<video src="./assets/photos/${media.video}"></video>`;
        } else {
            throw new Error("Unknown media type");
        }
    }

    /**
     * Initializes like button interactions by adding event listeners to each like counter.
     *
     * @returns {void}
     */
    initiateLike() {
        const likeButtons = document.querySelectorAll(".media-card__like-counter");

        for (const likeButton of likeButtons) {
            likeButton.addEventListener("click", (e) => {
                const updatedAttribute = e.target.attributes.getNamedItem("updated");
                if (updatedAttribute.value === "true") {
                    e.target.setAttribute("updated", "false");
                    e.target.innerText = parseInt(e.target.innerText) - 1;
                } else {
                    e.target.setAttribute("updated", "true");
                    e.target.innerText = parseInt(e.target.innerText) + 1;
                }
            });
        }
    }

    /**
     * Creates and appends an individual media card to the photographer's portfolio.
     *
     * @param {Object} media - A media object containing HTML representation and metadata.
     * @param {string} media.mediaHtmlCode - The generated HTML for the media.
     * @param {string} media.title - The title of the media.
     * @param {number} media.likes - The number of likes for the media.
     * @returns {void}
     */
    displayPhotographerMedia(media) {
        const photographerPortfolio = document.querySelector(".photographer-portfolio");
        const article = document.createElement("article");
        article.classList.add("media-card");
        article.innerHTML = `
            ${media.mediaHtmlCode}
            <div class="media-card__txt">
                <p>${media.title}</p>
                <p class="media-card__like-counter" updated="false">${media.likes}</p>
            </div>`;
        photographerPortfolio.appendChild(article);
    }

    /**
     * Clears and displays all media content for the photographer.
     *
     * @returns {void}
     */
    displayPhotographerContent() {
        const photographerPortfolio = document.querySelector(".photographer-portfolio");
        photographerPortfolio.innerHTML = ""; // Reset portfolio before inserting sorted content

        for (let i = 0; i < this.medias.length; i++) {
            this.displayPhotographerMedia(this.medias[i]);
        }
    }

    /**
     * Assembles all elements of the photographer's page:
     * - Generates media HTML
     * - Displays profile information
     * - Renders media content
     * - Initializes like interactions
     *
     * @returns {void}
     */
    displayPhotographerDetailsAssembler() {
        for (let i = 0; i < this.medias.length; i++) {
            this.medias[i].mediaHtmlCode = this.displayPhotographerMediaFactory(this.medias[i]);
        }

        this.displayPhotographerDetails();
        this.displayPhotographerContent();
        this.initiateLike();
    }
}