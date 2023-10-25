import Render from './Render.js';

export default class Search {
    constructor() {
        this.searchForm = document.querySelector('#search-form');
        this.id = document.querySelector('#emp_search');
        this.events();
    }

    events() {
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(this.id.value)
            this.formSubmitHandler();
        })
    }

    formSubmitHandler() {
        this.idHandler();

        if (this.id.errors === false) {
            // this.form.submit();

            fetch(`http://localhost:3000/empleado/${this.id.value}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        res.json().then(employeeData => Render.insertNewRowTable(employeeData, true));
                    } else if (res.status === 400) {
                        alert('The employee does not exists in database.');
                        console.error(`ERROR. Status code: ${res.status}`);
                    }
                })
                .catch(err => console.error(`Request error: ${err}`))
        }
    }

    idHandler() {
        this.id.errors = false;

        // regular expression to check if the id is alphanumeric
        if (this.id.value != '' && !/^([a-zA-Z0-9]+)$/.test(this.id.value)) {
            this.id.errors = true;
            alert('Username can only contain letters and numbers.');
        }
    }
}