const { request, response } = require("express");
const jwt  = require("jsonwebtoken");
const User = require('../models/user');


const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            msg: 'Operación no autorizada - notoken'
        })
    }

   // console.log(token);

    try {
        const {uid} = jwt.verify( token, process.env.PRIVATE_KEY);

        req.uid = uid;
        
        const userAuth = await User.findById(uid);

        if (!userAuth) {
            return res.status(401).json({
                msg: 'Usuario no existente'
            })
        }
         
        req.userAuth = userAuth
        // Hay que verificar si el usuario está en modo activo

        if( !userAuth.estado ) {
            return res.status(401).json({
                msg: 'Usuario no activo en la base de datos'
            })
        }
        
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido o expirado, vuelva a loguearse'
        });
    }


}

module.exports = {
    validarJWT
}