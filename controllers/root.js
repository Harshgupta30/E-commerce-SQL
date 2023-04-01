const root = (req,res)=>{
    if (req.session.logged_in) {
        if(req.session.userType=="seller"){
            res.redirect("/sellerpage");
            return;
        }
        else if(req.session.userType=="admin"){
            res.redirect("/adminpage");
        }
        else{
            res.redirect("/home");
            return;
        }
    }
    else{
        res.render("root");
        return;
    }
    
};
module.exports = root;