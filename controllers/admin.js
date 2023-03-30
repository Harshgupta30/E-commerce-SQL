const getdata = require("../service/getProduct");
const insert = require("../service/insertProduct");
const del = require("../service/deletepro");
const productupdate = require("../service/updateproduct");

const adminpage = (req,res)=>{
    // console.log("dfvd",req.session);
    // console.log(req.session.logged_in);
    if (req.session.logged_in) {
        // console.log("inif");
        res.render("admin", { name: req.session.username });
        return;
    }
}

const newpro = (req, res) => {
    if (req.session.logged_in) {
        res.render("new", { name: req.session.username });
        return;
    }
}

const upload = async (req, res) => {
    const pn = req.body.pname;
    const pp = req.body.pprice;
    const pd = req.body.pd;
    const sel = req.body.sell;
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
        // collection.insertOne(product);
        insert("products",req,res,product);
        res.redirect("/new");
    })
}

const delpro = (req,res)=>{
    let { id } = req.query;
    // console.log(id);
    myquery = {id:id};
    newvalues = {status:"deactive"};
    del("products",myquery,newvalues)
    res.redirect("/adminpage");
}

const update = (req,res)=>{
    let { id ,pn,pp,pd,ps,qn} = req.query;
    // console.log(id);
    res.render("update",{ name: req.session.username, pid:id, pn:pn, pp:pp, pd:pd, ps:ps,qn:qn});
}

const updateproduct = (req,res)=>{
    const id = req.body.pid;
    const pn = req.body.pname;
    const pp = req.body.pprice;
    const pd = req.body.pd;
    const sel = req.body.sell;
    const quant = req.body.quant;
    // console.log(req.body);
    productupdate(id,pn,pp,pd,sel,quant,()=>{
        res.redirect("/adminpage");
    });
}

module.exports = { newpro, upload,adminpage,delpro,update,updateproduct};