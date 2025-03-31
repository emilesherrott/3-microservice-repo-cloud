const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/User');

async function register(req, res) {
    try {
      const data = req.body;
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
      data["password"] = await bcrypt.hash(data.password, salt);
      const result = await User.create(data);
      res.status(201).send(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}

async function potterLogin(req, res) {
    const data = req.body;
    try {
      const user = await User.getOnePotterByUsername(data.username);
      if(!user) { throw new Error('No user with this username') }
      const match = await bcrypt.compare(data.password, user.password);
  
      if (match) {
        const payload = { 
            pottersId: user.potters_id,
            username: user.username
        }
        const sendToken = (err, token) => {
            if(err){ throw new Error('Error in token generation') }
            res.status(200).json({
                success: true,
                token: token,
            });
        }

        jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 3600 }, sendToken);

      } else {
        throw new Error('User could not be authenticated')  
      }
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
}

async function ownerLogin(req, res) {
    const data = req.body;
    try {
      const user = await User.getOneOwnerByUsername(data.username);
      if(!user) { throw new Error('No user with this username') }
      const match = await bcrypt.compare(data.password, user.password);
  
      if (match) {
        const payload = { 
            ownersId: user.owners_id,
            username: user.username
        }
        const sendToken = (err, token) => {
            if(err){ throw new Error('Error in token generation') }
            res.status(200).json({
                success: true,
                token: token,
            });
        }

        jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 3600 }, sendToken);

      } else {
        throw new Error('User could not be authenticated')  
      }
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
}


module.exports = {
    register, potterLogin, ownerLogin
}                           