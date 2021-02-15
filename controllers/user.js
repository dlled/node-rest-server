const {response} = require('express');

const userGet = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'get API'
    });
};

const userPost = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'post API'
    });
};

const userPut = (req, res = response) => {
    res.json({
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