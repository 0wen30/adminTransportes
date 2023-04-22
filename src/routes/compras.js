"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app, connection) => {
    app.post(`/compras`, (req, res) => {
        const { id_proveedor = 1, comentario = "" } = req.body;
        const values = [id_proveedor, comentario];
        const sql = `INSERT INTO compras (id_proveedor,comentario) VALUES (?,?)`;
        connection.query(sql, values, (err, result) => {
            if (err)
                return console.log(err);
            return res.json(result);
        });
    });
    app.get(`/compras`, (req, res) => {
        const sql = `SELECT * FROM compras`;
        connection.query(sql, (err, result) => {
            if (err)
                return console.log(err);
            return res.json(result);
        });
    });
};
