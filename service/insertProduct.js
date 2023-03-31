const {connection,getclient} = require("./connection");
// connection();
const client = getclient();

const insertProduct = async(dbname,req,res,data)=>{
    client.query(`insert into ${dbname}(image,name,price,details,seller,status,quantity) values('${data.image}','${data.name}','${data.price}','${data.details}','${data.seller}','${data.status}','${data.quantity}')`)
}



module.exports = insertProduct;