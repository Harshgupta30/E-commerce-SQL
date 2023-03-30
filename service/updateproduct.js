const {connection,getclient} = require("./connection");
// connection();
const client = getclient();

const productupdate = async(pid,pn,pp,pd,sel,quant,callback)=>{
    // console.log(pid,pn,pp,pd,sel);
    const resp = {
        text : `update products
        set name = '${pn}',price = '${pp}', details = '${pd}', seller = '${sel}',quantity = '${quant}'
        where id = ${pid}`
    }
    client.query(resp,(err,response)=>{
        callback()
    });
}

module.exports = productupdate;