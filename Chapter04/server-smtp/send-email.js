// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "localhost",
//   port: 4321,
// });

// transporter.sendMail({
//   from: "beth@example.com",
//   to: "1094425279@qq.com",
//   subject: "Hello",
//   text:"Hello world!",
// }, (err, info) => {
//   if (err) {
//     console.log(err)
//   }
//   console.log("Message Sent:",info)
// })

const nodemailer = require("nodemailer");

(async () => {
  const testAccount = await nodemailer.createTestAccount();
  console.log(testAccount, "testAccount");
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: "beth@example.com",
    to: "1094425279@qq.com",
    subject: "Hello",
    text: "Hello world!",
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
})();
