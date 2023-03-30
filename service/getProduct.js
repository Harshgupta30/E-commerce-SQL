const {connection,getclient} = require("./connection");
// connection();
const client = getclient();

const getProduct = async(dbname,req,res,callback)=>{
    const resp = {
        text:`select * from ${dbname} order by id` ,
    }
    client.query(resp,(err,response)=>{
        // console.log(response.rows);
        callback(response.rows);
    });
    // console.log(resp);
    // callback(resp);
}



module.exports = getProduct;