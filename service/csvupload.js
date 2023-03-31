const { response } = require("express");
const { connection, getclient } = require("./connection");
// connection();
const client = getclient();

const addcsv = (file)=>{
    console.log(typeof(file));
    client.query(`copy products from '${file}'
    DELIMITER ','
    CSV Header`)
}

module.exports = addcsv;