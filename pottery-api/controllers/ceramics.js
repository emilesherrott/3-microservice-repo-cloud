const axios = require('axios')

const { Ceramic } = require('../models/Ceramic')

const index = async (req, res) => {
    try {
        const ceramics = await Ceramic.getAll()
        res.status(200).json(ceramics)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const inventory = async (req, res) => {
    try {
        const pottersId = req.pottersId
        const result = await Ceramic.getInventory(pottersId)
        res.status(200).json(result)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const create = async (req, res) => {
    try {
        const pottersId = req.pottersId
        const data = req.body
        const result = await Ceramic.create(pottersId, data)
        res.status(200).json({
            "success": true,
            "result": result
        })
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
}


const salesInfo = async (req, res) => {
    try {
        const pottersId = req.pottersId
        const salesData = await Ceramic.getSalesInfo(pottersId)
        console.log('salesInfo controller', salesData)

        res.status(200).json(salesData)
    } catch (err) {
        res.status(500).json({ error: "error"})
    }
}

module.exports = {
    index,
    inventory,
    create,
    salesInfo
}