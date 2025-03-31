const { Router } = require('express');

const userController = require('../controllers/users.js');

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/potter/login", userController.potterLogin);
userRouter.post("/owner/login", userController.ownerLogin);

module.exports = { 
    userRouter
}