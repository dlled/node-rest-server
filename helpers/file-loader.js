const { v4: uuidv4 } = require('uuid');
const path = require('path');


const fileLoader = ( files, validExt = ['png', 'jpg', 'jpeg', 'gif'], location = '' ) => {

    return new Promise((resolve, reject) => {

        if(!files){
            reject('No hay archivos en la petición')
        }
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const { myFile } = files;

        //Manejo de extensiones
        const extension = myFile.name.split('.').pop();

        // Identificador unico
        const tempName = uuidv4() + '.' + extension;

        if (!validExt.includes(extension)) {
            return reject(`Extension ${extension} no valida, solo permitidas => ${validExt}`);
        }

        const uploadPath = path.join(__dirname, '../uploads', location, tempName)

        // Use the mv() method to place the file somewhere on your server
        myFile.mv(uploadPath, (err) => {
            if (err) {
                console.log(err);
                return reject(err);
            }

            resolve(tempName);
        })
    });
}


module.exports = {
    fileLoader
}