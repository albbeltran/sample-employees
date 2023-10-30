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
        this.idToDelete = this.deleteBtn.getAttribute('name');
        const res = await fetch(`/empleado/${this.idToDelete}`, {
            method: 'DELETE'
        })
        // redirect happens in backend, the url is fetched and sent to the frontend
        // needed to do manual redirect in the browser
        this.redirectUrl = res.url;
        if (this.redirectUrl && this.redirectUrl !== "")
            window.location = this.redirectUrl;
    }
}