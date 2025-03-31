const { Router } = require('express')

const { authenticator } = require('../middleware/authenticator')
const salesController = require('../controllers/sales')

const salesRouter = Router()

salesRouter.post("/salesInfo", authenticator, salesController.salesInfo)
salesRouter.get("/styleInfo", authenticator, salesController.styleInfo)
salesRouter.post("/makeSale", authenticator, salesController.makeSale)

module.exports = {
    salesRouter
}