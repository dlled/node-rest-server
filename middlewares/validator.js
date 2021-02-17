const { validationResult } = require('express-validator');


const validarCampos = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    // Es necesario colocar una función dentro de los middlewares que se denomine next()
    // esto nos va a permitir continuar con nuestro código
    next();
}

module.exports = {
    validarCampos
}