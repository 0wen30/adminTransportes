import { Connection } from "mysql";
import { Express } from 'express';

export default (app: Express, connection: Connection) => {

    app.post(`/empleados`, (req, res) => {

        const { nombre,puesto } = req.body;
        const values = [ nombre,puesto ];
        const sql = `INSERT INTO empleados (nombre,puesto) VALUES (?, ?)`;
        connection.query(sql,values, (err, result) => {
            if (err) return console.log(err)
            return res.json(result)
        });

    });

    app.get(`/empleados`, (req, res) => {

        const sql = `SELECT * FROM empleados`;
        connection.query(sql,(err, result) => {
            if (err) return console.log(err)
            return res.json(result)
        });

    });

};