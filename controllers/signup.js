const sendEmail = require("../methods/sendEmail");
const getdata = require("../service/getUser");
const insert = require("../service/inserUser");
const update = require("../service/updateUser")

const signup = async (req, res) => {
    let { name, username, password, email } = req.body;
    // let count = 0;
    // let collection = db.collection("users");
    // let response = await collection.find({}).toArray();
    getdata("users", req, res, (response) => {
        let flag = false;
        response.forEach(element => {
            // console.log(element.name);
            // count = element.id;
            if (element.username == username) {
                flag = true;
                return;
            }
        });
        // console.log(response.name);
        if (flag == true) {
            res.render("signup", { error: "userexist" });
        }
        if (flag == false) {
            let u = false, l = false, n = false;
            
            if (password.length < 7) {
                res.render("signup", { error: "minimum length is 8" });
                return
            }
            for (let i = 0; i < password.length; i++) {
                if (password[i] >= 'A' && password[i] <= 'Z') {
                    u = true;
                }
                if (password[i] >= 'a' && password[i] <= 'z') {
                    l = true;
                }
                if (password[i] >= 0 && password[i] <= 9) {
                    n = true;
                }
            }
            if (l == false) {
                res.render("signup", { error: "minimum one small letter" });
                return
            }
            if (u == false) {
                res.render("signup", { error: "minimum one capital letter" });
                return
            }
            if (n == false) {
                res.render("signup", { error: "minimum one number required" });
                return
            }
            else {
                let user = { name: name, username: username, password: password, email: email, isVerified: false, token: Date.now() };
                insert("users", req, res, user);
                // collection.insertOne(user);
                sendEmail(user, function (err, data) {
                    // console.log(data);
                    // console.log(err);
                    if (err) {
                        res.render("signup", { error: "something went wrong" });
                        // console.log("err");
                    }
                    else {
                        req.session.logged_in = true;
                        req.session.username = username;
                        req.session.isVerified = false;
                        res.redirect("/home");
                    }
                })
            }
        }
    })

}
const getsignup = async (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/home");
        return;
    }
    res.render('signup', { error: "" });
}
const mailcheck = async (req, res) => {
    let token = req.params;
    let user;
    // res.send(token.token);
    getdata("users", req, res, (response) => {
        response.forEach(element => {
            // console.log(element.name);
            if (element.token == token.token) {
                user = element;
            }
        });

        var myquery = { token: parseInt(token.token) };
        var newvalues = { $set: { isVerified: true } };
        update("users", myquery, newvalues);

        req.session.logged_in = true;

        req.session.username = user.username;
        req.session.isVerified = true;
        res.redirect("/home");


    })
};

module.exports = { signup, getsignup, mailcheck }