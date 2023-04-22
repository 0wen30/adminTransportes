import { Connection } from "mysql";
import { Express } from 'express';

export default (app: Express, connection: Connection) => {

    app.post(`/productos`, (req, res) => {

        const { nombre, stock = 0, comentario = "" } = req.body;
        const values = [ nombre,stock,comentario ];
        const sql = `INSERT INTO productos (nombre,stock,comentario) VALUES (?, ?, ?)`;
        connection.query(sql,values, (err, result) => {
            if (err) return console.log(err)
            return res.json(result)
        });

    });

    app.get(`/productos`, (req, res) => {

        const sql = `SELECT * FROM productos`;
        connection.query(sql,(err, result) => {
            if (err) return console.log(err)
            return res.json(result)
        });

    });

};