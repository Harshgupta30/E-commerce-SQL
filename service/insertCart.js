const {connection,getclient} = require("./connection");
// connection();
const client = getclient();

const insertCart = async(dbname,req,res,data)=>{
    // console.log(data);
    let id = parseInt(data.id);
    client.query(`insert into ${dbname} values('${id}','${data.username}','${data.quantity}')`);
}



module.exports = insertCart;