/**
 * Manages the popularity bar, displaying photographer's likes and price.
 *
 * @class PopularityBar
 */
class PopularityBar {
    /**
     * Initializes the popularity bar with the photographer's ID.
     * Sets up event listeners for like buttons and keyboard controls.
     *
     * @param {number} photographerId - The ID of the photographer.
     */
    constructor(photographerId) {
        this.photographerId = photographerId;
        this.deltaLikes = 0;
        this.keyboardControls = this.keyboardControls.bind(this);

        document.addEventListener("keyup", this.keyboardControls);
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("media-card__like-counter")) {
                this.updateLikes(e);
            }
        });
    }

    /**
     * Handles keyboard events (Enter/Space) to toggle media likes.
     *
     * @param {KeyboardEvent} e - The keyboard event.
     * @returns {void}
     */
    keyboardControls(e) {
        if ((e.target.className === "media-card__like-counter") && (e.key === "Enter" || e.key === " ")) {
            this.updateLikes(e);
        }
    }

    /**
     * Updates the like count on a media card and adjusts the popularity bar.
     *
     * @param {Event} e - The click event.
     * @returns {void}
     */
    updateLikes(e) {
        const updatedAttribute = e.target.attributes.getNamedItem("updated");

        if (updatedAttribute.value === "true") {
            e.target.setAttribute("updated", "false");
            e.target.innerText = parseInt(e.target.innerText) - 1;
            this.displayPopularityBar(-1);
        } else {
            e.target.setAttribute("updated", "true");
            e.target.innerText = parseInt(e.target.innerText) + 1;
            this.displayPopularityBar(+1);
        }
    }

    /**
     * Fetches photographer's price and total likes from the model.
     *
     * @returns {Promise<Object>} - An object containing price and total likes.
     */
    async getPopularityData() {
        const model = new Model();
        const photographer = await model.getPhotographerDetails(this.photographerId);
        const medias = await model.getPhotographerProfileContent(this.photographerId, "default");

        let likes = 0;
        for (const media of medias) {
            likes += media.likes;
        }

        return {
            price: photographer.price,
            likes: likes
        }
    }

    /**
     * Updates and displays the popularity bar with the current total likes and price.
     *
     * @param {number} delta - The change in likes (+1 or -1).
     * @returns {void}
     */
    async displayPopularityBar(delta) {
        const popularityBar = document.querySelector(".popularity-bar");
        const popularityData = await this.getPopularityData();

        if (!isNaN(delta)) {
            this.deltaLikes += delta;
        }

        const totalLikes = popularityData.likes + this.deltaLikes;
        const price = popularityData.price;

        popularityBar.innerHTML = `
            <div class="popularity-bar__likes">
                <p>${totalLikes}</p>
                <img src="./assets/icons/heart_full_black.svg" alt="Heart icon">
            </div>
            <div class="popularity-bar__pricing">
                <p>${price}€/jour</p>
            </div>
        `;
    }
}
