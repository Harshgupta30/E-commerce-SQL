const getquant = require("../service/quantity");

const getquantity = (req,res)=>{
    id = req.body.id;
    // console.log("id",id);
    getquant(id,req,res,(response)=>{
        res.send(response[0]);
    })
}

module.exports = {getquantity};