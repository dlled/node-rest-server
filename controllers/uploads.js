const { request, response } = require("express");
const { fileLoader } = require("../helpers");
const { User, Producto } = require('../models')
const path = require('path');
const fs = require('fs');


const loadFile = async (req = request, res = response) => {

    try {
        const filePath = await fileLoader(req.files, ['txt', 'md', 'pdf'], 'texts')
        res.json({
            msg: 'Successfully uploaded',
            path: filePath
        })

    } catch (error) {
        res.status(400).json({
            err: error,
            msg: 'error, hable con el administrador'
        })
    }
}

const updateFile = async (req = request, res = response) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'users':
            modelo = await User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un user con id: ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con id: ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Hable con el administrador ' });
            break;
    }

    if( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const imgPath = path.join( __dirname, '../uploads', coleccion, modelo.img);

        if(fs.existsSync( imgPath )) {
            fs.unlinkSync( imgPath );
        }
    }

    try {
        const nombre = await fileLoader(req.files, undefined, coleccion);
        modelo.img = nombre;
        await modelo.save();
        res.json({
            modelo
        })
    } catch (error) {
        res.status(400).json({
            msg: "Ocurrió un error",
            error: error
        })
    }
}

const getFile = async(req, res  = response ) => {

    const {id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'users':
            modelo = await User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un user con id: ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con id: ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Hable con el administrador ' });
            break;
    }

    if( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const imgPath = path.join( __dirname, '../uploads', coleccion, modelo.img);

        if(fs.existsSync( imgPath )) {
            res.sendFile( imgPath );
        }
    } else {
        const placeholderPath = path.join( __dirname, '../uploads', 'placeholder.jpg');
        res.sendFile( placeholderPath );
    }

    
} 

module.exports = {
    loadFile,
    updateFile,
    getFile
}