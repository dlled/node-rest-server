const { response } = require("express");

const validarArchivo = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
        return res.status(400).json({
            msg: 'No files in request, upload one!'
        });
    }
    next();
}

module.exports = {
    validarArchivo
}