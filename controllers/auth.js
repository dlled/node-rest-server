const { response, request } = require("express");
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { makeJWT } = require("../helpers/jwt-generator");
const { googleVerify } = require("../helpers/google-verify");


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

const googleSignin = async(req = request, res = response) => {

    const {id_token} = req.body;

    try {

        const {nombre, correo, img} = await googleVerify(id_token);

        let usuario = await User.findOne({correo});
        
        if( !usuario ) {

            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };

            usuario = new User(data);
            await usuario.save();
        }

        // Si user en BD
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Hable con admin, user bloqueado'
            })
        }

        // Generar jwt
        const token = await makeJWT(usuario.id);

        res.json({
            usuario,
            token
        })

        res.json({
            msg: 'Google Sign In success',
            
        })
    } catch (error) {
        res.status(400).json({
            msg: 'token de Google no reconocido',
        })
    }


}

module.exports = {
    authLogin,
    googleSignin
}