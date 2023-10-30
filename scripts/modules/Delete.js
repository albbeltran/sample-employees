export default class Delete {

    constructor() {
        this.deleteBtn = document.querySelector('#delete-btn');
        this.events();
    }

    events() {
        this.deleteBtn.addEventListener('click', e => {
            e.preventDefault();
            
            this.deleteReq();
        });
    }

    async deleteReq() {
        console.log('DELETE REQ');
    }
}