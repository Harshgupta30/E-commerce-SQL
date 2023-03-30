const root = (req,res)=>{
    if (req.session.logged_in) {
        res.redirect("/home");
        return;
    }
    
    res.render("root");
    return;
};
module.exports = root;