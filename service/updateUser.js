const {connection,getclient} = require("./connection");
// connection();
const client = getclient();

const updateUser = async(dbname,myquery,newvalues)=>{
    // const resp = {
    //     text:`update ${dbname}
    //     set isVerified = ${newvalues.isVerified}
    //     where token = ${myquery.token}`,
    // }
    // console.log(dbname,myquery,newvalues)
    client.query(`update ${dbname}
    set isVerified = true
    where token = ${myquery.token}`);
}

module.exports = updateUser;