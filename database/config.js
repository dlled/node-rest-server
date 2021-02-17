const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }).catch();

        console.log('BBDD Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar con la base de datos');
    }

}

module.exports = {
    dbConnection
}