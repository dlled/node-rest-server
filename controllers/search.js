const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Categoria, Producto } = require("../models");


const secureCollections = [
    'users',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    console.log(esMongoID)

    if (esMongoID) {
        const user = await User.findById(termino);

        return res.json({
            results: (user) ? [user] : []
        })

    }

    const regex = new RegExp(termino, 'i');

    const users = await User.find({
        $or: [
            { nombre: regex },
            { correo: regex },
        ],
        $and: [{ estado: true }]
    });

    res.json({
        results: users
    })
}
const buscarCategorias = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria
        .find()
        .populate('usuario', 'nombre')
        .find({
            $and: [
                {
                    $or: [
                        { nombre: regex },
                    ]
                },
            { estado: true }
            ]
        })

    res.json({
        results: categorias
    })
}

const buscarProductos = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const producto = await Producto
            .findById(termino)
            .populate('categoria', 'nombre')
            .populate('usuario', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const productos = await Producto
        .find()
        .populate('categoria', 'nombre')
        .populate('usuario', 'nombre')
        .find({
            $and: [
                { $or: [
                        { nombre: regex },
                    ]
                },
            { estado: true }
            ]
        })

    res.json({
        results: productos
    })
}


const search = async (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    let data = {}

    if (!secureCollections.includes(coleccion)) {
        return res.status(400).json({
            msg: 'Not permitted, collection no exxistente'
        })
    }

    switch (coleccion) {
        case 'users':
            await buscarUsuarios(termino, res);
            break;

        case 'categorias':
            await buscarCategorias(termino, res);
            break;

        case 'productos':
            await buscarProductos(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'error en búsqueda',
            })
            break;
    }

    // res.json({
    //     data,
    //     coleccion,
    //     termino,
    //     msg: "search"
    // })
}

module.exports = {
    search
}