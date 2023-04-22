import { Connection } from "mysql";
import { Express } from 'express';

export default (app: Express, connection: Connection) => {

    app.post(`/compras`, (req, res) => {

        const { id_proveedor=1,comentario="" } = req.body;
        const values = [ id_proveedor,comentario ];
        const sql = `INSERT INTO compras (id_proveedor,comentario) VALUES (?,?)`;
        connection.query(sql,values, (err, result) => {
            if (err) return console.log(err)
            return res.json(result)
        });

    });

    app.get(`/compras`, (req, res) => {

        const sql = `SELECT * FROM compras`;
        connection.query(sql,(err, result) => {
            if (err) return console.log(err)
            return res.json(result)
        });

    });

};