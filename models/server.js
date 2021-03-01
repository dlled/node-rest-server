const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            user: '/api/usuarios',
            auth: '/api/auth',
            productos: '/api/productos',
            categorias: '/api/categorias',
            search: '/api/search',
            uploads: '/api/uploads'
        }

        // Conexión a la bbdd
        this.database();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    async database() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.uploads, require('../routes/uploads'))
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        // Parseo y lectura del body de las requests
        this.app.use(express.json());

        this.app.use(express.static('public'));

        // Middleware para manejar la carga de archivos
        // Note that this option available for versions 1.0.0 and newer. 
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}


module.exports = Server;