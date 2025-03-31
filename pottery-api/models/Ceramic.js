const db = require('../database/connect')

class Ceramic {
    constructor({ ceramics_id, piece_name, clay, style, price, size, piece_name_owner_id, firstname, lastname }) {
        this.id = ceramics_id
        this.piece = piece_name
        this.clay_used = clay
        this.style = style
        this.price = price
        this.size = size
        this.owner = piece_name_owner_id
        this.creator = `${firstname} ${lastname}`
    }

    static getAll = async () => {
        const response = await db.query(`
        SELECT 
            ceramics.ceramics_id,
            ceramics.piece_name, 
            ceramics.clay, 
            ceramics.style, 
            ceramics.price, 
            ceramics.size, 
            potters.firstname, 
            potters.lastname
        FROM 
            ceramics
        JOIN 
            potters ON ceramics.piece_name_potter_id = potters.potters_id;
        `)
        if(response.rows.length === 0){
            throw Error('Ceramic pieces not found')
        }
        return response.rows.map(c => new Ceramic(c))
    }

    static getInventory = async (pottersId) => {
        const response = await db.query('SELECT * FROM ceramics WHERE piece_name_potter_id = $1;', [pottersId])
        if(response.rows.length === 0) {
            throw Error('Ceramic pieces not found')
        }
        return response.rows.map(c => new Ceramic(c))
    }

    static create = async (pottersId, data) => {
        console.log('Ceramic model create id', pottersId)
        const { pieceName, clay, style, price, size } = data
        const response = await db.query('INSERT INTO ceramics (piece_name, clay, style, price, size, piece_name_potter_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [pieceName, clay, style, price, size, pottersId])
        if(response.rows.length === 0) {
            throw Error('Ceramic piece not added')
        }
        return new Ceramic(response.rows[0])
    }

    static getPieceAndPrice = async () => {
        const response = await db.query('SELECT piece_name, price FROM ceramics;')
        if(response.rows.length === 0){
            throw Error('No ceramic pieces available')
        }
        return response.rows.map(c => new Ceramic(c))
    }
}

module.exports = {
    Ceramic
}


