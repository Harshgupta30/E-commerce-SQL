const {selldisp,revselldisp} = require("../service/sellerdisp");

const sellerpro = async(req,res)=>{
    let s  = parseInt(req.query.id);
    // console.log(req.session.username);
    // console.log(s,parseInt(req.query.id));
    selldisp(s,req.session.username,(response)=>{
        res.send(response);
    })
}

const sellerrev = async(req,res)=>{
    let s  = parseInt(req.query.id);
    // console.log(s,req.session.username);
    revselldisp(s,req.session.username,(response)=>{
        // console.log(response);
        const result = response.slice(-5);
        // console.log(result);
        res.send(result);
    })
}

module.exports = {sellerpro,sellerrev};