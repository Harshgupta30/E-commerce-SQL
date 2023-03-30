const getdata = require("../service/getCart");
const insert = require("../service/insertCart");
const update = require("../service/updateCart");

const addtocart = async(req,res)=>{
    let { id } = req.query;
    let username = req.session.username;
    let flag = false;
    let quant = 1;
    // let collection = db.collection("cart");
    // let response = await collection.find({}).toArray();
    getdata("cart",req,res,(response)=>{
        response.forEach(element=>{
            if(element.username ==username && element.id==id){
                flag = true;
                quant = (element.quantity + 1);
                // console.log(quant);
                
            }
        })
        if(flag==true){
            var myquery = {username:username,id:id};
            // var newvalues = {$set:{quantity:quant++}};
            var newvalues = {quantity:quant++};
            update("cart",myquery,newvalues);
            
        }
        else{
            let temp = {username:username,id:id,quantity:quant};
            // console.log(temp);
            insert("cart",req,res,temp);
        }
    })
    
    
    res.redirect("/home");
}

module.exports = addtocart;