const { Router } = require('express')

const { authenticator } = require('../middleware/authenticator')
const ceramicsController = require('../controllers/ceramics')

const ceramicsRouter = Router()

ceramicsRouter.get("/", ceramicsController.index)
ceramicsRouter.get("/inventory", authenticator, ceramicsController.inventory)
ceramicsRouter.post("/create", authenticator, ceramicsController.create)

module.exports = {
    ceramicsRouter
}