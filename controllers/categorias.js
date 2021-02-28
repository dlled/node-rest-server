const { response } = require('express');
const {Categoria} = require('../models');
const User = require('../models/user');


const categoriasGet = async(req = request, res = response) => {

    const {limit = 5, offSet = 0} = req.query;

    const [categorias, total] = await Promise.all([
        Categoria.find( { estado: true } )
        .skip(Number(offSet))
        .limit(Number(limit))
        .populate('usuario','nombre'),
        Categoria.countDocuments({estado: true})
    ])
    
    console.log(categorias);

    res.json({
        categorias,
        total
    });
};

const categoriaPorId = async(req = request, res = response) => {

    const {id} = req.params;

    const cat = await Categoria.findById(id);

    res.json({
        cat,
        ok: true,
        msg: 'categoria por id'
    });
};

const categoriaUpdate = async(req = request, res = response) => {

    const {id} = req.params;
    
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();

    const cat = await Categoria.findByIdAndUpdate(id, data);

    res.json({
        cat,
        ok: true,
        msg: 'put API'
    });
};

const categoriaDelete = async(req = request, res = response) => {

    const {id} = req.params;
    
    
    // Fisicamente borrado NO RECOMENDABLE
    //const user = await User.findByIdAndDelete(id);

    // Borrado lógico, poniendo el flag de estado a false
    const cat = await Categoria.findByIdAndUpdate(id, {estado: false})
    

    res.json({
        cat,
        ok: true,
        msg: 'Category turned down by id'
    });
};

const crearCategoria = async(req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre} ya existe en la base de datos`
        })
    }

    const data = {
        nombre,
        usuario: req.userAuth._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json({
        categoria,
        msg: 'New category added to db'
    });
};

module.exports = {
    crearCategoria,
    categoriasGet,
    categoriaPorId,
    categoriaUpdate,
    categoriaDelete
}