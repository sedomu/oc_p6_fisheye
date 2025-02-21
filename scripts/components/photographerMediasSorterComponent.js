class PhotographerMediasSorter {
    constructor(controller) {
        this.controller = controller; // Réutilise toujours le même Controller
        this.handleSortChange = this.handleSortChange.bind(this); // Garde le bon contexte
    }

    handleSortChange(e) {
        let sortMethod = e.target.value;

        // Supprimer les médias affichés
        const portfolio = document.querySelector('.photographer-portfolio');
        while (portfolio.firstChild) {
            portfolio.removeChild(portfolio.firstChild);
        }

        // Appeler la fonction qui affiche les médias triés
        this.controller.displayPhotographerProfile(sortMethod, this.controller.initMediasSorter.bind(this.controller));
    }

    sortMedias() {
        const sorter = document.querySelector('#mediasSorter');

        // Supprime l'ancien écouteur avant d'en ajouter un nouveau
        sorter.removeEventListener('change', this.handleSortChange);
        sorter.addEventListener('change', this.handleSortChange);
    }
}
