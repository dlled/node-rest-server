const jwt = require('jsonwebtoken');



const makeJWT = (uid = "") => {
    return new Promise( (resolve, reject) => {
        const payload = {uid};
        jwt.sign(payload, process.env.PRIVATE_KEY, {
            expiresIn: '1h',
        }, (err, token) => {
            if(err){
                reject( 'No se pudo generar el token ', err);
            } else {
                resolve(token);
            }
        })
    });
}

module.exports = {
    makeJWT
}