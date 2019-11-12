const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const appDir = path.dirname(require.main.filename);
const { emailSetting } = require("./config");

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: emailSetting.userName, // account.user, // generated ethereal user
    pass: emailSetting.pass //'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', // account.pass, // generated ethereal password
  }
});

var readHTMLFile = function(path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function(err, html) {
    if (err) {
      throw err;
    } else {
      callback(null, html);
    }
  });
};

// async..await is not allowed in global scope, must use a wrapper
class Email {
  static async sendEmail(from, to, subject, replacements, template) {
    readHTMLFile(appDir + template, function(err, html) {
      const template = handlebars.compile(html);
      const TempReplacements = replacements;
      const htmlToSend = template(TempReplacements);
      const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: htmlToSend,
        isMultiple: true
      };
      transporter.sendMail(mailOptions, function(error, response) {
        if (error) {
          console.log("email error", error);
        } else {
          console.log("email response", response);
        }
      });
    });
    return true;
  }
}

module.exports = Email;
