export default class Update {

    constructor() {
        this.updateBtn = document.querySelector('#update-btn');
        this.events();
    }

    events() {
        this.updateBtn.addEventListener('click', e => {
            e.preventDefault();
        });
    }
}