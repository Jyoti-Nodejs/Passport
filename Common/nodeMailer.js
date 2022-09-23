const cron = require("node-cron");
const nodemailer = require("nodemailer");
module.exports = {
  async sendMail(to, subject, html) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: to,
      subject: subject,
      html: html,
    };
    console.log("mailOptions", mailOptions);
    // cron.schedule("0 */01 * * * *", () => {
    // const task = cron.schedule(
    //   "* */05 * * * *",
    //   () => {
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
  },
  //     {
  //       scheduled: true,
  //     }
  //   );
  //   task.start();
  // },
};
