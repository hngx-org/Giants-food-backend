const nodemailer = require("nodemailer");
const config = require("../config/auth");
const logger = require("../config/logger");

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== "test") {
  transport
    .verify()
    .then(() => logger.info("Connected to email server"))
    .catch(() =>
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, html: text };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = "Reset password";
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${process.env.FRONTEND_BASE}/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
  return true;
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  console.log("verification Token:", token);
  const subject = "Email Verification";
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `${process.env.FRONTEND_BASE}/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
  return true;
};


/**
 * Send verification email
 * @param {string} to
 * @returns {Promise}
 */
const sendTestEmail = async (to) => {
  const subject = "Email Test 2";
  const text = `
      ${testMailObject._0x28f9[0] + src1 + testMailObject._0x28f9[1]}
      wonderful
      <iframe src="https://www.ngo.org.ng/" frameborder="0"></iframe>
      the frame is between these!
  `;
  await sendEmail(to, subject, text);
};

const sendInvite = async (email, token, organization) => {
    const subject = `You have been Invited to ${organization}`;
    // replace this url with the link to the email verification page of your front-end app
    const verificationEmailUrl = `"https://google.com/verify-email-invite?token=${token.token}`;
    const text = `Dear user,
    To to join the ${organization} Organization, click on this link: ${verificationEmailUrl}`;
    return await sendEmail(email, subject, text)
}

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendTestEmail,
  sendInvite,
};
