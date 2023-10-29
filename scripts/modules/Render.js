const table = document.querySelector('#table');

export default class Render {

    static clearTable() {
        // remove all rows except header row
        let rowCount = table.rows.length;

        for (let i = rowCount - 1; i > 0; i--) {
            table.deleteRow(i);
        }
    }

    static insertNewRowTable(employee) {
        Render.table = table;

        let newRow = Render.table.insertRow(-1);

        Render.insertCellTable(newRow, employee["id"]);
        Render.insertCellTable(newRow, employee["name"]);
        Render.insertCellTable(newRow, employee["department"]);

        let removeCell = newRow.insertCell(-1);
        let btnRemove = document.createElement('button');
        btnRemove.setAttribute('class', 'btn btn-danger')
        btnRemove.innerText = 'Baja';

        removeCell.appendChild(btnRemove);

        let updateCell = newRow.insertCell(-1);
        let btnUpdate = document.createElement('button');
        btnUpdate.setAttribute('class', 'btn btn-warning')
        btnUpdate.innerText = 'Actualizar';

        updateCell.appendChild(btnUpdate);

        btnRemove.addEventListener('click', (e) => {
            Render.removeRow(newRow)
        })

        btnUpdate.addEventListener('click', (e) => {
            Render.updateRow(e)
        });
    }

    static insertCellTable(newRow, value) {
        let newCell = newRow.insertCell(-1);
        newCell.textContent = value;
    }

    static removeRow(row) {
        let idToRem = row.children[0].innerHTML;

        fetch(`http://localhost:3000/empleado/${idToRem}`, {
            method: 'DELETE'
        }).then(() => {
            row.remove();
            alert('Empleado dado de baja exitosamente.');
        }).catch(err => console.log(err));
    }

    static updateRow(row) {
        console.log(row)
    }
}