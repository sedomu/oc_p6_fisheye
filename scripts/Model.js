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

    async getMedia(){
        const data = await this.getData();
        return data.media;
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

    async getPhotographerProfileContent(photographerId){
        const data = await this.getMedia();
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

