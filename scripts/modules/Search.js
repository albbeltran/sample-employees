import Render from './Render.js';

export default class Search {
    constructor() {
        this.searchForm = document.querySelector('#search-form');
        this.id = document.querySelector('#emp_search');
        this.btnClear = document.querySelector('#btn-clear');
        this.events();
    }

    events() {
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.formSubmitHandler();
        })

        this.btnClear.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (this.id.value !== '') {
                // clear to send a req to get all employees
                this.id.value = '';
                this.formSubmitHandler();
            }
        })
    }

    selectPath() {
        if (this.id.value !== '') {
            this.path = `http://localhost:3000/empleado/${this.id.value}`;
        }
        // if id is empty, select all elements
        else this.path = 'http://localhost:3000/empleado/'
    }

    formSubmitHandler() {
        console.log(this.id.value)
        this.selectPath();

        if (this.id) {
            this.idHandler();
            // this.id.value = '';
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
                    alert('Empleado no encontrado.');
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
            alert('El usuario solo puede contener letras y números.');
        }
    }
}