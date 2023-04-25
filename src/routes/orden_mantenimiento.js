"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
exports.default = (app, connection) => {
    const query = util_1.default.promisify(connection.query).bind(connection);
    app.post(`/mtto`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { Estatus = 0, idunidad = 1, Mecanico = 1, Comentarios = '' } = req.body;
        //const values = [ Estatus, idunidad, Mecanico, Comentarios ];
        //const sql = `INSERT INTO orden_mantenimiento(Estatus, idunidad, Mecanico, Comentarios) VALUES (?,?,?,?)`;
        const sql = `INSERT INTO orden_mantenimiento(Estatus, idunidad, Mecanico, Comentarios) VALUES ("${Estatus}", "${idunidad}", "${Mecanico}", "${Comentarios}")`;
        try {
            const result = yield query(sql);
            return res.json(result);
        }
        catch (error) {
            console.log(error);
            return res.json(error);
        }
    }));
    app.get(`/mtto`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let sql = `SELECT * FROM orden_mantenimiento`;
        try {
            const result = yield query(sql);
            return res.json(result);
        }
        catch (error) {
            console.log(error);
            return res.json(error);
        }
    }));
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
