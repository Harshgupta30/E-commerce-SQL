const {sellorddisp,revsellorddisp} = require("../service/sellerorder");

const sellorder = (req,res)=>{
    res.render("sellerorder",{name:req.session.username});
}

const sellerord = async(req,res)=>{
    let s  = parseInt(req.query.id);
    // console.log(req.session.username);
    // console.log(s,parseInt(req.query.id));
    sellorddisp(s,req.session.username,(response)=>{
        res.send(response);
    })
}

const sellerrevord = async(req,res)=>{
    let s  = parseInt(req.query.id);
    // console.log(s,req.query);
    revsellorddisp(s,req.session.username,(response)=>{
        // console.log(response);
        const result = response.slice(-5);
        // console.log(result);
        res.send(result);
    })
}




module.exports = {sellorder,sellerord,sellerrevord};