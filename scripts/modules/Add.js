import { idHandler, nameHandler, dptoHandler } from "./inputHandlers";

export default class Add {

    constructor() {
        this.form = document.querySelector('#add-form');
        this.id = document.querySelector('#emp_id');
        this.password = document.querySelector('#emp_pass');
        this.name = document.querySelector('#emp_name');
        this.department = document.querySelector('#emp_dpto');
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.formSubmitHandler();

            this.form.reset();
        });
    }

    formSubmitHandler() {
        this.id.errors = idHandler(this.id);
        this.name.errors = nameHandler(this.name);
        this.department.errors = dptoHandler(this.department);

        if (this.id.errors === false
            && this.name.errors === false
            && this.department.errors === false) {
            this.addReq();
        }
    }

    async addReq() {
        let employeeData = {
            id: this.id.value,
            name: this.name.value,
            password: this.password.value,
            department: this.department.value
        }

        const res = await fetch('http://localhost:3000/empleado', {
            method: 'POST',
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