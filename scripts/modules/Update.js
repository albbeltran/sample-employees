import { nameHandler, dptoHandler } from "./inputHandlers";

export default class Update {

    constructor() {
        this.updateForm = document.querySelector('#update-form');
        this.id = document.querySelector('#emp_id');
        this.name = document.querySelector('#emp_name');
        this.department = document.querySelector('#emp_dpto');
        this.events();
    }

    events() {
        this.updateForm.addEventListener('submit', e => {
            e.preventDefault();

            this.formSubmitHandler();
        });
    }

    formSubmitHandler() {
        this.name.errors = nameHandler(this.name);
        this.department.errors = dptoHandler(this.department);

        if (this.name.errors === false
            && this.department.errors === false) {
            this.updateReq();
        }
    }

    async updateReq() {
        let employeeData = {
            id: this.id.value,
            name: this.name.value,
            department: this.department.value
        }

        const res = await fetch(`/empleado/${this.id.value}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData)
        })

        // redirect happens in backend, the url is fetched and sent to the frontend
        // needed to do manual redirect in the browser
        this.redirectUrl = res.url;
        if (this.redirectUrl && this.redirectUrl !== "")
            window.location = this.redirectUrl;
    }
}