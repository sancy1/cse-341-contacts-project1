// require("dotenv").config();

// const SibApiV3Sdk = require("@getbrevo/brevo");

// // Initialize the API client
// const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// // Configure API key authentication
// apiInstance.setApiKey(
//   SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
//   process.env.BREVO_API_KEY
// );

// const sendVerificationEmail = async (email, token) => {
//   const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//   sendSmtpEmail.subject = "Verify Your Email";

//   // Construct the verification URL using an environment variable
//   const verificationUrl = `${process.env.API_BASE_URL}/api/users/verify-email?token=${token}`;

//   sendSmtpEmail.htmlContent = `
//     <p>Click the link below to verify your email address:</p>
//     <a href="${verificationUrl}">Verify Email</a>
//   `;
//   sendSmtpEmail.sender = {
//     name: process.env.EMAIL_SENDER_NAME,
//     email: process.env.EMAIL_SENDER_EMAIL,
//   };
//   sendSmtpEmail.to = [{ email }];

//   try {
//     await apiInstance.sendTransacEmail(sendSmtpEmail);
//     console.log("Verification email sent");
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//   }
// };

// module.exports = { sendVerificationEmail };



















// require("dotenv").config();
// const fs = require("fs");
// const path = require("path");
// const SibApiV3Sdk = require("@getbrevo/brevo");

// // Initialize the API client
// const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
// apiInstance.setApiKey(
//   SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
//   process.env.BREVO_API_KEY
// );

// const sendVerificationEmail = async (email, token, username) => {
//   console.log("Sending email to:", email, "Username:", username); // Debugging

//   const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//   sendSmtpEmail.subject = "Verify Your CS341 Account";

//   // Construct verification URL
//   const verificationUrl = `${process.env.API_BASE_URL}/api/users/verify-email?token=${token}`;

//   // Inline Image (Logo)
//   const logoCid = "cs341logo"; // Unique Content ID
//   const logoPath = path.join(__dirname, "../public/images/logo.png");

//   let logoBase64 = null;
//   try {
//     const logoBuffer = fs.readFileSync(logoPath);
//     logoBase64 = logoBuffer.toString("base64");
//   } catch (error) {
//     console.error("Error reading logo image:", error);
//   }

//   // HTML Email with Inline Image
//   sendSmtpEmail.htmlContent = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Verify Your CS341 Account</title>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//           line-height: 1.6;
//           color: #333;
//           background-color: rgb(222, 222, 222) !important;
//           padding: 20px;
//           text-align: center;
//         }
//         .container {
//           max-width: 600px;
//           background: white;
//           margin: 0 auto;
//           padding: 20px;
//           border-radius: 10px;
//           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//         }
//         .logo img {
//           max-width: 100px;
//           height: auto;
//         }
//         .button {
//           display: inline-block;
//           padding: 12px 20px;
//           background-color: #007bff;
//           color: #ffffff !important;
//           font-size: 16px;
//           font-weight: bold;
//           text-decoration: none;
//           border-radius: 5px;
//           margin-top: 20px;
//         }
          
//         .footer {
//           margin-top: 20px;
//           font-size: 12px;
//           color: #777;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="logo">
//           <img src="cid:${logoCid}" alt="CS341 Logo">
//         </div>
//         <h2>Hello ${username || "User"},</h2>
//         <p>Thank you for signing up for CS341! Please verify your email address by clicking the button below:</p>
//         <p>
//           <a href="${verificationUrl}" class="button">Verify Email</a>
//         </p>
//         <p>If you did not sign up for CS341, please ignore this message.</p>
//         <div class="footer">
//           <p>&copy; ${new Date().getFullYear()} CS341. All rights reserved.</p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;

//   // Email sender details
//   sendSmtpEmail.sender = {
//     name: "CS341 Support",
//     email: process.env.EMAIL_SENDER_EMAIL, // Must be verified in Brevo
//   };
//   sendSmtpEmail.to = [{ email }];

//   // Attach Image as an Inline Image
//   if (logoBase64) {
//     sendSmtpEmail.inlineImage = [
//       {
//         content: logoBase64,
//         name: "logo.png",
//         contentId: logoCid, // Ensures correct inline display
//       },
//     ];
//   }

//   try {
//     await apiInstance.sendTransacEmail(sendSmtpEmail);
//     console.log("Verification email sent");
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//   }
// };

// module.exports = { sendVerificationEmail };









// require("dotenv").config();
// const fs = require("fs");
// const path = require("path");
// const SibApiV3Sdk = require("@getbrevo/brevo");

// // Initialize the API client
// const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
// apiInstance.setApiKey(
//   SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
//   process.env.BREVO_API_KEY
// );

// const sendVerificationEmail = async (email, token, username) => {
//   const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//   sendSmtpEmail.subject = "Verify Your CS341 Account";

//   // Construct the verification URL
//   const verificationUrl = `${process.env.API_BASE_URL}/api/users/verify-email?token=${token}`;

//   // Attach image directly (No Base64)
//   const logoCid = "cs341logo"; // Unique ID for referencing inline
//   const logoPath = path.join(__dirname, "../public/images/logo.png");

//   // Read the image as a buffer
//   let logoBuffer;
//   try {
//     logoBuffer = fs.readFileSync(logoPath);
//   } catch (error) {
//     console.error("Error reading logo image:", error);
//     logoBuffer = null;
//   }

//   // HTML Email with inline image
//   sendSmtpEmail.htmlContent = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Verify Your CS341 Account</title>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//           line-height: 1.6;
//           color: #333;
//           background-color: #f4f4f4;
//           padding: 20px;
//           text-align: center;
//         }
//         .container {
//           max-width: 600px;
//           background: white;
//           margin: 0 auto;
//           padding: 20px;
//           border-radius: 10px;
//           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//         }
//         .logo img {
//           max-width: 100px; /* Adjusted logo size */
//           height: auto;
//         }
//         .button {
//           display: inline-block;
//           padding: 12px 20px;
//           background-color: #007bff;
//           color: #ffffff;
//           font-size: 16px;
//           font-weight: bold;
//           text-decoration: none;
//           border-radius: 5px;
//           margin-top: 20px;
//         }

//         .button:hover{
//             background-color: #000;
//             color: #ffffff;
//             transition: 05s;
//           }

//         .footer {
//           margin-top: 20px;
//           font-size: 12px;
//           color: #777;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="logo">
//           <img src="cid:${logoCid}" alt="CS341 Logo">
//         </div>
//         <h2>Hello ${username},</h2>
//         <p>Thank you for signing up for CS341! Please verify your email address by clicking the button below:</p>
//         <p>
//           <a href="${verificationUrl}" class="button">Verify Email</a>
//         </p>
//         <p>If you did not sign up for CS341, please ignore this message.</p>
//         <div class="footer">
//           <p>&copy; ${new Date().getFullYear()} CS341. All rights reserved.</p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;

//   // Email sender details
//   sendSmtpEmail.sender = {
//     name: "CS341 Support",
//     email: process.env.EMAIL_SENDER_EMAIL, // Must be verified in Brevo
//   };
//   sendSmtpEmail.to = [{ email }];

//   // Attach the image as an inline image
//   if (logoBuffer) {
//     sendSmtpEmail.inlineImage = [
//       {
//         content: logoBuffer.toString("base64"),
//         name: "logo.png",
//         contentId: logoCid, // This ensures the image is referenced correctly
//       },
//     ];
//   }

//   try {
//     await apiInstance.sendTransacEmail(sendSmtpEmail);
//     console.log("Verification email sent");
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//   }
// };

// module.exports = { sendVerificationEmail };























require("dotenv").config();
const fs = require("fs");
const path = require("path");
const SibApiV3Sdk = require("@getbrevo/brevo");

// Initialize the API client
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

/**
 * Send a verification email to the user.
 * @param {string} email - The user's email address.
 * @param {string} token - The verification token.
 * @param {string} username - The user's username.
 */
const sendVerificationEmail = async (email, token, username) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = "Verify Your CS341 Account";

  // Construct the verification URL
  const verificationUrl = `${process.env.API_BASE_URL}/api/users/verify-email?token=${token}`;

  // Attach image directly (No Base64)
  const logoCid = "cs341logo"; // Unique ID for referencing inline
  const logoPath = path.join(__dirname, "../public/images/logo.png");

  // Read the image as a buffer
  let logoBuffer;
  try {
    logoBuffer = fs.readFileSync(logoPath);
  } catch (error) {
    console.error("Error reading logo image:", error);
    logoBuffer = null;
  }

  // HTML Email with inline image
  sendSmtpEmail.htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your CS341 Account</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          padding: 20px;
          text-align: center;
        }
        .container {
          max-width: 600px;
          background: white;
          margin: 0 auto;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .logo img {
          max-width: 100px; /* Adjusted logo size */
          height: auto;
        }
        .button {
          display: inline-block;
          padding: 12px 20px;
          background-color: #007bff;
          color: #ffffff;
          font-size: 16px;
          font-weight: bold;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }

        .button:hover{
            background-color: #000;
            color: #ffffff;
            transition: 05s;
          }

        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <img src="cid:${logoCid}" alt="CS341 Logo">
        </div>
        <h2>Hello ${username},</h2>
        <p>Thank you for signing up for CS341! Please verify your email address by clicking the button below:</p>
        <p>
          <a href="${verificationUrl}" class="button">Verify Email</a>
        </p>
        <p>If you did not sign up for CS341, please ignore this message.</p>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} CS341. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Email sender details
  sendSmtpEmail.sender = {
    name: "CS341 Support",
    email: process.env.EMAIL_SENDER_EMAIL, // Must be verified in Brevo
  };
  sendSmtpEmail.to = [{ email }];

  // Attach the image as an inline image
  if (logoBuffer) {
    sendSmtpEmail.inlineImage = [
      {
        content: logoBuffer.toString("base64"),
        name: "logo.png",
        contentId: logoCid, // This ensures the image is referenced correctly
      },
    ];
  }

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Verification email sent");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};



/**
 * Send a password reset email to the user.
 * @param {string} email - The user's email address.
 * @param {string} token - The password reset token.
 * @param {string} username - The user's username.
 */
const sendPasswordResetEmail = async (email, token, username) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = "Reset Your CS341 Password";

  // Construct the password reset URL
  const resetUrl = `${process.env.API_BASE_URL}/api/users/reset-password?token=${token}`;

  // Attach image directly (No Base64)
  const logoCid = "cs341logo"; // Unique ID for referencing inline
  const logoPath = path.join(__dirname, "../public/images/logo.png");

  // Read the image as a buffer
  let logoBuffer;
  try {
    logoBuffer = fs.readFileSync(logoPath);
  } catch (error) {
    console.error("Error reading logo image:", error);
    logoBuffer = null;
  }

// HTML Email with inline image
sendSmtpEmail.htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your CS341 Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      padding: 20px;
      text-align: center;
    }
    .container {
      max-width: 600px;
      background: white;
      margin: 0 auto;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .logo img {
      max-width: 100px; /* Adjusted logo size */
      height: auto;
    }
    .button {
      display: inline-block;
      padding: 12px 20px;
      background-color: #007bff;
      color: #ffffff;
      font-size: 16px;
      font-weight: bold;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
    .button:hover {
      background-color: #000;
      color: #ffffff;
      transition: 0.5s;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #777;
    }
    .support-info {
      margin-top: 20px;
      font-size: 14px;
      color: #555;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <img src="cid:${logoCid}" alt="CS341 Logo">
    </div>
    <h2>Hello ${username},</h2>
    <p>We received a request to reset your password for your CS341 account. If this was you, please click the button below to reset your password:</p>
    <p>
      <a href="${resetUrl}" class="button">Reset Password</a>
    </p>
    <p><strong>Didn't request this?</strong> If you did not request a password reset, please ignore this email. Your account is secure, and no changes have been made.</p>
    <div class="support-info">
      <p>If you have any questions or need further assistance, please contact our support team at <a href="mailto:support@cs341.com">support@cs341.com</a>.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} CS341. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

  // Email sender details
  sendSmtpEmail.sender = {
    name: "CS341 Support",
    email: process.env.EMAIL_SENDER_EMAIL, // Must be verified in Brevo
  };
  sendSmtpEmail.to = [{ email }];

  // Attach the image as an inline image
  if (logoBuffer) {
    sendSmtpEmail.inlineImage = [
      {
        content: logoBuffer.toString("base64"),
        name: "logo.png",
        contentId: logoCid, // This ensures the image is referenced correctly
      },
    ];
  }

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Password reset email sent");
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail };