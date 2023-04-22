import { Connection } from "mysql";
import { Express } from 'express';

export default (app: Express, connection: Connection) => {

    app.post(`/proveedores`, (req, res) => {

        const { nombre, comentario = "" } = req.body;
        const values = [ nombre,comentario ];
        const sql = `INSERT INTO proveedores (nombre,comentario) VALUES (?, ?)`;
        connection.query(sql,values, (err, result) => {
            if (err) return console.log(err)
            return res.json(result)
        });

    });

    app.get(`/proveedores`, (req, res) => {

        const sql = `SELECT * FROM proveedores`;
        connection.query(sql,(err, result) => {
            if (err) return console.log(err)
            return res.json(result)
        });

    });

};