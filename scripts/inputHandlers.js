export function idHandler(id) {
    id.errors = false;

    // regular expression to check if the id is alphanumeric
    if (id.value != '' && !/^([a-zA-Z0-9]+)$/.test(id.value)) {
        id.errors = true;
        alert('El expediente solo puede contenr números y letras.');
    }

    return id.errors;
}

export function nameHandler(name) {
    name.errors = false;

    // regular expression to check if the name is alphabetic
    if (name.value != '' && !/^[A-Za-z\s]+$/.test(name.value)) {
        name.errors = true;
        alert('El nombre solo puede contener letras.');
    }

    return name.errors;
}

export function dptoHandler(dpto) {
    dpto.errors = false;

    // regular expression to check if the dpto is alphabetic
    if (dpto.value != '' && !/^[A-Za-z\s]+$/.test(dpto.value)) {
        dpto.errors = true;
        alert('El departamento solo puede contener letras.');
    }

    return dpto.errors;
}