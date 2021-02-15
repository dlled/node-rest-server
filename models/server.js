const express = require('express');
const cors = require('cors');



class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPaths = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    routes(){
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