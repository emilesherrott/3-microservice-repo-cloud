const axios = require("axios")

const { Sale } = require("../models/Sale")
const { aggregateSalesData, aggregateStylesData, formatStylesData } = require("../helpers/dataProcessor")

const salesInfo = async (req, res) => {
  try {
    const pottersId = req.pottersId
    const itemId = req.body.id
    const salesData = await Sale.getSalesInfo(pottersId, itemId)
    const aggregatedData = aggregateSalesData(salesData)
    const response = await axios.post("http://pottery-python:3001/generate-visualisation", aggregatedData)

    res.status(200).json({
      success: true,
      visualisatinon: response.data,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const styleInfo = async (req, res) => {
  try {
    const pottersId = req.pottersId
    const styleSaleResults = await Sale.styleInfo(pottersId)

    const aggregatedData = aggregateStylesData(styleSaleResults)
    const formattedData = formatStylesData(aggregatedData)

    const response = await axios.post("http://pottery-python:3001/generate-style-visualisation", formattedData);
    res.status(200).json({
      success: true,
      visualisatinon: response.data
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const makeSale = async (req, res) => {
  try {
    const ownersId = req.ownersId
    const data = req.body
    const purchase = await Sale.makeSale(ownersId, data)
    res.status(200).json({
      success: true,
      purchaseInfo: purchase,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  salesInfo,
  styleInfo,
  makeSale,
}
