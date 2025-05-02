const db = require("../../db/connection")


const selectUsers = ()=>{

    return db.query(`SELECT * FROM users`)
}

module.exports = {selectUsers}