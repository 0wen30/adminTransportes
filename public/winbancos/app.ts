interface Banco { id: number, nombre: string }

type BancoResponse = { fieldCount: number, affectedRows: number, insertId: number, serverStatus: number, warningCount: number, message: string, protocol41: boolean, changedRows: number };

window.onload = main;
const modal = document.getElementById('modal') as HTMLDialogElement;

async function main() {

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const formulario = document.getElementById('formulario') as HTMLFormElement;

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        const result: BancoResponse = await addBanco();
        if (result.affectedRows > 0) {
            await cargarFilas(tbody);
            modal.close();
        }
    });

    (document.getElementById('add') as HTMLButtonElement).addEventListener('click', () => modal.showModal());

    const headers = ['id', 'nombre', 'Acciones'];

    const headerRow = document.createElement('tr');
    headers.forEach((header, index) => {
        const th = document.createElement('th');
        th.textContent = header;
        if (index === headers.length - 1) {
            th.colSpan = 2;
        }
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);
    table.appendChild(await cargarFilas(tbody));

    document.body.appendChild(table);

}

async function cargarFilas(tbody: HTMLTableSectionElement): Promise<HTMLTableSectionElement> {

    tbody.innerHTML = '';

    const data: Banco[] = await cargarBancos();

    data.forEach((row) => {
        const tr = document.createElement('tr');
        Object.values(row).forEach((value) => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });

        const btnEdit = document.createElement('td');
        const btnDelete = document.createElement('td');

        btnEdit.textContent = '📄'
        btnDelete.textContent = '❌'

        btnEdit.addEventListener('click', () => {
            modal.showModal();
            const actualizar = document.getElementById('actualizar') as HTMLButtonElement
            actualizar.disabled = false;
            const nombre = document.getElementById('nombre') as HTMLInputElement;
            nombre.value = row.nombre;
            actualizar.addEventListener('click', async (e) => {
                e.preventDefault();
                await editarBanco(row.id,nombre.value)
            });
        });

        btnDelete.addEventListener('click', () => eliminarBanco(row.id));

        tr.appendChild(btnEdit);
        tr.appendChild(btnDelete);
        tbody.appendChild(tr);
    });

    return tbody;

}

async function cargarBancos(): Promise<Banco[]> {
    const bancos = <Banco[]>await (await fetch("http://localhost:3000/bancos")).json();
    return bancos;
}

async function addBanco(): Promise<BancoResponse> {
    const nombre = document.getElementById('nombre') as HTMLInputElement;
    const response = await fetch('http://localhost:3000/bancos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre: nombre.value }),
    });
    nombre.value = '';
    const result = <BancoResponse>await response.json()
    return result;
}

async function editarBanco(id: number,nombre: string): Promise<BancoResponse> {
    const response = await fetch(`http://localhost:3000/bancos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre }),
    });
    const result = <BancoResponse>await response.json()
    return result;
}

async function eliminarBanco(id: number): Promise<BancoResponse> {
    const response = await fetch(`http://localhost:3000/bancos/${id}`, {
        method: 'DELETE',
    });
    const result = <BancoResponse>await response.json()
    return result;
}