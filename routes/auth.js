const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');


router.post('/', async (req, res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({userName: req.body.userName});
    if (!user) return res.status(400).send("invalid user name or password.");
    
    const isValidPass = await bcrypt.compare(req.body.password, user.password);
    if(!isValidPass) return res.status(400).send("invalid user name or password.");

    const token = user.generateAuthToken();
    res.send(token);
});

module.exports = router;
