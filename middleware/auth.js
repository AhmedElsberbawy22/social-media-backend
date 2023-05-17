const jwt = require('jsonwebtoken');


function auth (req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No Token Provided');

    try{
        // if it valid it will decoded and return payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }catch(ex){
        res.status(400).send('Invalid Token.');
    }
}

module.exports = auth;