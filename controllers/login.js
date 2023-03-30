const getdata = require("../service/getUser");

const login = async (req, res) => {
    let { username, password } = req.body;
    getdata("users", req, res, (response) => {
        let flag = false;
        // console.log(response);
        response.forEach(element => {
            // console.log(element);
            if (element.username == username && element.password == password) {
                // console.log(element);
                req.session.logged_in = true;
                req.session.username = element.username;
                req.session.isVerified = element.isverified;
                // console.log(element.usertype);
                req.session.userType = element.usertype;
                if(req.session.userType=="admin"){
                    // console.log("ad",req.session.logged_in);
                    res.redirect("/adminpage");

                }
                else if(req.session.userType=="seller"){
                    res.redirect("sellerpage");
                }
                else{
                    res.redirect("/home");
                }
                flag = true;
                return;
            }
        });
        if (flag == false) {
            res.render("login", { error: "username or password is incorrect" });
            return;
        }
    });

}

const getlogin = (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/home");
        return;
    }
    res.render('login', { error: "" });
    return;
}

module.exports = { login, getlogin };