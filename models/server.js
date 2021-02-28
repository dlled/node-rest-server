const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            user: '/api/usuarios',
            auth: '/api/auth',
            categorias: '/api/categorias'
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
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        // Parseo y lectura del body de las requests
        this.app.use(express.json());

        this.app.use(express.static('public'));

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}


module.exports = Server;