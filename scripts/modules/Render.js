const table = document.querySelector('#table');

export default class Render {

    static insertNewRowTable(employee, renderOnlyOne) {
        Render.table = table;

        let rowPos = -1;

        if(renderOnlyOne) {
            // remove all rows except header row
            const [first,...other] = table.rows;
            other.forEach(element => {
                element.remove();
            });
        }

        let newRow = Render.table.insertRow(rowPos);

        Render.insertCellTable(newRow, employee["id"]);
        Render.insertCellTable(newRow, employee["name"]);
        Render.insertCellTable(newRow, employee["deparment"]);

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