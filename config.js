const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  port: process.env.PORT,
  emailFrom: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
  emailTo: [
    `"${process.env.EMAIL_TO_NAME}" <${process.env.EMAIL_TO_ADDRESS}>`,
    `"${process.env.EMAIL_EXTRA_TO_NAME}" <${process.env.EMAIL_EXTRA_TO_ADDRESS}>`,
  ].join(", "),
  port: process.env.PORT,
  sendgridUserName: process.env.SENDGRID_USER_NAME,
  sendgridPassword: process.env.SENDGRID_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPwd: process.env.DB_PWD,
  dbName: process.env.DB_NAME,
};
