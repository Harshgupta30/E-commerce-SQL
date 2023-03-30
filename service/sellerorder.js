const {connection,getclient} = require("./connection");
// connection();
const client = getclient();

const sellorddisp = async(s,un,callback)=>{
    const resp = {
        text:`select products.*,users.username,users.email,orders.quantity as qn from products,users,orders
        where products.status='active' and products.id>='${s}' and (products.id , users.username,orders.id) in (
            select pid,username,id from orders where
            seller='${un}'
        )
        order by id
        limit 5;`,
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

const revsellorddisp = async(s,un,callback)=>{
    const resp = {
        text:`select products.*,users.username,users.email,orders.quantity as qn from products,users,orders
        where products.status='active' and products.id<'${s}' and (products.id , users.username,orders.id) in (
            select pid,username,id from orders where
            seller='${un}'
        )
        order by id
        limit 5;`,
    }
    client.query(resp,(err,response)=>{
        // console.log(s,response.rows);
        callback(response.rows);
    });
}

module.exports = {sellorddisp,revsellorddisp};