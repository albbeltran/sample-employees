export default class Update {

    constructor() {
        this.updateBtn = document.querySelector('#update-btn');
        this.events();
    }

    events() {
        this.updateBtn.addEventListener('click', e => {
            e.preventDefault();
            
            this.updateReq();
        });
    }

    async updateReq() {
        // this.idToUpd = this.updateBtn.getAttribute('name');
        // await fetch(`/empleado/${this.idToUpd}`, {
        //     method: 'PUT'
        // })
        console.log('PUT REQ');
    }
}