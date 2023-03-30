const {connection,getclient} = require("./connection");
// connection();
const client = getclient();
const updateProduct = async(dbname,myquery)=>{
    // const resp = {
    //     text:`update ${dbname}
    //     set isVerified = ${newvalues.isVerified}
    //     where token = ${myquery.token}`,
    // }
    // console.log(dbname,myquery,newvalues)
    client.query(`delete from ${dbname}
    where username ='${myquery.username}' and id = '${myquery.id}'`);
}

module.exports = updateProduct;