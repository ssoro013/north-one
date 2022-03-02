const Category = require('../../database/models/category');

module.exports = {
    create: (req, res) => {
        const {name, description} = req.body
        return Category.create({
            name, description
        })
        .then(response => {
            res.status(200).json({
                status: 'success',
                message: 'category successfully created',
                data: req.body
            })
        })
        .catch(err => {
            console.log(err)
            res.status('400').json({
            status: 'error',
            message: 'error creating category',
            data: req.body
            })
        })
    }
}
