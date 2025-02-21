function router() {
    const currentPage = window.location.pathname;
    const controller = new Controller(); // Une seule instance du Controller

    if (currentPage.endsWith("index.html")) {
        controller.displayPhotographersPage();
    } else if (currentPage.endsWith("photographer.html")) {
        controller.displayPhotographerProfile("default", controller.initMediasSorter.bind(controller));
    }
}

router();
