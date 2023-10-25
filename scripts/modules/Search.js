import Render from './Render.js';

export default class Search {
    constructor() {
        this.searchForm = document.querySelector('#search-form');
        this.btnClear = document.querySelector('#btn-clear');
        this.btnClear.addEventListener('click', this.clear);
        this.events();
    }

    events() {
        this.searchForm.addEventListener('submit', (e) => {
            // every submit, update id
            this.id = document.querySelector('#emp_search');
            e.preventDefault();
            this.formSubmitHandler();
        })

        this.btnClear.addEventListener('click', () => {
            // if clear, then there is no id to search
            this.id = undefined;
            this.formSubmitHandler();
        })
    }

    selectPath() {
        if (this.id !== undefined) this.path = `http://localhost:3000/empleado/${this.id.value}`;
        // if id is undefined, select all elements
        else this.path = 'http://localhost:3000/empleado/'
    }

    formSubmitHandler() {
        console.log(this.id)
        this.selectPath();

        if (this.id) {
            this.idHandler();
            this.id.value = '';
            if (this.id.errors) return;
        }

        fetch(this.path, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    res.json().then(employees => {
                        Render.clearTable();

                        if (!employees.length) Render.insertNewRowTable(employees, true)
                        else {
                            employees.forEach(employee => {
                                Render.insertNewRowTable(employee);
                            })
                        }
                    }
                    );
                } else if (res.status === 400) {
                    alert('The employee does not exists in database.');
                    console.error(`ERROR. Status code: ${res.status}`);
                }
            })
            .catch(err => console.error(`Request error: ${err}`))
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