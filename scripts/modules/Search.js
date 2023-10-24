
export default class Search {
    constructor() {
        this.searchForm = document.querySelector('#search-form');
        this.id = document.querySelector('#search_emp');
        this.events();
    }

    events() {
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.formSubmitHandler();
        })
    }

    formSubmitHandler() {
        this.idHandler();

        if (this.id.errors === false) {
            // this.form.submit();

            console.log(this.id.value);

            fetch(`http://localhost:3000/busqueda/:${this.id.value}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {
                    console.log('Request done')
                })
                .catch(() => {
                    console.log('Request not done')
                })
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