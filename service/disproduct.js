const {connection,getclient} = require("./connection");
// connection();
const client = getclient();

const diproducts = async(s,callback)=>{
    const resp = {
        text:`select * from products
        where status='active' and id>='${s}'
        order by id
        limit 5;`,
    }
    client.query(resp,(err,response)=>{
        // console.log(s,response.rows);
        callback(response.rows);
    });
}

module.exports = diproducts;