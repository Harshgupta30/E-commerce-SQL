const update = require("../service/updateUserPass")

const changepass = (req,res)=>{
    res.render("changepassword", { error: "" });
}

const changepassword = (req,res)=>{
    res.render("changepassword", { error: "" });
}

const change = async(req,res)=>{
    let u = false, l = false, n = false;
    if (req.body.np1 != req.body.np2) {
        res.render("changepassword", { error: "Not matched" });
        return
    }
    if (req.body.np1.length < 7) {
        res.render("changepassword", { error: "minimum length is 8" });
        return
    }
    for (let i = 0; i < req.body.np1.length; i++) {
        if (req.body.np1[i] >= 'A' && req.body.np1 <= 'Z') {
            u = true;
        }
        if (req.body.np1[i] >= 'a' && req.body.np1 <= 'z') {
            l = true;
        }
        if (req.body.np1[i] >= 0 && req.body.np1[i] <= 9) {
            n = true;
        }
    }
    if (l == false) {
        res.render("changepassword", { error: "minimum one small letter" });
        return
    }
    if (u == false) {
        res.render("changepassword", { error: "minimum one capital letter" });
        return
    }
    if (n == false) {
        res.render("changepassword", { error: "minimum one number required" });
        return
    }
    else {
        let arr;
        // let collection = db.collection("users");
        var myquery = { username: req.session.username };
        // var newvalues = { $set: { password: req.body.np1 } };
        var newvalues = {password: req.body.np1}
        // var result = await collection.updateOne(myquery, newvalues).then(
        //     res.redirect('/logout')
        // );
        update("users",myquery,newvalues);
        res.redirect("/logout");
    }
}

module.exports = {changepass,changepassword,change};

