const { response } = require("express");
const { connection, getclient } = require("./connection");
// connection();
const client = getclient();

const addorder = async (arr, quant,payment_id, user, callback) => {

    let id = parseInt(arr);
    // const resp = {
    //     text: `select cart.*,products.seller from cart,products
    //         where cart.id ='${id}' and cart.username='${user}' and products.id='${id}'`
    // }

    // client.query(resp, (err, response) => {
    //     let temp = response.rows[0];
    //     const qury = {
    //         text: `insert into orders (pid,seller,username,quantity) values (${temp.id},'${temp.seller}','${temp.username}',${temp.quantity})`
    //     }
    //     client.query(qury, (err, rsult) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //         else {
    //             const del = {
    //                 text: `delete from cart where id=${temp.id} and username='${temp.username}'`
    //             }
    //             client.query(del, (err, result) => {
    //                 if (err) {
    //                     console.log(err);
    //                 }
    //                 else {
    //                     callback();
    //                 }
    //             })
    //         }
    //     })


    // })

    try {
        await client.query('BEGIN');
        
        await client.query(`update products set quantity = quantity-'${quant}' where quantity>='${quant}' and id=${id}`);
       const  temp=  await client.query(`select cart.*,products.seller from cart,products
        where cart.id ='${id}' and cart.username='${user}' and products.id='${id}'`);
        // temp=temp.rows[0];
        // console.log(temp.rows[0]);
        await client.query(`insert into orders (pid,seller,username,quantity,payment_id) values (${temp.rows[0].id},'${temp.rows[0].seller}','${temp.rows[0].username}',${temp.rows[0].quantity},'${payment_id}')`);
        await client.query(`delete from cart where id=${temp.rows[0].id} and username='${temp.rows[0].username}'`);
        await client.query('COMMIT');
        callback(null,"sucess");
    }
    catch (err) {
        await client.query('ROLLBACK');
        callback(err,"fail");
        console.log("my rollback",err);
    }
}



module.exports = addorder;