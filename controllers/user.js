const {response, request} = require('express');

const userGet = (req = request, res = response) => {

    const params = req.query;

    res.json({
        params,
        ok: true,
        msg: 'get API'
    });
};

const userPost = (req, res = response) => {

    const body = req.body;

    res.json({
        body,
        ok: true,
        msg: 'post API'
    });
};

const userPut = (req, res = response) => {

    const id = req.params.id

    res.json({
        id: `Requested id: ${id}`,
        ok: true,
        msg: 'put API'
    });
};

const userDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete API'
    });
};

module.exports = {
    userDelete,
    userGet,
    userPost,
    userPut
}