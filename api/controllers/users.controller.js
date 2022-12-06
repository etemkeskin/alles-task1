const User = require('../models/user');

// Create and Save a new Product
exports.create = async (req, res, next) => {
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password
    });
    
    try {
        const result = await user.save()
        console.log('result', result);
        return res.status(201).json({
            message: "User successfully added!",
            user: result
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Creation failed!' });
    }
};