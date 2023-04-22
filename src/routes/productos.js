"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app, connection) => {
    app.post(`/productos`, (req, res) => {
        const { nombre, stock = 0, comentario = "" } = req.body;
        const values = [nombre, stock, comentario];
        const sql = `INSERT INTO productos (nombre,stock,comentario) VALUES (?, ?, ?)`;
        connection.query(sql, values, (err, result) => {
            if (err)
                return console.log(err);
            return res.json(result);
        });
    });
    app.get(`/productos`, (req, res) => {
        const sql = `SELECT * FROM productos`;
        connection.query(sql, (err, result) => {
            if (err)
                return console.log(err);
            return res.json(result);
        });
    });
};
