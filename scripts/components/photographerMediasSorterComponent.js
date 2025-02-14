class PhotographerMediasSorter {
    sortMedias(){
        const controller = new Controller();
        const sorter = document.querySelector('#mediasSorter');

        sorter.addEventListener('change', (e) => {
            const sortNumber = e.target.length;
            let sortMethod = "";

            for (let i = 0; i < sortNumber; i++) {
                if (e.target[i].selected){
                    sortMethod = e.target[i].value;
                    break;
                }
            }

            controller.displayPhotographerProfile(sortMethod);
        })
    }
}