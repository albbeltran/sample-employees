const table = document.querySelector('#table');

export default class Render {

    static insertNewRowTable(employee) {
        Render.table = table;
        let newRow = Render.table.insertRow(-1);

        Render.insertCellTable(newRow, employee["emp_id"]);
        Render.insertCellTable(newRow, employee["emp_name"]);
        Render.insertCellTable(newRow, employee["emp_dpto"]);

        let removeCell = newRow.insertCell(-1);
        let btnRemove = document.createElement('button');
        btnRemove.innerText = 'Baja';

        removeCell.appendChild(btnRemove);

        let updateCell = newRow.insertCell(-1);
        let btnUpdate = document.createElement('button');
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
        }).catch(err => console.log(err))
    }

    static updateRow(row) {
        console.log(row)
    }
}