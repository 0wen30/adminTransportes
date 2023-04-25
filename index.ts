import dbConnection from "./src/config/dbConnection";
import bancos from "./src/routes/bancos";
import compras from "./src/routes/compras";
import empleados from "./src/routes/empleados";
import orden_mantenimiento from "./src/routes/orden_mantenimiento";
import pagos from "./src/routes/pagos";
import productos from "./src/routes/productos";
import proveedores from "./src/routes/proveedores";
import rel_productos_compras from "./src/routes/rel_productos_compras";
import rel_productos_mtto from "./src/routes/rel_productos_mtto";
import unidades from "./src/routes/unidades";
import app from "./src/server";
import cors  from 'cors';

app.use(cors());

const connection = dbConnection();

productos(app,connection);
compras(app,connection);
bancos(app,connection);
rel_productos_compras(app,connection);
rel_productos_mtto(app,connection);
proveedores(app,connection);
pagos(app,connection);
orden_mantenimiento(app,connection);
empleados(app,connection);
proveedores(app,connection);
unidades(app,connection);

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
