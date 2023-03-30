const nodemailer = require("nodemailer");

const resetverification = async function (data,callback) {
  // console.log(data);
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        //let testAccount = await nodemailer.createTestAccount();
        // console.log("hgf");
        // create reusable transporter object using the default SMTP transport
        let transporter =await nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
        //   secure: false, // true for 465, false for other ports
          auth: {
            user: "dessie.veum97@ethereal.email", // generated ethereal user
            pass: "9kAx92ERGyfQQTAEPQ", // generated ethereal password
          },
        });
        // console.log("next");
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: data.email, // list of receivers
          subject: "Reset Password", // Subject line
          text: "To continue plese verify your account using the given link", // plain text body
          html: `<a href="http://localhost:3000/ver/${data.token}">Click Here</a>`, // html body
        });
        // console.log(data);
        // console.log("Message sent: %s", info);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        callback(null,"djh");
      }
      
    //  console.log("Message sent: %s", info);
     
    //  info.then(console.log(info), callback(null,info.messageId));
    //         info.catch(console.error());
         

module.exports = resetverification;