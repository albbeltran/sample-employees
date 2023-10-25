
export default class AddForm {

    constructor() {
        this.form = document.querySelector('#add-form');
        this.id = document.querySelector('#emp_id');
        this.password = document.querySelector('#emp_pass');
        this.name = document.querySelector('#emp_name');
        this.dpto = document.querySelector('#emp_dpto');
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.formSubmitHandler();
        });
    }

    formSubmitHandler() {
        this.idHandler();
        this.nameHandler();
        this.dptoHandler();

        if (this.id.errors === false
            && this.name.errors === false
            && this.dpto.errors === false) {

                fetch('http://localhost:3000/empleado', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        emp_name: this.name.value,
                        emp_id: this.id.value,
                        emp_pass: this.password.value,
                        emp_dpto: this.dpto.value
                    })
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
            alert('El expediente solo puede contenr números y letras.');
        }
    }

    nameHandler() {
        this.name.errors = false;

        // regular expression to check if the name is alphabetic
        if (this.name.value != '' && !/^[A-Za-z\s]+$/.test(this.name.value)) {
            this.name.errors = true;
            alert('El nombre solo puede contener letras.');
        }
    }

    dptoHandler() {
        this.dpto.errors = false;

        // regular expression to check if the dpto is alphabetic
        if (this.dpto.value != '' && !/^[A-Za-z\s]+$/.test(this.dpto.value)) {
            this.dpto.errors = true;
            alert('El departamento solo puede contener letras.');
        }
    }
}