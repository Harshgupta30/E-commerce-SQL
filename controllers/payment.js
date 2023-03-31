const Razorpay = require("razorpay");
const cors = require("cors");
const payment = (req, res) => {
    let {amount} = req.body;
    // console.log("atpay",amount);
    var instance = new Razorpay({ key_id: 'rzp_test_s5jNBoL3doMVgH', key_secret: 'EJAPPci2uARB9BRaHbpSf60D' })

    let order = instance.orders.create({
        amount: amount,
        currency: "INR",
        receipt: "receipt#1",
    })
    res.status(200).json({
        success:true,
        order,
        amount,
    });
}

module.exports = {payment};