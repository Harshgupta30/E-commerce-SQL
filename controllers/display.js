const diproducts = require("../service/disproduct");
const revdiproducts = require("../service/revdispproduct");

const gethome = async(req,res)=>{
    let s  = parseInt(req.query.id);
    // console.log(s,parseInt(req.query.id));
    diproducts(s,(response)=>{
        res.send(response);
    })
}

const revhome = async(req,res)=>{
    let s  = parseInt(req.query.id);
    // console.log(s,req.query);
    revdiproducts(s,(response)=>{
        // console.log(response);
        const result = response.slice(-5);
        // console.log(result);
        res.send(result);
    })
}

module.exports = {gethome,revhome};