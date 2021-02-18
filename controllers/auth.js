const { response, request } = require("express");
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { makeJWT } = require("../helpers/jwt-generator");


const authLogin = async(req = request, res = response) => {

    const {correo, password} = req.query;

    try {

        //Verificar si el email existe
        const user = await User.findOne({ correo });
        if(!user){
            return res.status(400).json({
                msg: 'Usuario / Contraseña no coinciden - correo'
            })
        }
        // Verificar si el user está activo en el sistema

        if (!user.estado){
            return res.status(400).json({
                msg: 'Usuario / Contraseña no coinciden - estado en false'
            })
        }

        // Verificar contraseña

        const validPassword = bcrypt.compareSync( password, user.password);

        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no coinciden - contraseña'
            })
        }

        // Generar el JWT
        const token = await makeJWT(user.id)

        res.json({
            token,
            user,
            msg: 'Login OK'
        })

        
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            msg: "Hable con el administrador" 
        })
        
    }

 

}

module.exports = {
    authLogin
}