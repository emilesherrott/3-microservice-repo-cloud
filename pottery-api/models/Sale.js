const db = require("../database/connect")

class Sale {
  constructor({ sale_id, piece_name, sale_time, sale_number, style, ceramic_item_purchaser_id }) {
    this.saleId = sale_id
    this.piece = piece_name
    this.saleTime = sale_time
    this.saleNumber = sale_number
    this.style = style
    this.purchaserId = ceramic_item_purchaser_id
  }

  static getSalesInfo = async (pottersId, itemId) => {
    const response = await db.query(
      "SELECT ceramics.piece_name, sales.sale_time, sales.sale_number FROM sales JOIN ceramics ON sales.ceramic_item_id = ceramics.ceramics_id JOIN potters ON ceramics.piece_name_potter_id = potters.potters_id WHERE potters.potters_id = $1 AND ceramics.ceramics_id = $2;",
      [pottersId, itemId]
    )
    if (response.rows.length === 0) {
      throw Error("No sales information available")
    }
    return response.rows.map((s) => new Sale(s))
  }


  static styleInfo = async (pottersId) => {
    const response = await db.query(
      "SELECT c.style, s.sale_number FROM potters p JOIN ceramics c ON p.potters_id = c.piece_name_potter_id JOIN sales s ON c.ceramics_id = s.ceramic_item_id WHERE p.potters_id = $1;", [pottersId]
    )
    if(response.rows.length === 0) {
      throw Error("No sales information available")
    }
    return response.rows.map((s) => new Sale(s))
  }



  static makeSale = async (ownersId, data) => {
    const { saleTime, saleNumber, ceramicItem } = data 
    const response = await db.query(
      "INSERT INTO sales (sale_time, sale_number, ceramic_item_id, ceramic_item_purchaser_id) VALUES ($1, $2, $3, $4) RETURNING *;", [saleTime, saleNumber, ceramicItem, ownersId]
    )
    if(response.rows.length === 0) {
      throw Error("Purchase unable to be made")
    }
    return new Sale(response.rows[0])
  }
}

module.exports = {
    Sale
}