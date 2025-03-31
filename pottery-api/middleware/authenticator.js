const jwt = require('jsonwebtoken')

function authenticator(req, res, next){
    const token = req.headers['authorisation'];

    if (token) {
        jwt.verify(token, process.env.SECRET_TOKEN, async (err, data) => {
            if(err){
                res.status(403).json({ err: 'Invalid token' })
            } else {
                if (data.pottersId) {
                    req.pottersId = data.pottersId
                } 
                if (data.ownersId) {
                    req.ownersId = data.ownersId
                }
                next();
            }
        })
    } else { 
        res.status(403).json({ err: 'Missing token' })
    }
}

module.exports = {
    authenticator
}