"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app, connection) => {
    app.post(`/pmtto`, (req, res) => {
        const { idproducto = 5, idmtto = 3, cantidad = 1, precio_unitario = 0 } = req.body;
        const values = [idproducto, idmtto, cantidad, precio_unitario];
        const sql = `INSERT INTO rel_productos_mtto(idproducto, idmtto, cantidad, precio_unitario) VALUES (?,?,?,?)`;
        connection.query(sql, values, (err, result) => {
            if (err)
                return console.log(err);
            return res.json(result);
        });
    });
    app.get(`/pmtto`, (req, res) => {
        const sql = `SELECT * FROM rel_productos_mtto`;
        connection.query(sql, (err, result) => {
            if (err)
                return console.log(err);
            return res.json(result);
        });
    });
};
