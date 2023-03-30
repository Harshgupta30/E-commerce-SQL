function checkSeller(req,res,next){
    if(req.session.userType=="seller"){
        next();
        return;
    }
    res.send(404);
    return;
}

module.exports = checkSeller;