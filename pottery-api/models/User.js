const db = require("../database/connect")

class User {
  constructor({ potters_id, studio_postcode, owners_id, postcode, username, firstname, lastname, password }) {
    this.potters_id = potters_id
    this.studio_postcode = studio_postcode
    this.owners_id = owners_id
    this.postcode = postcode
    this.username = username
    this.firstname = firstname
    this.lastname = lastname
    this.password = password
  }

  static getOnePotterById = async (id) => {
    const response = await db.query("SELECT * FROM potters WHERE potters_id = $1;", [id])
    if (response.rows.length != 1) {
        throw Error("Unable to locate user")
    }
    return new User(response.rows[0])
  }

  static getOnePotterByUsername = async (username) => {
    const response = await db.query("SELECT * FROM potters WHERE username = $1;", [username])
    if (response.rows.length != 1) {
        throw new Error("Unable to locate user")
    }
    return new User(response.rows[0])
  }
  
  static getOneOwnerById = async (id) => {
    const response = await db.query("SELECT * FROM owners WHERE owners_id = $1;", [id])
    if (response.rows.length != 1) {
        throw Error("Unable to locate user")
    }
    return new User(response.rows[0])   
  }

  static getOneOwnerByUsername = async (username) => {
    const response = await db.query("SELECT * FROM owners WHERE username = $1;", [username])
    if (response.rows.length != 1) {
        throw new Error("Unable to locate user")
    }
    return new User(response.rows[0])
  }

  static create = async (data) => {
    const { studioPostcode = null, postcode = null, username, firstname, lastname, password } = data
    if (studioPostcode) {
      const response = await db.query("INSERT INTO potters (username, firstname, lastname, password, studio_postcode) VALUES ($1, $2, $3, $4, $5) RETURNING potters_id;", [username, firstname, lastname, password, studioPostcode])
      const newId = response.rows[0].potters_id
      const newPotter = await User.getOnePotterById(newId)
      return newPotter
    } else if (postcode) {
        const response = await db.query("INSERT INTO owners (username, firstname, lastname, password, postcode) VALUES ($1, $2, $3, $4, $5) RETURNING owners_id;", [username, firstname, lastname, password, postcode])
        const newId = response.rows[0].owners_id
        const newOwner = await User.getOneOwnerById(newId)
        return newOwner
    }
  }
}

module.exports = {
    User
}