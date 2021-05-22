const { SENDGRID_API_KEY, SENDGRID_FROM_EMAIL } = process.env;

const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const nodemailerSendgrid = require('nodemailer-sendgrid');

const sendEmail = async ({ email, subject, template, values }) => {

  const payload = {
    to: email,
    from: SENDGRID_FROM_EMAIL, // Trocar de acordo com projeto
    subject,
  };

  if (template) {
    const source = fs.readFileSync(
      path.join(__dirname, `../templates/${template}.html`),
      'utf8'
    );
    const templates = handlebars.compile(source);

    payload.html = templates(values);
  }

  const smtpTransport = nodemailer.createTransport(
    nodemailerSendgrid({ apiKey: SENDGRID_API_KEY })
  );

  const mailOptions = payload;

  return smtpTransport.sendMail(mailOptions);
};

module.exports = sendEmail;
