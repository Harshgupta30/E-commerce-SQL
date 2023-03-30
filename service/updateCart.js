const {connection,getclient} = require("./connection");
// connection();
const client = getclient();

const updateProduct = async(dbname,myquery,newvalues)=>{
    // const resp = {
    //     text:`update ${dbname}
    //     set isVerified = ${newvalues.isVerified}
    //     where token = ${myquery.token}`,
    // }
    // console.log(dbname,myquery,newvalues)
    client.query(`update ${dbname}
    set quantity = '${newvalues.quantity}'
    where username ='${myquery.username}' and id = '${myquery.id}'`);
}

module.exports = updateProduct;