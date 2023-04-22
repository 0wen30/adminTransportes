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
};
