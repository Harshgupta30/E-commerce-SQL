const csv = require('csv-parser');
const fs = require('fs');
const addcsv = require("../service/csvupload");
const insertProduct = require('../service/insertProduct');

const csvupload = (req, res) => {
    let results = [],temp;
    console.log(req.file.filename);
    // addcsv(req.file.filename);
    fs.createReadStream("uploads_csv/" + req.file.filename)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log(results);
            for (let i = 0; i < results.length; i++) {
                if(results.seller){
                    temp = { image: results[i].image, name: results[i].name, price: results[i].price, details: results[i].details, seller: results[i].seller, status: results[i].status, quantity: results[i].quantity }; 
                }
                else{
                    temp = { image: results[i].image, name: results[i].name, price: results[i].price, details: results[i].details, seller: req.session.username, status: results[i].status, quantity: results[i].quantity };
                }
                // console.log(temp);
                insertProduct("products", req, res, temp);
            }
        });
    res.redirect("/snew");
}

module.exports = csvupload;