
const {Categoria, User, Role, Producto} = require('../models');

const roleValidator = async(rol = '') => {
    const exists = await Role.findOne({rol});
    if(! exists){
        throw new Error(`El rol ${rol}, no está definido en la bbdd`);
    }
}

const emailValidator = async(correo = '') => {

    const exists = await User.findOne({ correo });
    if (exists){
        throw new Error(`Ese email ya está registrado en la bbdd`);
    }

} 

const userByIdValidator = async( id ) => {
    
    const exists = await User.findById(id);

    if(!exists) {
        throw new Error(`El usuario con id: ${id}, no existe en la bbdd`)
    }
}

const categoriaByIdValidator = async( id ) => {
    
    const exists = await Categoria.findById(id);

    if(!exists) {
        throw new Error(`La categoria con id: ${id}, no existe en la bbdd`);
    }
}

const categoriaValidator = async(nombre = "") => {
    nombre = nombre.toUpperCase();

    const exists = Categoria.findOne({nombre});

    if( !exists ){
        throw new Error(`La categoría ${nombre} no existe en la bbdd`);
    }
}

const productoByIdValidator = async( id ) => {
    
    const exists = await Producto.findById(id);

    if(!exists) {
        throw new Error(`La categoria con id: ${id}, no existe en la bbdd`);
    }
}

const productoValidator = async(nombre = "") => {
    nombre = nombre.toUpperCase();

    const exists = await Producto.findOne({nombre});

    if( exists ){
        throw new Error(`El producto ${nombre} ya existe en la bbdd`);
    }
}

const existeColeccion = (coleccion, permitidas = []) => {

    const permitted = permitidas.includes(coleccion);

    if ( !permitted ){
        throw new Error(`La coleccion ${coleccion}, no es accesible o no existe`);
    }

    return true;

}

module.exports = {
    roleValidator,
    emailValidator,
    userByIdValidator,
    categoriaByIdValidator,
    categoriaValidator,
    productoByIdValidator,
    productoValidator,
    existeColeccion
}