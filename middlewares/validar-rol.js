const { request, response } = require("express");


const adminValidator = (req = request, res = response, next) => {

    if(!req.userAuth) {
        return res.status(500).json({
            msg: 'No existe el usuario'
        })
    }

    const { rol, nombre} = req.userAuth

    if( rol !== "ADMIN_ROLE"){
        return res.status(401).json({
            msg: `El usuario ${nombre}, tiene el rol de ${rol}, no es admin`
        })
    }

    next();
}

const hasRol = (...roles) => {
    return (req = request, res = response, next) => {

        if(!req.userAuth) {
            return res.status(500).json({
                msg: 'No existe el usuario'
            })
        }
        
        const {rol} = req.userAuth

        if (!roles.includes(rol)){
            return res.status(401).json({
                msg: 'User not authorized'
            })
        }
        next();
    }
}

module.exports = {
    adminValidator,
    hasRol
}