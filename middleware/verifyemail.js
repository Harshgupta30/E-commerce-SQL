function verifyemail(req,res,next){
    if(req.session.confirm){
        next();
        return;
    }
    res.send("Plese check your and verify it");
}

module.exports = verifyemail;