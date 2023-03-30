const getdata = require("../service/getProduct");
const update = require("../service/updateCart");
const delet = require("../service/deleteCart");

const mycart = (req, res) => {
    res.render("cart", { name: req.session.username });
}

const getcart = async (req, res) => {
    // let collection = db.collection("cart");
    // let response = await collection.find({}).toArray();
    let cart = { [req.session.username]: {} };
    getdata("cart", req, res, (response) => {
        response.forEach(element => {
            // console.log(element.name);
            if (element.username == req.session.username) {
                // cart[req.session.username][element.id];
                Object.assign(cart[req.session.username], { [element.id]: { quantity: element.quantity } })
            }
        });
        // console.log(cart);
        res.json(cart[req.session.username]);
    })

}

const savedata = async (req, res) => {
    // console.log(req.body[0].quantity);
    // let collection = db.collection("cart");
    // let response = await collection.find({}).toArray();
    getdata("cart", req, res, (response) => {
        response.forEach(element => {
            if (element.username == req.session.username) {
                id = element.id;
                if (req.body[id] != undefined) {
                    var myquery = { username: req.session.username, id: id };
                    var newvalues = {  quantity: req.body[id].quantity  }
                    // var result = collection.updateOne(myquery, newvalues).then();
                    update("cart",myquery,newvalues);
                    res.send();
                }
            }
        })
    })

}

const del = async (req, res) => {
    let cart = {};
    // console.log(req.body);
    // let collection = db.collection("cart");
    // let response = await collection.find({}).toArray();
    getdata("cart", req, res, (response) => {
        response.forEach(element => {
            if (element.username == req.session.username) {
                id = element.id;
                if (req.body[id] == undefined) {
                    var myquery = { username: req.session.username, id: id };
                    // var result = collection.deleteOne(myquery).then();
                    delet("cart",myquery);
                }
            }
    
        })
        res.redirect('/mycart');
    })
    
}

module.exports = { mycart, getcart, savedata, del };