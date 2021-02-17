const {response, request} = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const userGet = (req = request, res = response) => {

    const params = req.query;

    res.json({
        params,
        ok: true,
        msg: 'get API'
    });
};

const userPost = async(req = request, res = response) => {

    const {nombre, correo, password , rol } = req.query; 
    const user = new User({nombre, correo, password, rol});
    //Verificar si existe el correo (EXPRESS-VALIDATOR)
    
    // Encriptar la contraseña (BCRYPTJS)
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardar en db

    await user.save();
    

    res.json({
        user,
        ok: true,
        msg: 'New user added to db'
    });
};

const userPut = async(req = request, res = response) => {

    const id = req.params.id;
    const {_id, password, google, correo, ...resto} = req.body;

    // TODO Validar contra la base de datos

    if (password) {
        //Encrypt
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        user,
        ok: true,
        msg: 'put API'
    });
};

const userDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete API'
    });
};

module.exports = {
    userDelete,
    userGet,
    userPost,
    userPut
}