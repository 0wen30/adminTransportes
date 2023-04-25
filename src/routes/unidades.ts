import { Connection } from "mysql";
import { Express } from 'express';

export default (app: Express, connection: Connection) => {

    app.post(`/unidades`, (req, res) => {

        const { unidad, Clase = "", Tipo = "", TipoCombustible = "", Marca = "", Modelo = "", Placas = "", Capacidad = 0, Peso = 0, Kilometros = 0 } = req.body;
        const values = [ unidad, Clase, Tipo, TipoCombustible, Marca, Modelo, Placas, Capacidad, Peso, Kilometros ];
        const sql = 'INSERT INTO unidades( unidad, Clase, Tipo, TipoCombustible, Marca, Modelo, Placas, Capacidad, Peso, Kilometros) VALUES (?,?,?,?,?,?,?,?,?,?)';
        connection.query(sql,values, (err, result) => {
            if (err) return console.log(err)
            return res.json(result)
        });

    });

    app.get(`/unidades`, (req, res) => {

        const sql = `SELECT * FROM unidades`;
        connection.query(sql,(err, result) => {
            if (err) return console.log(err)
            return res.json(result)
        });

    });

    app.put(`/unidades`, (req, res) => {

        const { id } = req.query;
        const { unidad } = req.body;
        const values = [unidad,id];
        const sql = `UPDATE unidades SET unidad = ? WHERE id = ?`;
        connection.query(sql,values, (err, result) => {
            if (err) return console.log(err)
            return res.json(result)
        });

    });

    app.delete(`/unidades`, (req, res) => {

        const { id } = req.query;
        const sql = `DELETE FROM unidades WHERE id = ?`;
        connection.query(sql,id,(err, result) => {
            if (err) return console.log(err)
            return res.json(result)
        });

    });

};