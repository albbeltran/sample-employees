
export default class LoginForm {

    constructor() {
        this.form = document.querySelector('#login-form');
        this.id = document.querySelector('#emp_id');
        this.password = document.querySelector('#emp_pass');
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
        // this.passwordHandler();

        if (this.id.errors === false) {
            // this.form.submit();

            console.log(this.id.value, this.password.value)

            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emp_id: this.id.value,
                    emp_pass: this.password.value
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
            alert('El expediente solo puede contener números y letras.');
        }
    }
}