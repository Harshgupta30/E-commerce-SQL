const resetverification = require("../methods/resetverification");
const getdata = require("../service/getUser");


const reset = (req, res) => {
    res.render("reset", { error: "" });
}

const confirm = async (req, res) => {
    let flag = false;
    let user;
    // let collection = db.collection("users");
    // let response = await collection.find({}).toArray();
    getdata("users", req, res, (response) => {
        // console.log(response);
        response.forEach(element => {
            // console.log(element.name);
            if (element.username == req.body.username) {
                user = element;
                flag = true;
                return;
            }
        });
        // console.log(user);
        resetverification(user, (err, data) => {
            if (err) {
                res.render("reset", { error: "something went wrong" });
            }
            else {
                req.session.username = req.body.username;
                // res.render("changepass", { error: "" }); 
                res.redirect('/changepass');
            }

        })
    })

}
const mailver = async (req, res) => {

    let token = req.params;
    // console.log(token);
    // res.send(token.token);
    // let collection = db.collection("users");
    // let response = await collection.find({}).toArray();
    getdata("users", req, res, (response) => {
        response.forEach(element => {
            // console.log(element.name);
            if (element.token == token.token) {
                req.session.confirm = true;
                req.session.username = element.username;
                res.render("changepassword", { error: "" });
            }
        });
    });
    
}


module.exports = { reset, confirm, mailver };