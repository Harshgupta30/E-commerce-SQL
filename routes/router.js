const express = require("express");
const router = express.Router();

//routes
const root = require("../controllers/root");
const {login,getlogin} = require("../controllers/login");
const {signup,getsignup,mailcheck} = require("../controllers/signup");
const home = require("../controllers/home");
const addtocart = require("../controllers/addtocart");
const {reset,confirm,mailver} = require("../controllers/forgetpassword");
const logout = require("../controllers/logout")
const {newpro,upload, adminpage,delpro,update,updateproduct} = require("../controllers/admin")
const getpro = require("../controllers/product");
const{changepass,changepassword,change} = require("../controllers/chnagepassword");
const {mycart,getcart,savedata,del} = require("../controllers/cart");
const {sellerpage,sdelpro,supdate,supdateproduct,snewpro,supload} = require("../controllers/seller");
const {getorder,postorder,getorderdetails} = require("../controllers/order");
const {sellorder,sellerord,sellerrevord} = require("../controllers/sellerorder");
const csvupload = require("../controllers/csvupload");

const {gethome,revhome} = require("../controllers/display");
const {sellerpro,sellerrev} = require("../controllers/sellerdisplay");

const {getquantity} = require("../controllers/getquantity");
const {payment} = require("../controllers/payment");

//middleware
const checkAuth = require("../middleware/checkAuth");
const checkVerfication = require("../middleware/checkVerfication");
const verifyemail = require("../middleware/verifyemail");
const checkAdmin = require("../middleware/checkAdmin");
const checkSeller = require("../middleware/checkSeller");


//product img
const multer = require('multer');
const uploade = multer({ dest: 'uploads' });
const csvuploade = multer({dest: 'uploads_csv'});

//routes
router.get("/",root);

router.get("/login",getlogin);
router.post("/login",login);

router.get("/signup",getsignup);
router.post("/signup",signup);
router.get("/check/:token",mailcheck);

router.get("/home", checkAuth, checkVerfication,home);

router.post("/addtocart",checkAuth,addtocart);

router.get("/reset",reset);
router.post("/confirm",confirm);
router.get("/ver/:token",mailver);

router.get("/logout",checkAuth,logout);

router.get("/new",checkAdmin,newpro);
router.post("/addproduct",checkAdmin,uploade.single('pf'),upload);
router.get("/adminpage",checkAdmin,adminpage);
router.post("/delete",checkAdmin,delpro);
router.post("/update",checkAdmin,update);
router.post("/updateproduct",checkAdmin,updateproduct);

router.get("/getpro",checkAuth,getpro);

router.get("/changepass",verifyemail,changepass);
router.get("/changepassword",checkAuth,changepassword);
router.post("/change",change);

router.get("/mycart",checkAuth,mycart);
router.get("/getcart",checkAuth,getcart);
router.post("/savedata",checkAuth,savedata);
router.post("/del",checkAuth,del);

router.post("/homepro",gethome);
router.post("/homerev",revhome);

router.post("/sellerpro",sellerpro);
router.post("/sellerrev",sellerrev);

router.get("/sellerpage",checkAuth,checkSeller,sellerpage);
router.post("/sdelete",sdelpro);
router.post("/supdate",checkAuth,checkSeller,supdate);
router.post("/supdateproduct",supdateproduct);
router.get("/snew",snewpro);
router.post("/saddproduct",uploade.single('pf'),supload);

router.post("/order",postorder);
router.get("/order",getorder);
router.get("/orderdetails",getorderdetails);


// {sellorder,sellerord,sellerrevord}
router.get("/sellerorder",checkAuth,checkSeller,sellorder);
router.post("/sellerorder",sellerord);
router.post("/sellerrevord",sellerrevord);


router.post("/csvproductupload",csvuploade.single('csv'),csvupload);

router.post("/getquantity",getquantity);

router.post("/payment",payment);


module.exports = router;
