#!/usr/bin/env node
const express = require('express');
const app = express();
const { port } = require('./config');
const { emailFrom, emailTo } = require('./config');

const Email = require('./email');

const bodyParser = require('body-parser');
const cors = require('cors');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json());
const corsOptions = {};
app.use(cors(corsOptions));
app.options('*', cors());

app.post('/send-email', async function(req, res, next) {
  const emailData = req.body;

  let result = {};
  try {
    await sendQuoteEmail(req, emailData);
    result = {
      status: 'ok',
      info: 'Email send successfully!'
    };
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

app.post('/contact-us', async function(req, res, next) {
  const emailData = req.body;

  let result = {};
  try {
    await sendContactUsEmail(req, emailData);
    result = {
      status: 'ok',
      info: 'Email send successfully!'
    };
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

const sendContactUsEmail = async function(req, emailData) {
  const from = emailFrom;
  const to = emailTo;
  const subject = 'Contact us';
  const template = '/customer-message.html';
  const replacements = {
    name: emailData.customerMessage.name,
    email: emailData.customerMessage.email,
    subject: emailData.customerMessage.subject,
    message: emailData.customerMessage.message
  };
  const emailSend = await Email.sendEmail(
    from,
    to,
    subject,
    replacements,
    template,
    null
  );
  return true;
};

const sendQuoteEmail = async function(req, emailData) {
  const from = emailFrom;
  const to = emailTo;
  const subject = 'Request for a quote';
  const template = '/quote-data.html';
  const replacements = {
    type: emailData.type,
    firstName: emailData.customerData.firstName,
    lastName: emailData.customerData.lastName,
    email: emailData.customerData.email,
    phoneNo: emailData.customerData.phoneNo,
    currentlyTravel: emailData.customerData.currentlyTravel,
    flyPrivately: emailData.customerData.flyPrivately,
    quoteData: emailData.quoteData
  };
  const emailSend = await Email.sendEmail(
    from,
    to,
    subject,
    replacements,
    template,
    null
  );
  return true;
};
