"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app, connection) => {
    app.post(`/pagos`, (req, res) => {
        const { Estatus = 0, idproveedor = 1, Forma_Pago = "transferencia", idbancos = 1, idcompra = 1, monto = 0 } = req.body;
        const values = [Estatus, idproveedor, Forma_Pago, idbancos, idcompra, monto];
        const sql = `INSERT INTO pagos(Estatus, idproveedor, Forma_Pago, idbancos, idcompra, monto) VALUES (?,?,?,?,?,?)`;
        connection.query(sql, values, (err, result) => {
            if (err)
                return console.log(err);
            return res.json(result);
        });
    });
    app.get(`/pagos`, (req, res) => {
        const sql = `SELECT * FROM pagos`;
        connection.query(sql, (err, result) => {
            if (err)
                return console.log(err);
            return res.json(result);
        });
    });
};
