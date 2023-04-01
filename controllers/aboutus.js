const about = (req,res)=>{
    if (req.session.logged_in) {
        if(req.session.userType=="seller"){
            res.render("selleraboutus",{name:req.session.username});
            return;
        }
        else if(req.session.userType=="admin"){
            res.render("adminaboutus",{name:req.session.username});
        }
        else{
            res.render("useraboutus",{name:req.session.username});
            return;
        }
    }
    else{
        res.render("rootaboutus");
        return;
    }
    
};
module.exports = about;