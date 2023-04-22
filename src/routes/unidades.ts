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

};