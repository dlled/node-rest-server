const Role = require("../models/role");
const User = require("../models/user");

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

module.exports = {
    roleValidator,
    emailValidator,
    userByIdValidator
}