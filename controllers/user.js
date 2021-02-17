const {response, request} = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const userGet = async(req = request, res = response) => {

    const {limit = 5, offSet = 0} = req.query;

    const [usuarios, total] = await Promise.all([
        User.find( { estado: true } )
        .skip(Number(offSet))
        .limit(Number(limit)),
        User.countDocuments({estado: true})
    ])
    

    res.json({
        usuarios,
        total
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

    const {id} = req.params;
    const {_id, password, google, ...data} = req.query;

    if (password) {
        //Encrypt
        const salt = bcrypt.genSaltSync();
        data.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, data);

    res.json({
        user,
        ok: true,
        msg: 'put API'
    });
};

const userDelete = async(req = request, res = response) => {

    const {id} = req.params;
    
    // Fisicamente borrado NO RECOMENDABLE
    //const user = await User.findByIdAndDelete(id);

    // Borrado lógico, poniendo el flag de estado a false
    const user = await User.findByIdAndUpdate(id, {estado: false})


    res.json({
        user,
        ok: true,
        msg: 'User turned down by id'
    });
};

module.exports = {
    userDelete,
    userGet,
    userPost,
    userPut
}