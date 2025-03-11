/**
 * Manages the lightbox modal for viewing media such as images and videos.
 * Handles opening, closing, and navigating between media items within the lightbox.
 *
 * @class Lightbox
 * @property {boolean} modalState - The current state of the modal (open or closed).
 * @property {HTMLElement} element - The background element for the lightbox modal.
 * @property {HTMLElement} close - The button to close the lightbox modal.
 * @property {HTMLElement} viewer - The viewer area within the modal where the media is displayed.
 * @property {HTMLElement} previous - The button to view the previous media item.
 * @property {HTMLElement} next - The button to view the next media item.
 * @property {HTMLElement} heading - The title of the media being displayed in the lightbox.
 * @property {HTMLElement} body - The body of the page, used to control scroll behavior when the modal is open.
 * @property {number} currentItem - The index of the current media item being viewed.
 * @property {NodeList} medias - A collection of media elements on the page that can be displayed in the lightbox.
 */
class Lightbox {
    /**
     * Initializes the lightbox by setting up event listeners for opening, closing, and navigation controls.
     */
    constructor() {
        this.modalState = false;

        this.element = document.querySelector('.lightbox-bg');
        this.close = document.querySelector('.lightbox-modal__close');
        this.viewer = document.querySelector('.lightbox-modal__viewer');

        this.previous = document.querySelector('.lightbox-modal__previous');
        this.previous.addEventListener('click', () => {
            this.handlePreviousMedia()
        });
        this.next = document.querySelector('.lightbox-modal__next');
        this.next.addEventListener('click', () => {
            this.handleNextMedia()
        });

        this.heading = document.querySelector('.lightbox-modal__title');
        this.close.addEventListener('click', () => {
            this.closeModal()
        });
        this.body = document.querySelector("body");

        this.currentItem = null;

        // Keyboard controls
        document.addEventListener('keyup', (e) => {
            if (this.modalState && e.key === 'ArrowLeft') {
                this.handlePreviousMedia();
            } else if (this.modalState && e.key === 'ArrowRight') {
                this.handleNextMedia();
            } else if (this.modalState && e.key === 'Escape') {
                this.closeModal();
            }
        })

        // Keyboard navigation (photographer's page)
        document.addEventListener("keyup", (e) => {
            if ((!this.modalState && e.key === "Enter" && e.target.title) || (!this.modalState && e.key === " ")) {
                if (e.target.tagName === "IMG" || e.target.tagName === "VIDEO") {
                    this.handleOpenMedia(Number(e.target.getAttribute("e-number")));
                }
            }
        })

        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("media-card__media-object")) {
                this.handleOpenMedia(e.target.getAttribute("e-number"));
            }
        })
    }

    /**
     * Closes the lightbox modal and restores page scrolling.
     */
    closeModal() {
        this.element.style.display = 'none';
        this.body.style.overflowY = 'auto';
        this.modalState = false;
    }

    /**
     * Opens the lightbox modal and disables page scrolling.
     */
    openModal() {
        this.element.style.display = 'block';
        this.body.style.overflowY = 'hidden';
        this.modalState = true;
    }

    /**
     * Displays the currently selected media in the lightbox viewer.
     *
     * @param {HTMLElement} media - The media element to display in the lightbox viewer.
     */
    displayOpenMedia(media) {
        this.viewer.replaceChild(media, this.viewer.firstChild);
        this.heading.innerText = media.title;
        this.openModal();
    }

    /**
     * Handles the navigation controls (previous/next) for the lightbox.
     *
     * @param {number} i - The index of the current media item.
     * @param {NodeList} medias - The list of all media elements available for navigation.
     */

    /**
     * Opens the media item at the given index and displays it in the lightbox.
     *
     * @param {number} i - The index of the media to be displayed.
     */
    handleOpenMedia(i) {
        this.currentItem = Number(i);

        this.medias = document.querySelectorAll(".media-card__media > *");

        const media = document.createElement(this.medias[this.currentItem].tagName);
        if (media.tagName === "VIDEO") {
            media.controls = "controls";
        }
        media.src = this.medias[this.currentItem].src;
        media.title = this.medias[this.currentItem].title;

        this.displayOpenMedia(media);
    }

    /**
     * Displays the previous media item in the lightbox.
     */
    handlePreviousMedia() {
        this.handleOpenMedia((this.currentItem === 0) ? this.medias.length - 1 : this.currentItem - 1);
    }

    /**
     * Displays the next media item in the lightbox.
     */
    handleNextMedia() {
        this.handleOpenMedia((this.currentItem === this.medias.length - 1) ? 0 : this.currentItem + 1);
    }
}
