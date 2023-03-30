const {connection,getclient} = require("./connection");
// connection();
const client = getclient();

const selldisp = async(s,un,callback)=>{
    const resp = {
        text:`select * from products
        where status='active' and id>='${s}' and seller='${un}'
        order by id
        limit 5;`,
    }
    client.query(resp,(err,response)=>{
        // console.log(s,response.rows);
        callback(response.rows);
    });
}

const revselldisp = async(s,un,callback)=>{
    // console.log(s,un);
    const resp = {
        text:`select * from products
        where status='active' and id<'${s}' and seller='${un}'
        order by id;`,
    }
    client.query(resp,(err,response)=>{
        // console.log(s,response.rows);
        if(err){
            console.log(err);
        }
        else{

            callback(response.rows);
        }
    });
}

module.exports = {selldisp,revselldisp};