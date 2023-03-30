const addorder = require("../service/addorder");
const getdata = require("../service/getProduct");

const postorder = (req,res,)=>{
    // console.log(req.body);
    addorder(req.body.id,req.body.quant,req.session.username,(err,s)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send();
        }
    });
}

const getorder = (req,res)=>{
    if(req.session.logged_in){
        res.render("order",{ name: req.session.username });
    }
    return;
}


const getorderdetails = (req,res)=>{
    let order = {[req.session.username]:{}};
    getdata("orders",req,res,(response)=>{
        // console.log(response,)
        response.forEach(element => {
            if(element.username==req.session.username){
                Object.assign(order[req.session.username], { [element.pid]: { quantity: element.quantity } })
            }            
        });
        res.json(order[req.session.username]);
    })
}

module.exports = {getorder,postorder,getorderdetails};