"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app, connection) => {
    app.post(`/proveedores`, (req, res) => {
        const { nombre, comentario = "" } = req.body;
        const values = [nombre, comentario];
        const sql = `INSERT INTO proveedores (nombre,comentario) VALUES (?, ?)`;
        connection.query(sql, values, (err, result) => {
            if (err)
                return console.log(err);
            return res.json(result);
        });
    });
    app.get(`/proveedores`, (req, res) => {
        const sql = `SELECT * FROM proveedores`;
        connection.query(sql, (err, result) => {
            if (err)
                return console.log(err);
            return res.json(result);
        });
    });
    app.put(`/proveedores`, (req, res) => {
        const { id } = req.query;
        const { nombre, comentario = "" } = req.body;
        const values = [nombre, comentario, id];
        const sql = `UPDATE proveedores SET nombre = ?, comentario = ? WHERE id = ?`;
        connection.query(sql, values, (err, result) => {
            if (err)
                return console.log(err);
            return res.json(result);
        });
    });
    app.delete(`/proveedores`, (req, res) => {
        const { id } = req.query;
        const sql = `DELETE FROM proveedores WHERE id = ?`;
        connection.query(sql, id, (err, result) => {
            if (err)
                return console.log(err);
            return res.json(result);
        });
    });
};
