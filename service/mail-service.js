const nodemailer = require("nodemailer");

const sendActivationMail = async (to, link) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: process.env.SMTP_USER, // sender address
    to, // list of receivers
    subject: "Активация аккаунта на" + process.env.API_URL, // Subject line
    text: "", // plain text body
    html: `
        <div>
        <h1>Для активации аккаунта пройдите по ссылке </h1>
        <a href="${link}">${link}</a>
        </div>
        `,
  });
};

module.exports = { sendActivationMail };
