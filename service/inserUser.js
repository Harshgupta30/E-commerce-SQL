const {connection,getclient} = require("./connection");
// connection();
const client = getclient();

const insertUser = async(dbname,req,res,data)=>{
    client.query(`insert into ${dbname} values('${data.name}','${data.username}','${data.password}','${data.email}','${data.isVerified}','${data.token}','user')`)
}



module.exports = insertUser;