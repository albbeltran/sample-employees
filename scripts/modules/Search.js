import { idHandler } from "./inputHandlers";

export default class Search {
    constructor() {
        this.searchForm = document.querySelector('#search-form');
        this.id = document.querySelector('#emp_search');
        this.events();
    }

    events() {
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.formSubmitHandler();
        })
    }

    formSubmitHandler() {
        this.id.errors = idHandler(this.id);

        if (this.id.errors === false) this.searchReq();
    }

    async searchReq() {
        console.log(this.id.value)

        const res = await fetch(`/empleado/${this.id.value}`)
        // redirect happens in backend, the url is fetched and sent to the frontend
        // needed to do manual redirect in the browser
        this.redirectUrl = res.url;
        if (this.redirectUrl && this.redirectUrl !== "")
            window.location = this.redirectUrl;
    }
}