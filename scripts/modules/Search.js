
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
        this.idHandler();

        if (this.id.errors === false) {
            // this.form.submit();

            console.log(this.id.value);

            fetch(`http://localhost:3000/empleado/:${this.id.value}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    this.convertObjToArr(data);
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

    renderResult(keys, values) {
        let editForm = document.querySelector('#edit-form');

        if (!editForm) {
            const attributes = [
                "emp_id",
                "emp_name",
                "emp_pass",
                "emp_dpto"
            ]

            editForm = document.createElement('form');
            editForm.setAttribute('id', 'edit-form');

            keys.forEach((key, index) => {
                let label = document.createElement('label');
                let input = document.createElement('input');
                
                label.innerText = key;
                label.setAttribute('for', `${attributes[index]}`);
                
                input.setAttribute('type', 'text');
                input.setAttribute('id', `${attributes[index]}`);
                input.setAttribute('name', `${attributes[index]}`);
                input.setAttribute('class', 'form-control');
                input.setAttribute('disabled', 'true');
                
                editForm.appendChild(label);
                editForm.appendChild(input);
            })

            const editBtn = document.createElement('button');
            editBtn.innerText = 'Editar';

            const submit = document.createElement('input');
            submit.setAttribute('type', 'submit');
            submit.setAttribute('value', 'Guardar');
            submit.setAttribute('disabled', 'true');

            editBtn.addEventListener('click', (e) => {
                e.preventDefault();
                let fields = document.querySelectorAll('#edit-form .form-control');
                fields.forEach(field => field.removeAttribute('disabled'))
                submit.removeAttribute('disabled');
            })

            editForm.appendChild(editBtn);
            editForm.appendChild(submit);

            document.querySelector('#busqueda').appendChild(editForm);
        }

        values.forEach(value => {
            let fields = document.querySelectorAll('#edit-form .form-control');
            fields.forEach(field => field.setAttribute('placeholder', `${value}`))
        })
    }

    convertObjToArr(object) {
        const keys = Object.keys(object);
        const values = Object.values(object);

        this.renderResult(keys, values);
    }
}