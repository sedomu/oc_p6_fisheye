function router(){
    const currentPage = window.location.pathname;
    const controller = new Controller();

    if (currentPage.endsWith("index.html")) {
        controller.displayPhotographersPage();
    } else if (currentPage.endsWith("photographer.html")) {
        controller.displayPhotographerProfile();
    }
}

router();