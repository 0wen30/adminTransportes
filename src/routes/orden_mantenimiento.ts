import { Connection } from "mysql";
import { Express } from 'express';
import util from 'util'


export default (app: Express, connection: Connection) => {

    const query = util.promisify(connection.query).bind(connection);

    app.post(`/mtto`, async(req, res) => {

        const { Estatus=0, idunidad=1, Mecanico=1, Comentarios='' } = req.body;
        //const values = [ Estatus, idunidad, Mecanico, Comentarios ];
        //const sql = `INSERT INTO orden_mantenimiento(Estatus, idunidad, Mecanico, Comentarios) VALUES (?,?,?,?)`;
        const sql = `INSERT INTO orden_mantenimiento(Estatus, idunidad, Mecanico, Comentarios) VALUES ("${Estatus}", "${idunidad}", "${Mecanico}", "${Comentarios}")`;
        try {
            const result = await query(sql);
            return res.json(result);
        } catch (error) {
            console.log(error)
            return res.json(error)
        }


    });

    app.get(`/mtto`, async(req, res) => {

        let sql = `SELECT * FROM orden_mantenimiento`;
        try {
            const result = await query(sql);
            return res.json(result)
        } catch (error) {
            console.log(error)
            return res.json(error)
        }

    });

};

/*
app.post(`/mtto`, async(req, res) => {

        const { Estatus=0, idunidad=1, Mecanico=1, Comentarios='' } = req.body;
        const values = [ Estatus, idunidad, Mecanico, Comentarios ];
        const sql = `INSERT INTO orden_mantenimiento(Estatus, idunidad, Mecanico, Comentarios) VALUES (?,?,?,?)`;
        query(sql,values, (err, result) => {
            if (err) return console.log(err)
            return res.json(result)
        });

    });
   */