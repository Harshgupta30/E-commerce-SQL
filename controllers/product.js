const getdata = require("../service/getProduct");

const getpro = async(req, res) => {
    // let collection = db.collection("products");
    // let response = await collection.find({}).toArray();
    getdata("products",req,res,(response)=>{
        res.send(response);
    })

    

}

module.exports = getpro;