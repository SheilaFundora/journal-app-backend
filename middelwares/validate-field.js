const {validationResult} = require("express-validator");
const {response} = require('express');

const validateFields = (req, res = response, next) => {
    const error = validationResult(req);

    if( ! error.isEmpty() ){
        return res.status(400).json({
            ok: false,
            error: error.mapped()
        })
    }
    next();

}

module.exports = {
    validateFields
}