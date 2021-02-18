const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');



class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPaths = '/api/usuarios';
        this.authPath = '/api/auth';

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

    routes(){
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.userPaths, require('../routes/user'));
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        // Parseo y lectura del body de las requests
        this.app.use( express.json() );

        this.app.use( express.static('public') );

    }

    listen(){

        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}


module.exports = Server;