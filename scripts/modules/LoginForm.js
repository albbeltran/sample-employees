
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

            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.id.value,
                    password: this.password.value
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        // if success login, redirect to main page
                        document.location.href = '/view/main.html'
                    } else if (res.status === 401) {
                        alert('Empleado no autorizado.');
                        console.error(`ERROR. Status code: ${res.status}`);
                    } else if (res.status === 400) {
                        alert('Expediente no registrado.');
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
            alert('El expediente solo puede contener números y letras.');
        }
    }
}