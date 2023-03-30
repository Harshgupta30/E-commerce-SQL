const getdata = require("../service/getProduct");
const insert = require("../service/insertProduct");
const del = require("../service/deletepro");
const productupdate = require("../service/updateproduct");

const sellerpage = (req,res)=>{
    if(req.session.logged_in){
        res.render("seller", { name: req.session.username });
    }
}

const sdelpro = (req,res)=>{
    let { id } = req.query;
    // console.log(id);
    myquery = {id:id};
    newvalues = {status:"deactive"};
    del("products",myquery,newvalues)
    res.redirect("/sellerpage");
}

const supdate = (req,res)=>{
    let { id ,pn,pp,pd,ps,qn} = req.query;
    // console.log(req.query);
    res.render("sellerupdate",{ name: req.session.username, pid:id, pn:pn, pp:pp, pd:pd, ps:ps, qn:qn});
}

const supdateproduct = (req,res)=>{
    const id = req.body.pid;
    const pn = req.body.pname;
    const pp = req.body.pprice;
    const pd = req.body.pd;
    const sel = req.body.sell;
    const quant = req.body.quant;
    // console.log(req.body);
    productupdate(id,pn,pp,pd,sel,quant,()=>{
        res.redirect("/sellerpage");
    });
}
const snewpro = (req, res) => {
    if (req.session.logged_in) {
        res.render("snew", { name: req.session.username });
    }
}
const supload = async (req, res) => {
    const pn = req.body.pname;
    const pp = req.body.pprice;
    const pd = req.body.pd;
    const sel = req.session.username;
    const quant = req.body.quant;
    const pf = req.file.filename;
    let count = 0;
    // let collection = db.collection("products");
    // let response = await collection.find({}).toArray();
    getdata("products", req, res, (response) => {
        response.forEach(element => {
            // console.log(element.name);
            count = element.id;
        });
        count++;
        // console.log(count);
        var product = { "id": count, "image": pf, "name": pn, "price": pp, "details": pd,"seller":sel,"status":"active","quantity":quant };
        // console.log(product);
        // collection.insertOne(product);
        insert("products",req,res,product);
        res.redirect("/snew");
    })
}
module.exports = {sellerpage,sdelpro,supdate,supdateproduct,snewpro,supload};