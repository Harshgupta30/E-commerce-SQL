const {connection,getclient} = require("./connection");
// connection();
const client = getclient();

const deleteProduct = async(dbname,myquery,newvalues)=>{
    // const resp = {
    //     text:`update ${dbname}
    //     set isVerified = ${newvalues.isVerified}
    //     where token = ${myquery.token}`,
    // }
    // console.log(dbname,myquery,newvalues)
    client.query(`update ${dbname}
    set status = '${newvalues.status}'
    where id = '${myquery.id}'`);
}

module.exports = deleteProduct;