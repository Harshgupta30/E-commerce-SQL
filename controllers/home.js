const home = (req,res)=>{
    res.render("home", { name: req.session.username });
    return;
}

module.exports = home;