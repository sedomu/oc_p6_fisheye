/**
 * Manages the display and interactions for a photographer's profile page.
 * Handles profile information, media rendering, and like interactions.
 *
 * @class photographerDetails
 * @property {Object} photographer - The photographer's profile data.
 * @property {Array<Object>} medias - The photographer's media content.
 */
class photographerDetails {
    /**
     * @param {Object} photographer - The photographer's profile information.
     * @param {Array<Object>} medias - Array of media objects for the photographer.
     */
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;

        document.title = "Fisheye - " + this.photographer.name;
        document.querySelector(".contact-modal > header > h2").innerHTML = `Contactez-moi <br>${this.photographer.name}`;
    }

    /**
     * Renders the photographer's profile section.
     *
     * @returns {void}
     */
    displayPhotographerDetails() {
        const { name, city, country, tagline, portrait } = this.photographer;
        const profileImg = `./assets/photographers/${portrait}`;
        document.querySelector(".photograph-header").innerHTML = `
            <div>
                <h1 class="name">${name}</h1>
                <p class="location">${city}, ${country}</p>
                <p class="tagline">${tagline}</p>
            </div>
            <div class="contact_photographer"><button class="contact-button" aria-description="Contact Me">Contactez-moi</button></div>
            <div class="photographer__profilePic">
                <div class="photographer__profilePic--frame">
                    <img src="${profileImg}" alt="${name}">
                </div>
            </div>
        `;
    }

    /**
     * Generates HTML for either an image or video media element.
     *
     * @param {Object} media - The media object containing either an image or video.
     * @param {number} eNumber - index used as a html attribute to recognise it in the media array
     * @param {string} [media.image] - The image filename (if applicable).
     * @param {string} [media.video] - The video filename (if applicable).
     * @returns {string} The HTML string for the media.
     * @throws {Error} If the media type is unsupported.
     */
    displayPhotographerMediaFactory(media, eNumber) {
        if (media.image) {
            return `<img src="./assets/photos/${media.image}" class="media-card__media-object" alt="${media.title}" title="${media.title}" tabindex="0" e-number="${eNumber}">`;
        } else if (media.video) {
            return `<video src="./assets/photos/${media.video}" class="media-card__media-object" title="${media.title}" tabindex="0" e-number="${eNumber}"></video>`;
        } else {
            throw new Error("Unknown media type");
        }
    }

    /**
     * Renders a single media card in the photographer's portfolio.
     *
     * @param {Object} media - Media object with HTML and metadata.
     * @param {string} media.mediaHtmlCode - HTML code for media.
     * @param {string} media.title - Media title.
     * @param {number} media.likes - Number of likes.
     * @returns {void}
     */
    displayPhotographerMedia(media) {
        const photographerPortfolio = document.querySelector(".photographer-portfolio");
        const article = document.createElement("article");
        article.classList.add("media-card");
        article.innerHTML = `
            <div class="media-card__media">${media.mediaHtmlCode}</div>
            <div class="media-card__txt">
                <p>${media.title}</p>
                <p class="media-card__like-counter" updated="false" tabindex="0" aria-label="likes">${media.likes}</p>
            </div>`;
        photographerPortfolio.appendChild(article);
    }

    /**
     * Clears existing media content and displays new media content.
     *
     * @returns {void}
     */
    displayPhotographerContent() {
        const photographerPortfolio = document.querySelector(".photographer-portfolio");
        photographerPortfolio.innerHTML = ""; // Reset content before displaying new
        this.medias.forEach((media) => this.displayPhotographerMedia(media));
    }

    /**
     * Assembles and displays all profile components: details, media content, and likes.
     *
     * @returns {void}
     */
    displayPhotographerDetailsAssembler() {
        this.medias.forEach((media, i) => media.mediaHtmlCode = this.displayPhotographerMediaFactory(media, i));
        this.displayPhotographerDetails();
        this.displayPhotographerContent();
    }
}
