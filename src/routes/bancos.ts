import { Connection } from "mysql";
import { Express } from 'express';

export default (app: Express, connection: Connection) => {

    app.post(`/bancos`, (req, res) => {

        console.log(req.body)

        const { nombre } = req.body;
        const sql = `INSERT INTO bancos (nombre) VALUES ( ? )`;
        connection.query(sql,nombre,(err, result) => {
            if (err) return console.log(err)
            return res.json(result)
        });

    });

    app.get(`/bancos`, (req, res) => {

        const sql = `SELECT * FROM bancos`;
        connection.query(sql,(err, result) => {
            if (err) return console.log(err)
            return res.json(result)
        });

    });

};