"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("./src/config/dbConnection"));
const bancos_1 = __importDefault(require("./src/routes/bancos"));
const compras_1 = __importDefault(require("./src/routes/compras"));
const empleados_1 = __importDefault(require("./src/routes/empleados"));
const orden_mantenimiento_1 = __importDefault(require("./src/routes/orden_mantenimiento"));
const pagos_1 = __importDefault(require("./src/routes/pagos"));
const productos_1 = __importDefault(require("./src/routes/productos"));
const proveedores_1 = __importDefault(require("./src/routes/proveedores"));
const rel_productos_compras_1 = __importDefault(require("./src/routes/rel_productos_compras"));
const rel_productos_mtto_1 = __importDefault(require("./src/routes/rel_productos_mtto"));
const unidades_1 = __importDefault(require("./src/routes/unidades"));
const server_1 = __importDefault(require("./src/server"));
const connection = (0, dbConnection_1.default)();
(0, productos_1.default)(server_1.default, connection);
(0, compras_1.default)(server_1.default, connection);
(0, bancos_1.default)(server_1.default, connection);
(0, rel_productos_compras_1.default)(server_1.default, connection);
(0, rel_productos_mtto_1.default)(server_1.default, connection);
(0, proveedores_1.default)(server_1.default, connection);
(0, pagos_1.default)(server_1.default, connection);
(0, orden_mantenimiento_1.default)(server_1.default, connection);
(0, empleados_1.default)(server_1.default, connection);
(0, proveedores_1.default)(server_1.default, connection);
(0, unidades_1.default)(server_1.default, connection);
server_1.default.listen(server_1.default.get('port'), () => {
    console.log('server on port', server_1.default.get('port'));
});
