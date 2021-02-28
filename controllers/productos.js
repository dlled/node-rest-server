const { response } = require('express');
const {Producto} = require('../models');
const User = require('../models/user');


const getProductos = async(req = request, res = response) => {

    const {limit = 5, offSet = 0} = req.query;

    const [productos, total] = await Promise.all([
        Producto.find( { estado: true } )
        .skip(Number(offSet))
        .limit(Number(limit))
        .populate('usuario','nombre')
        .populate('categoria', 'nombre'),
        Producto.countDocuments({estado: true})
    ])
    
    console.log(productos);

    res.json({
        productos,
        total
    });
};

const productoPorId = async(req = request, res = response) => {

    const {id} = req.params;

    const product = await Producto
                    .findById(id)
                    .populate('usuario','nombre')
                    .populate('categoria', 'nombre');

    res.json({
        product,
        ok: true,
        msg: 'categoria por id'
    });
};

const productoUpdate = async(req = request, res = response) => {

    const {id} = req.params;
    
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();

    data.usuario = req.userAuth._id

    const product = await Producto
                    .findByIdAndUpdate(id, data, {new: true})
                    .populate('usuario','nombre')
                    .populate('categoria', 'nombre');

    res.json({
        product,
        ok: true,
        msg: 'put API'
    });
};

const productoDelete = async(req = request, res = response) => {

    const {id} = req.params;
    
    
    // Fisicamente borrado NO RECOMENDABLE
    //const user = await User.findByIdAndDelete(id);

    // Borrado lógico, poniendo el flag de estado a false
    const product = await Producto
                    .findByIdAndUpdate(id, {estado: false}, {new: true})
                    .populate('usuario','nombre')
                    .populate('categoria', 'nombre');

    res.json({
        product,
        ok: true,
        msg: 'Category turned down by id'
    });
};

const crearProducto = async(req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    
    const {categoria, precio = 0} = req.body

    const productoDB = await Producto.findOne({nombre});

    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe en la base de datos`
        })
    }

    const data = {
        nombre,
        usuario: req.userAuth._id,
        categoria,
        precio
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json({
        producto,
        msg: 'New product added to db'
    });
};

module.exports = {
    crearProducto,
    getProductos,
    productoPorId,
    productoUpdate,
    productoDelete
}