"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.onload = main;
const modal = document.getElementById('modal');
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const formulario = document.getElementById('formulario');
        formulario.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const result = yield addBanco();
            if (result.affectedRows > 0) {
                yield cargarFilas(tbody);
                modal.close();
            }
        }));
        document.getElementById('add').addEventListener('click', () => modal.showModal());
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
        table.appendChild(yield cargarFilas(tbody));
        document.body.appendChild(table);
    });
}
function cargarFilas(tbody) {
    return __awaiter(this, void 0, void 0, function* () {
        tbody.innerHTML = '';
        const data = yield cargarBancos();
        data.forEach((row) => {
            const tr = document.createElement('tr');
            Object.values(row).forEach((value) => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            });
            const btnEdit = document.createElement('td');
            const btnDelete = document.createElement('td');
            btnEdit.textContent = '📄';
            btnDelete.textContent = '❌';
            btnEdit.addEventListener('click', () => {
                modal.showModal();
                const actualizar = document.getElementById('actualizar');
                actualizar.disabled = false;
                const nombre = document.getElementById('nombre');
                nombre.value = row.nombre;
                actualizar.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                    e.preventDefault();
                    yield editarBanco(row.id, nombre.value);
                }));
            });
            btnDelete.addEventListener('click', () => eliminarBanco(row.id));
            tr.appendChild(btnEdit);
            tr.appendChild(btnDelete);
            tbody.appendChild(tr);
        });
        return tbody;
    });
}
function cargarBancos() {
    return __awaiter(this, void 0, void 0, function* () {
        const bancos = yield (yield fetch("http://localhost:3000/bancos")).json();
        return bancos;
    });
}
function addBanco() {
    return __awaiter(this, void 0, void 0, function* () {
        const nombre = document.getElementById('nombre');
        const response = yield fetch('http://localhost:3000/bancos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: nombre.value }),
        });
        nombre.value = '';
        const result = yield response.json();
        return result;
    });
}
function editarBanco(id, nombre) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:3000/bancos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre }),
        });
        const result = yield response.json();
        return result;
    });
}
function eliminarBanco(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:3000/bancos/${id}`, {
            method: 'DELETE',
        });
        const result = yield response.json();
        return result;
    });
}
