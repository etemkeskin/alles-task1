const User = require('../models/user');

// Login
exports.login = async (req, res, next) => {

    try {
        const user = await User.findOne({
            name: req.body.name,
            password: req.body.password
        });

        if (!user){
            return res.status(400).json({
                success: false,
                message: "could not find user!",
                data: user
            });
        }else{
            return res.status(200).json({
                success: true,
                message: "Logged in successfully!",
                data: user
            });
        }
        
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Login failed!' });
    }
};