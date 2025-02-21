class Model{
    constructor(){
        this.data = null;
    }

    /**
     * Fetches and imports data from a JSON file located at "data/photographers.json".
     *
     * @return {Promise<Object>} A promise that resolves to the parsed JSON data.
     */
    async getData(){
        if (this.data == null){
            const response = await fetch("data/photographers.json");
            this.data = await response.json();
        }
        return this.data;
    }

    async getPhotographers(){
        const data = await this.getData();
        return data.photographers;
    }

    async getMedias(sortMethod){
        const data = await this.getData();

        if (sortMethod === "popularity") {
            return data.media.sort((a, b) => a.likes - b.likes);
        } else if (sortMethod === "date"){
            return data.media.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        } else if (sortMethod === "title"){
            return data.media.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            return data.media;
        }

    }

    async getPhotographerProfileHeader(photographerId){
        const data = await this.getPhotographers();
        let photographerInfo = {};

        for (let i = 0; i < data.length; i++){
            if (data[i].id === parseInt(photographerId)){
                photographerInfo = data[i];
            }
        }

        return photographerInfo;
    }

    async getPhotographerProfileContent(photographerId, sortMethod){
        const data = await this.getMedias(sortMethod);

        console.log(data);

        let mediaHtmlTags = [];

        for (let i = 0; i < data.length; i++){
            if (data[i].photographerId === parseInt(photographerId)){
                mediaHtmlTags.push(data[i]);
            }
        }

        return mediaHtmlTags;
    }


    //
    // filterByPhotographer(data, photographerId){
    //     let array = [];
    //     for (let i = 0; i < data.length; i++){
    //         if (data[i].id === parseInt(photographerId) || data[i].photographerId === parseInt(photographerId)){
    //             array.push(data[i]);
    //         }
    //     }
    //     return array;
    // }
}

