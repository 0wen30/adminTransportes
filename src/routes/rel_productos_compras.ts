import { Connection } from "mysql";
import { Express } from 'express';

export default (app: Express, connection: Connection) => {

    app.post(`/pedido`, (req, res) => {

        const { idproducto=5, idcompra=1, cantidad=1, precio_unitario=0 } = req.body;
        const values = [ idproducto, idcompra, cantidad, precio_unitario ];
        const sql = `INSERT INTO rel_productos_compras(idproducto, idcompra, cantidad, precio_unitario) VALUES (?,?,?,?)`;
        connection.query(sql,values, (err, result) => {
            if (err) return console.log(err)
            return res.json(result)
        });

    });

    app.get(`/pedido`, (req, res) => {

        const sql = `SELECT * FROM rel_productos_compras`;
        connection.query(sql,(err, result) => {
            if (err) return console.log(err)
            return res.json(result)
        });

    });

};