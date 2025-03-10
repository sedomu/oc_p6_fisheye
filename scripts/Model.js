/**
 * Manages data retrieval and sorting for photographers and media
 * @class Model
 * @property {Object|null} data - Cached JSON data
 */
class Model {
    /**
     * Initialize empty data cache
     */
    constructor() {
        this.data = null;
    }

    /**
     * Fetch and cache JSON data
     * @async
     * @returns {Promise<Object>} Parsed JSON data
     */
    async getData() {
        if (this.data === null) {
            const response = await fetch("data/photographers.json");
            this.data = await response.json();
        }
        return this.data;
    }

    /**
     * Get list of photographers
     * @async
     * @returns {Promise<Array>} Photographer objects
     */
    async getPhotographers() {
        const data = await this.getData();
        return data.photographers;
    }

    /**
     * Sort media by specified method
     * @async
     * @param {string} sortMethod - Sorting criteria
     * @returns {Promise<Array>} Sorted media array
     */
    async getMedias(sortMethod) {
        const data = await this.getData();

        switch (sortMethod) {
            case "popularity":
                return data.media.sort((a, b) => b.likes - a.likes);
            case "date":
                return data.media.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
            case "title":
                return data.media.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return data.media.sort((a, b) => b.likes - a.likes);
        }
    }

    /**
     * Retrieve photographer details
     * @async
     * @param {number} [photographerId] - Photographer's ID
     * @returns {Promise<Object>} Photographer profile data
     */
    async getPhotographerDetails(photographerId) {
        const data = await this.getPhotographers();

        if (photographerId === undefined) {
            return data;
        }

        let photographerInfo = {};

        for (let i = 0; i < data.length; i++) {
            if (data[i].id === parseInt(photographerId)) {
                photographerInfo = data[i];
            }
        }

        return photographerInfo;
    }

    /**
     * Get media for specific photographer
     * @async
     * @param {number} photographerId - Photographer's ID
     * @param {string} sortMethod - Sorting method
     * @returns {Promise<Array>} Photographer's media
     */
    async getPhotographerProfileContent(photographerId, sortMethod) {
        const data = await this.getMedias(sortMethod);
        let mediaHtmlTags = [];

        for (let i = 0; i < data.length; i++) {
            if (data[i].photographerId === parseInt(photographerId)) {
                mediaHtmlTags.push(data[i]);
            }
        }

        return mediaHtmlTags;
    }
}