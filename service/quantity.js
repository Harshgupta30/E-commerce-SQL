const {connection,getclient} = require("./connection");
// connection();
const client = getclient();

const getquantity = async(id,req,res,callback)=>{
    const resp = {
        text:`select cart.quantity as cq,products.quantity as pq,products.price from cart,products
        where cart.id ='${id}' and cart.username='${req.session.username}' and products.id='${id}'`,
    }
    client.query(resp,(err,response)=>{
        // console.log(response.rows);
        if(err){
            console.log(err);
        }
        else{
            callback(response.rows);
        }
    });

}

module.exports = getquantity;