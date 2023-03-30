function checkVerfication(req,res,next){
    if(req.session.isVerified){
        next();
        return;
    }
    res.send("Plese check your and verify it");
    return;
}

module.exports = checkVerfication;