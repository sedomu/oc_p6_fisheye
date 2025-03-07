/**
 * Class representing the popularity bar component that displays photographer's likes and price
 */
class PopularityBar {
    /**
     * Create a popularity bar
     * @param {number} photographerId - The ID of the photographer
     */
    constructor(photographerId) {
        this.photographerId = photographerId;
        this.deltaLikes = 0;

        // Keyboard navigation (photographer's page)
        document.addEventListener("keyup", (e) => {
            if (
                (e.target.className === "media-card__like-counter" && e.key === "Enter") ||
                (e.target.className === "media-card__like-counter" && e.key === " ")
            )
            {
                this.updateLikes(e)
            }
        })

        const likeButtons = document.querySelectorAll(".media-card__like-counter");

        console.log("launching updateLikes from component")

        for (let i = 0; i < likeButtons.length; i++) {
            likeButtons[i].addEventListener("click", (e) => {
                this.updateLikes(e);




    })}}

    /**
     * Sets up event listeners for like buttons and updates the popularity bar
     * when likes are added or removed
     * For development purposes only as the API will handle this
     */
    updateLikes(e){

                const updatedAttribute = e.target.attributes.getNamedItem("updated");
                const testConst = e.target;

                if (updatedAttribute.value === "true") {
                    console.log(e.target, " versus ", testConst)
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
     * Fetches photographer's price and total likes from the data model
     * @returns {Promise<Object>} Object containing price and total likes
     * @property {number} price - Photographer's daily rate
     * @property {number} likes - Total number of likes across all media
     */
    async getPopularityData(){
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
     * Updates and renders the popularity bar in the DOM
     * From json data at first load, then from updateLikes method with delta parameter
     * @param {number} delta - The change in likes (+1 or -1)
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
                <img src="./assets/icons/heart_full_black.svg" alt="Icône coeur plein">
            </div>
            <div class="popularity-bar__pricing">
                <p>${price}€/jour</p>
            </div>
        `;
    }
}