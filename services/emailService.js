
require("dotenv").config()
const SibApiV3Sdk = require("@getbrevo/brevo")

// Initialize the API client
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY)

// Generate avatar with custom 'E' and gradient background
const generateEmailAvatar = () => {
  return `https://ui-avatars.com/api/?name=E&background=6366F1&color=fff&size=128&bold=true&fontSize=0.6`
}

// Send Verification Email to the User
const sendVerificationEmail = async (email, token, username) => {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
    sendSmtpEmail.subject = "Verify Your CS341 Account"

    // Construct the verification URL
    const verificationUrl = `${process.env.API_BASE_URL}/api/users/verify-email?token=${token}`

    // Generate avatar URL with custom 'E'
    const avatarUrl = generateEmailAvatar()

    // Calculate expiration time (24 hours from now)
    const expirationDate = new Date(Date.now() + 86400000) // 24 hours in milliseconds
    const hoursRemaining = 24 // Since we're setting it to exactly 24 hours

    // HTML Email with avatar
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your CS341 Account</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          :root {
            --primary: #6366F1;
            --primary-dark: #4F46E5;
            --secondary: #10B981;
            --dark: #1F2937;
            --light: #F9FAFB;
            --gray: #9CA3AF;
            --danger: #EF4444;
            --warning: #F59E0B;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: var(--dark);
            background-color: #F3F4F6;
            padding: 0;
            margin: 0;
          }
          
          .wrapper {
            background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
            padding: 40px 20px;
          }
          
          .container {
            max-width: 600px;
            background: white;
            margin: 0 auto;
            padding: 0;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            overflow: hidden;
          }
          
          .header {
            background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
            padding: 30px;
            text-align: center;
            color: white;
          }
          
          .logo-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
          }
          
          .avatar {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            object-fit: cover;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            border: 4px solid rgba(255, 255, 255, 0.2);
          }
          
          .title {
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            letter-spacing: -0.025em;
          }
          
          .subtitle {
            font-size: 16px;
            opacity: 0.9;
            margin-top: 8px;
            color:rgb(227, 227, 227);
          }
          
          .content {
            padding: 40px 30px;
          }
          
          h2 {
            font-size: 22px;
            font-weight: 600;
            color: var(--dark);
            margin-top: 0;
            margin-bottom: 20px;
          }
          
          p {
            font-size: 16px;
            color: #4B5563;
            margin-bottom: 24px;
          }
          
          .button-container {
            text-align: center;
            margin: 30px 0;
          }
          
          .button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
            color: white !important;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            border-radius: 8px;
            transition: all 0.2s ease;
            box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4), 0 2px 4px -1px rgba(99, 102, 241, 0.2);
          }
          
          .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4), 0 4px 6px -2px rgba(99, 102, 241, 0.2);
          }
          
          .link-fallback {
            margin: 24px 0;
            padding: 16px;
            background-color: #F9FAFB;
            border-radius: 8px;
            word-break: break-all;
            font-size: 14px;
            color: #6B7280;
            border: 1px solid #E5E7EB;
          }
          
          .expiration-notice {
            margin: 30px 0;
            padding: 16px;
            background-color: #FEF3C7;
            border-radius: 8px;
            font-size: 15px;
            color: #92400E;
            display: flex;
            align-items: center;
            border-left: 4px solid #F59E0B;
          }
          
          .expiration-notice svg {
            margin-right: 12px;
            flex-shrink: 0;
          }
          
          .divider {
            height: 1px;
            background-color: #E5E7EB;
            margin: 30px 0;
          }
          
          .footer {
            background-color: #F9FAFB;
            padding: 24px 30px;
            font-size: 14px;
            color: #6B7280;
            text-align: center;
            border-top: 1px solid #E5E7EB;
          }
          
          .social-links {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
          }
          
          .social-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: #E5E7EB;
            margin: 0 8px;
            color: #4B5563;
            text-decoration: none;
            transition: all 0.2s ease;
          }
          
          .social-link:hover {
            background-color: #6366F1;
            color: white;
            transform: translateY(-2px);
          }
          
          @media (max-width: 600px) {
            .container {
              border-radius: 0;
            }
            .content {
              padding: 30px 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <div class="logo-container">
                <img src="${avatarUrl}" alt="CS341 Logo" class="avatar">
              </div>
              <h1 class="title">Verify Your Account</h1>
              <p class="subtitle">One quick step to get started</p>
            </div>
            
            <div class="content">
              <h2>Hello ${username},</h2>
              <p>Thank you for signing up for CS341! To ensure the security of your account, please verify your email address by clicking the button below:</p>
              
              <div class="button-container">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </div>
              
              <p>If you're having trouble with the button above, you can copy and paste the URL below into your browser:</p>
              
              <div class="link-fallback">
                ${verificationUrl}
              </div>
              
              <div class="expiration-notice">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                  <strong>Important:</strong> This verification link will expire on 
                  ${expirationDate.toLocaleString()} (24 hours from now)
                </div>
              </div>
              
              <div class="divider"></div>
              
              <p>If you did not sign up for CS341, please disregard this message. No action is required.</p>
            </div>
            
            <div class="footer">
              <div class="social-links">
                <a href="#" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
              <p>&copy; ${new Date().getFullYear()} CS341. All rights reserved.</p>
              <p>CS341 BYUI • 123 Education Ave • Knowledge City, KS 12345</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Email sender details
    sendSmtpEmail.sender = {
      name: "CS341 Support",
      email: process.env.EMAIL_SENDER_EMAIL,
    }
    sendSmtpEmail.to = [{ email }]

    await apiInstance.sendTransacEmail(sendSmtpEmail)
    console.log("Verification email sent")
  } catch (error) {
    console.error("Error sending verification email:", error)
    throw new Error("Failed to send verification email")
  }
}

// Reset Password -------------------------------------------------------------------
const sendPasswordResetEmail = async (email, token, username, expiryTimestamp) => {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
    sendSmtpEmail.subject = "Reset Your CS341 Password"

    // Construct the password reset URL
    const resetUrl = `${process.env.API_BASE_URL}/api/users/reset-password?token=${token}`

    // Generate avatar URL with custom 'E'
    const avatarUrl = generateEmailAvatar()

    // Calculate expiration time from the timestamp
    const expirationDate = new Date(expiryTimestamp)
    // Make sure expiryTimestamp is a valid number before calculating
    const hoursRemaining = isNaN(expiryTimestamp)
      ? 24 // Default to 24 if timestamp is invalid
      : Math.max(1, Math.round((expiryTimestamp - Date.now()) / (1000 * 60 * 60)))

    // HTML Email with avatar
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your CS341 Password</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          :root {
            --primary: #6366F1;
            --primary-dark: #4F46E5;
            --secondary: #10B981;
            --dark: #1F2937;
            --light: #F9FAFB;
            --gray: #9CA3AF;
            --danger: #EF4444;
            --warning: #F59E0B;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: var(--dark);
            background-color: #F3F4F6;
            padding: 0;
            margin: 0;
          }
          
          .wrapper {
            background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
            padding: 40px 20px;
          }
          
          .container {
            max-width: 600px;
            background: white;
            margin: 0 auto;
            padding: 0;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            overflow: hidden;
          }
          
          .header {
            background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
            padding: 30px;
            text-align: center;
            color: white;
          }
          
          .logo-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
          }
          
          .avatar {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            object-fit: cover;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            border: 4px solid rgba(255, 255, 255, 0.2);
          }
          
          .title {
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            letter-spacing: -0.025em;
          }
          
          .subtitle {
            font-size: 16px;
            opacity: 0.9;
            margin-top: 8px;
            color:rgb(227, 227, 227);
          }
          
          .content {
            padding: 40px 30px;
          }
          
          h2 {
            font-size: 22px;
            font-weight: 600;
            color: var(--dark);
            margin-top: 0;
            margin-bottom: 20px;
          }
          
          p {
            font-size: 16px;
            color: #4B5563;
            margin-bottom: 24px;
          }
          
          .button-container {
            text-align: center;
            margin: 30px 0;
          }
          
          .button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
            color: white !important;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            border-radius: 8px;
            transition: all 0.2s ease;
            box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4), 0 2px 4px -1px rgba(99, 102, 241, 0.2);
          }
          
          .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4), 0 4px 6px -2px rgba(99, 102, 241, 0.2);
          }
          
          .link-fallback {
            margin: 24px 0;
            padding: 16px;
            background-color: #F9FAFB;
            border-radius: 8px;
            word-break: break-all;
            font-size: 14px;
            color: #6B7280;
            border: 1px solid #E5E7EB;
          }
          
          .expiration-notice {
            margin: 30px 0;
            padding: 16px;
            background-color: #FEF3C7;
            border-radius: 8px;
            font-size: 15px;
            color: #92400E;
            display: flex;
            align-items: center;
            border-left: 4px solid #F59E0B;
          }
          
          .expiration-notice svg {
            margin-right: 12px;
            flex-shrink: 0;
          }
          
          .security-info {
            margin: 30px 0;
            padding: 16px;
            background-color: #ECFDF5;
            border-radius: 8px;
            font-size: 15px;
            color: #065F46;
            display: flex;
            align-items: flex-start;
            border-left: 4px solid #10B981;
          }
          
          .security-info svg {
            margin-right: 12px;
            margin-top: 2px;
            flex-shrink: 0;
          }
          
          .divider {
            height: 1px;
            background-color: #E5E7EB;
            margin: 30px 0;
          }
          
          .support-info {
            margin: 30px 0;
            padding: 20px;
            background-color: #F3F4F6;
            border-radius: 8px;
            text-align: center;
          }
          
          .support-info p {
            margin: 0;
          }
          
          .support-info a {
            color: #6366F1;
            text-decoration: none;
            font-weight: 500;
          }
          
          .support-info a:hover {
            text-decoration: underline;
          }
          
          .thankyou {
            margin-top: 30px;
            font-style: normal;
            text-align: center;
          }
          
          .thankyou p {
            margin-bottom: 5px;
          }
          
          .footer {
            background-color: #F9FAFB;
            padding: 24px 30px;
            font-size: 14px;
            color: #6B7280;
            text-align: center;
            border-top: 1px solid #E5E7EB;
          }
          
          .social-links {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
          }
          
          .social-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: #E5E7EB;
            margin: 0 8px;
            color: #4B5563;
            text-decoration: none;
            transition: all 0.2s ease;
          }
          
          .social-link:hover {
            background-color: #6366F1;
            color: white;
            transform: translateY(-2px);
          }
          
          @media (max-width: 600px) {
            .container {
              border-radius: 0;
            }
            .content {
              padding: 30px 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <div class="logo-container">
                <img src="${avatarUrl}" alt="CS341 Logo" class="avatar">
              </div>
              <h1 class="title">Password Reset</h1>
              <p class="subtitle">Secure your account</p>
            </div>
            
            <div class="content">
              <h2>Hello ${username},</h2>
              <p>We received a request to reset the password for your CS341 account. To proceed with resetting your password, please click the button below:</p>
              
              <div class="button-container">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </div>
              
              <p>If you're having trouble with the button above, you can copy and paste the URL below into your browser:</p>
              
              <div class="link-fallback">
                ${resetUrl}
              </div>
              
              <div class="expiration-notice">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                  <strong>Important:</strong> This password reset link will expire on 
                  ${expirationDate instanceof Date && !isNaN(expirationDate) ? expirationDate.toLocaleString() : "tomorrow"} 
                  (approximately ${hoursRemaining} ${hoursRemaining === 1 ? "hour" : "hours"} from now)
                </div>
              </div>
              
              <div class="security-info">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <div>
                  <strong>Security Notice:</strong> If you didn't request this password reset, please ignore this email or contact support immediately. Your account security is important to us.
                </div>
              </div>
              
              <div class="divider"></div>
              
              <div class="support-info">
                <p>Need help or have questions?</p>
                <p>Contact our support team at <a href="mailto:support@cs341.com">support@cs341.com</a></p>
              </div>
              
              <div class="thankyou">
                <p>Thank you for using CS341,</p>
                <p><strong>The CS341 Team</strong></p>
              </div>
            </div>
            
            <div class="footer">
              <div class="social-links">
                <a href="#" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
              <p>&copy; ${new Date().getFullYear()} CS341. All rights reserved.</p>
              <p>CS341 BYUI • 123 Education Ave • Knowledge City, KS 12345</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Email sender details
    sendSmtpEmail.sender = {
      name: "CS341 Support",
      email: process.env.EMAIL_SENDER_EMAIL,
    }
    sendSmtpEmail.to = [{ email }]

    await apiInstance.sendTransacEmail(sendSmtpEmail)
    console.log("Password reset email sent")
  } catch (error) {
    console.error("Error sending password reset email:", error)
    throw new Error("Failed to send password reset email")
  }
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail }



















// require("dotenv").config()
// const SibApiV3Sdk = require("@getbrevo/brevo")

// // Initialize the API client
// const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
// apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY)

// // Generate avatar with custom 'E' and gradient background
// const generateEmailAvatar = () => {
//   return `https://ui-avatars.com/api/?name=E&background=2673DD&color=fff&size=128&bold=true&fontSize=0.6`
// }

// // Send Verification Email to the User
// const sendVerificationEmail = async (email, token, username) => {
//   try {
//     const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
//     sendSmtpEmail.subject = "Verify Your CS341 Account"

//     // Construct the verification URL
//     const verificationUrl = `${process.env.API_BASE_URL}/api/users/verify-email?token=${token}`

//     // Generate avatar URL with custom 'E'
//     const avatarUrl = generateEmailAvatar()

//     // Calculate expiration time (24 hours from now)
//     const expirationDate = new Date(Date.now() + 86400000) // 24 hours in milliseconds
//     const hoursRemaining = 24 // Since we're setting it to exactly 24 hours

//     // HTML Email with avatar
//     sendSmtpEmail.htmlContent = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Verify Your CS341 Account</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             line-height: 1.6;
//             color: #333;
//             background-color: #f4f4f4;
//             padding: 20px;
//           }
//           .container {
//             max-width: 600px;
//             background: white;
//             margin: 0 auto;
//             padding: 20px;
//             border-radius: 10px;
//             box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//           }
//           .header {
//             display: flex;
//             align-items: center;
//             margin-bottom: 20px;
//           }
//           .avatar {
//             width: 50px;
//             height: 50px;
//             border-radius: 50%;
//             object-fit: cover;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//             margin-right: 15px;
//           }
//           .title {
//             font-size: 20px;
//             font-weight: bold;
//             color: #2673DD;
//           }
//           .button {
//             display: inline-block;
//             padding: 12px 20px;
//             background-color: #2673DD;
//             color: #ffffff !important;
//             font-size: 16px;
//             font-weight: bold;
//             text-decoration: none;
//             border-radius: 5px;
//             margin: 15px 0;
//           }
//           .button:hover {
//             background-color: #1a5bbf;
//             transition: 0.3s;
//           }
//           .link-fallback {
//             margin: 20px 0;
//             padding: 15px;
//             background-color: #f8f9fa;
//             border-radius: 5px;
//             word-break: break-all;
//           }
//           .expiration-notice {
//             margin: 15px 0;
//             padding: 10px;
//             background-color: #fff8e1;
//             border-left: 4px solid #ffc107;
//             font-size: 14px;
//           }
//           .footer {
//             margin-top: 20px;
//             font-size: 12px;
//             color: #777;
//             border-top: 1px solid #eee;
//             padding-top: 10px;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <img src="${avatarUrl}" alt="CS341 Logo" class="avatar">
//             <div class="title">CS341 Account Verification</div>
//           </div>
          
//           <h2>Hello ${username},</h2>
//           <p>Thank you for signing up for CS341! Please verify your email address by clicking the button below:</p>
          
//           <p>
//             <a href="${verificationUrl}" class="button">Verify Email</a>
//           </p>
          
//           <p><strong>If the button doesn't work</strong>, copy and paste this link into your browser:</p>
//           <div class="link-fallback">
//             ${verificationUrl}
//           </div>

//           <div class="expiration-notice">
//             <strong>Important:</strong> This verification link will expire on 
//             ${expirationDate.toLocaleString()} 
//             (24 hours from now)
//           </div>
          
//           <p>If you did not sign up for CS341, please ignore this message.</p>
          
//           <div class="footer">
//             <p>&copy; ${new Date().getFullYear()} CS341. All rights reserved.</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `

//     // Email sender details
//     sendSmtpEmail.sender = {
//       name: "CS341 Support",
//       email: process.env.EMAIL_SENDER_EMAIL,
//     }
//     sendSmtpEmail.to = [{ email }]

//     await apiInstance.sendTransacEmail(sendSmtpEmail)
//     console.log("Verification email sent")
//   } catch (error) {
//     console.error("Error sending verification email:", error)
//     throw new Error("Failed to send verification email")
//   }
// }




// // Reset Password -------------------------------------------------------------------
// const sendPasswordResetEmail = async (email, token, username, expiryTimestamp) => {
//   try {
//     const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
//     sendSmtpEmail.subject = "Reset Your CS341 Password"

//     // Construct the password reset URL
//     const resetUrl = `${process.env.API_BASE_URL}/api/users/reset-password?token=${token}`

//     // Generate avatar URL with custom 'E'
//     const avatarUrl = generateEmailAvatar()

//     // Calculate expiration time from the timestamp
//     const expirationDate = new Date(expiryTimestamp)
//     // Make sure expiryTimestamp is a valid number before calculating
//     const hoursRemaining = isNaN(expiryTimestamp)
//       ? 24 // Default to 24 if timestamp is invalid
//       : Math.max(1, Math.round((expiryTimestamp - Date.now()) / (1000 * 60 * 60)))

//     // HTML Email with avatar
//     sendSmtpEmail.htmlContent = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Reset Your CS341 Password</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             line-height: 1.6;
//             color: #333;
//             background-color: #f4f4f4;
//             padding: 20px;
//           }
//           .container {
//             max-width: 600px;
//             background: white;
//             margin: 0 auto;
//             padding: 20px;
//             border-radius: 10px;
//             box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//           }
//           .header {
//             display: flex;
//             align-items: center;
//             margin-bottom: 20px;
//           }
//           .avatar {
//             width: 50px;
//             height: 50px;
//             border-radius: 50%;
//             object-fit: cover;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//             margin-right: 15px;
//           }
//           .title {
//             font-size: 20px;
//             font-weight: bold;
//             color: #2673DD;
//           }
//           .button {
//             display: inline-block;
//             padding: 12px 20px;
//             background-color: #2673DD;
//             color: #ffffff !important;
//             font-size: 16px;
//             font-weight: bold;
//             text-decoration: none;
//             border-radius: 5px;
//             margin: 15px 0;
//           }
//           .button:hover {
//             background-color: #1a5bbf;
//             transition: 0.3s;
//           }
//           .link-fallback {
//             margin: 20px 0;
//             padding: 15px;
//             background-color: #f8f9fa;
//             border-radius: 5px;
//             word-break: break-all;
//           }
//           .expiration-notice {
//             margin: 15px 0;
//             padding: 10px;
//             background-color: #fff8e1;
//             border-left: 4px solid #ffc107;
//             font-size: 14px;
//           }
//           .support-info {
//             margin-top: 20px;
//             font-size: 14px;
//             color: #555;
//           }
//           .thankyou {
//             margin-top: 20px;
//             font-style: italic;
//           }
//           .footer {
//             margin-top: 20px;
//             font-size: 12px;
//             color: #777;
//             border-top: 1px solid #eee;
//             padding-top: 10px;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <img src="${avatarUrl}" alt="CS341 Logo" class="avatar">
//             <div class="title">Password Reset Request</div>
//           </div>
          
//           <h2>Hello ${username},</h2>
//           <p>We received a request to reset your password for your CSE341 account. 
//           If you made this request, please click the link below to reset your password:
//           </p>
          
//           <p>
//             <a href="${resetUrl}" class="button">Reset Password</a>
//           </p>
          
//           <p><strong>If the button doesn't work</strong>, copy and paste this link into your browser:</p>
//           <div class="link-fallback">
//             ${resetUrl}
//           </div>
          
//           <div class="expiration-notice">
//             <strong>Important:</strong> This password reset link will expire on 
//             ${expirationDate instanceof Date && !isNaN(expirationDate) ? expirationDate.toLocaleString() : "tomorrow"} 
//             (approximately ${hoursRemaining} ${hoursRemaining === 1 ? "hour" : "hours"} from now)
//           </div>
          
//           <p><strong>Didn't request this?</strong> Please ignore this email if you didn't request a password reset. 
//           Your password will remain the same.</p>
          
//           <div class="support-info">
//             <p>Need help? Contact <a href="mailto:support@cs341.com">support@cs341.com</a></p>
//           </div>

//           <div class="thankyou">
//             <p>Thank you,
//             <div>CSE341 Team</div>
//             </p>
//           </div>
          
//           <div class="footer">
//             <p>&copy; ${new Date().getFullYear()} CS341. All rights reserved.</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `

//     // Email sender details
//     sendSmtpEmail.sender = {
//       name: "CS341 Support",
//       email: process.env.EMAIL_SENDER_EMAIL,
//     }
//     sendSmtpEmail.to = [{ email }]

//     await apiInstance.sendTransacEmail(sendSmtpEmail)
//     console.log("Password reset email sent")
//   } catch (error) {
//     console.error("Error sending password reset email:", error)
//     throw new Error("Failed to send password reset email")
//   }
// }

// module.exports = { sendVerificationEmail, sendPasswordResetEmail }













// ==========================================================================================
// ==========================================================================================
// ==========================================================================================




// require("dotenv").config();
// const SibApiV3Sdk = require("@getbrevo/brevo");

// // Initialize the API client
// const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
// apiInstance.setApiKey(
//   SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
//   process.env.BREVO_API_KEY
// );

// // Generate avatar with custom 'E' and gradient background
// const generateEmailAvatar = () => {
//   return `https://ui-avatars.com/api/?name=E&background=2673DD&color=fff&size=128&bold=true&font-size=0.6`;
// };

// // Send Verification Email to the User
// const sendVerificationEmail = async (email, token, username) => {
//   try {
//     const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//     sendSmtpEmail.subject = "Verify Your CS341 Account";

//     // Construct the verification URL
//     const verificationUrl = `${process.env.API_BASE_URL}/api/users/verify-email?token=${token}`;

//     // Generate avatar URL with custom 'E'
//     const avatarUrl = generateEmailAvatar();

//     // HTML Email with avatar
//     sendSmtpEmail.htmlContent = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Verify Your CS341 Account</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             line-height: 1.6;
//             color: #333;
//             background-color: #f4f4f4;
//             padding: 20px;
//           }
//           .container {
//             max-width: 600px;
//             background: white;
//             margin: 0 auto;
//             padding: 20px;
//             border-radius: 10px;
//             box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//           }
//           .header {
//             display: flex;
//             align-items: center;
//             margin-bottom: 20px;
//           }
//           .avatar {
//             width: 50px;
//             height: 50px;
//             border-radius: 50%;
//             object-fit: cover;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//             margin-right: 15px;
//           }
//           .title {
//             font-size: 20px;
//             font-weight: bold;
//             color: #2673DD;
//           }
//           .button {
//             display: inline-block;
//             padding: 12px 20px;
//             background-color: #2673DD;
//             color: #ffffff !important;
//             font-size: 16px;
//             font-weight: bold;
//             text-decoration: none;
//             border-radius: 5px;
//             margin: 15px 0;
//           }
//           .button:hover {
//             background-color: #1a5bbf;
//             transition: 0.3s;
//           }
//           .link-fallback {
//             margin: 20px 0;
//             padding: 15px;
//             background-color: #f8f9fa;
//             border-radius: 5px;
//             word-break: break-all;
//           }
//           .footer {
//             margin-top: 20px;
//             font-size: 12px;
//             color: #777;
//             border-top: 1px solid #eee;
//             padding-top: 10px;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <img src="${avatarUrl}" alt="CS341 Logo" class="avatar">
//             <div class="title">CS341 Account Verification</div>
//           </div>
          
//           <h2>Hello ${username},</h2>
//           <p>Thank you for signing up for CS341! Please verify your email address by clicking the button below:</p>
          
//           <p>
//             <a href="${verificationUrl}" class="button">Verify Email</a>
//           </p>
          
//           <p><strong>If the button doesn't work</strong>, copy and paste this link into your browser:</p>
//           <div class="link-fallback">
//             ${verificationUrl}
//           </div>
          
//           <p>If you did not sign up for CS341, please ignore this message.</p>
          
//           <div class="footer">
//             <p>&copy; ${new Date().getFullYear()} CS341. All rights reserved.</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;

//     // Email sender details
//     sendSmtpEmail.sender = {
//       name: "CS341 Support",
//       email: process.env.EMAIL_SENDER_EMAIL, 
//     };
//     sendSmtpEmail.to = [{ email }];

//     await apiInstance.sendTransacEmail(sendSmtpEmail);
//     console.log("Verification email sent");
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//     throw new Error("Failed to send verification email");
//   }
// };

// // Reset Password
// const sendPasswordResetEmail = async (email, token, username) => {
//   try {
//     const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//     sendSmtpEmail.subject = "Reset Your CS341 Password";

//     // Construct the password reset URL
//     const resetUrl = `${process.env.API_BASE_URL}/api/users/reset-password?token=${token}`;

//     // Generate avatar URL with custom 'E'
//     const avatarUrl = generateEmailAvatar();

//     // HTML Email with avatar
//     sendSmtpEmail.htmlContent = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Reset Your CS341 Password</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             line-height: 1.6;
//             color: #333;
//             background-color: #f4f4f4;
//             padding: 20px;
//           }
//           .container {
//             max-width: 600px;
//             background: white;
//             margin: 0 auto;
//             padding: 20px;
//             border-radius: 10px;
//             box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//           }
//           .header {
//             display: flex;
//             align-items: center;
//             margin-bottom: 20px;
//           }
//           .avatar {
//             width: 50px;
//             height: 50px;
//             border-radius: 50%;
//             object-fit: cover;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//             margin-right: 15px;
//           }
//           .title {
//             font-size: 20px;
//             font-weight: bold;
//             color: #2673DD;
//           }
//           .button {
//             display: inline-block;
//             padding: 12px 20px;
//             background-color: #2673DD;
//             color: #ffffff !important;
//             font-size: 16px;
//             font-weight: bold;
//             text-decoration: none;
//             border-radius: 5px;
//             margin: 15px 0;
//           }
//           .button:hover {
//             background-color: #1a5bbf;
//             transition: 0.3s;
//           }
//           .link-fallback {
//             margin: 20px 0;
//             padding: 15px;
//             background-color: #f8f9fa;
//             border-radius: 5px;
//             word-break: break-all;
//           }
//           .footer {
//             margin-top: 20px;
//             font-size: 12px;
//             color: #777;
//             border-top: 1px solid #eee;
//             padding-top: 10px;
//           }
//           .support-info {
//             margin-top: 20px;
//             font-size: 14px;
//             color: #555;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <img src="${avatarUrl}" alt="CS341 Logo" class="avatar">
//             <div class="title">Password Reset Request</div>
//           </div>
          
//           <h2>Hello ${username},</h2>
//           <p>We received a request to reset your password for your CSE341 account. 
//           If you made this request, please click the link below to reset your password:
//           </p>
          
//           <p>
//             <a href="${resetUrl}" class="button">Reset Password</a>
//           </p>
          
//           <p><strong>If the button doesn't work</strong>, copy and paste this link into your browser:</p>
//           <div class="link-fallback">
//             ${resetUrl}
//           </div>
          
//           <p><strong>Didn't request this?</strong> Please ignore this email if you didn't request a password reset. 
//           Your password will remain the same.
//           <div>For security reasons, this link will expire in [timeframe, e.g., 24 hours].</div>
//           </p>
          
//           <div class="support-info">
//             <p>Need help? Contact <a href="mailto:support@cs341.com">support@cs341.com</a></p>
//           </div>

//           <div class="thankyou">
//           <p>Thank you,</p>
//           <div>CSE341 Team</div>
//           </div>
          
//           <div class="footer">
//             <p>&copy; ${new Date().getFullYear()} CS341. All rights reserved.</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;

//     // Email sender details
//     sendSmtpEmail.sender = {
//       name: "CS341 Support",
//       email: process.env.EMAIL_SENDER_EMAIL,
//     };
//     sendSmtpEmail.to = [{ email }];

//     await apiInstance.sendTransacEmail(sendSmtpEmail);
//     console.log("Password reset email sent");
//   } catch (error) {
//     console.error("Error sending password reset email:", error);
//     throw new Error("Failed to send password reset email");
//   }
// };

// module.exports = { sendVerificationEmail, sendPasswordResetEmail };













// ==========================================================================================
// ==========================================================================================
// ==========================================================================================


// require("dotenv").config();
// const fs = require("fs");
// const path = require("path");
// const SibApiV3Sdk = require("@getbrevo/brevo");


// // Initialize the API client --------------------------------------------------------------
// const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
// apiInstance.setApiKey(
//   SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
//   process.env.BREVO_API_KEY
// );


// // Send Verification Email to the User --------------------------------------------------------------
// const sendVerificationEmail = async (email, token, username) => {
//   try {
//     const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//     sendSmtpEmail.subject = "Verify Your CS341 Account";

//     // Construct the verification URL
//     const verificationUrl = `${process.env.API_BASE_URL}/api/users/verify-email?token=${token}`;

//     // Attach image directly 
//     const logoCid = "cs341logo"; 
//     const logoPath = path.join(__dirname, "../public/images/logo.png");

//     // Read the image as a buffer
//     let logoBuffer;
//     try {
//       logoBuffer = fs.readFileSync(logoPath);
//     } catch (error) {
//       console.error("Error reading logo image:", error);
//       logoBuffer = null;
//     }

//     // HTML Email with inline image
//     sendSmtpEmail.htmlContent = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Verify Your CS341 Account</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             line-height: 1.6;
//             color: #333;
//             background-color: #f4f4f4;
//             padding: 20px;
//             text-align: center;
//           }
//           .container {
//             max-width: 600px;
//             background: white;
//             margin: 0 auto;
//             padding: 20px;
//             border-radius: 10px;
//             box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//           }
//           .logo img {
//             max-width: 100px; /* Adjusted logo size */
//             height: auto;
//           }
//           .button {
//             display: inline-block;
//             padding: 12px 20px;
//             background-color: #007bff;
//             color: #ffffff;
//             font-size: 16px;
//             font-weight: bold;
//             text-decoration: none;
//             border-radius: 5px;
//             margin-top: 20px;
//           }

//           .button:hover{
//               background-color: #000;
//               color: #ffffff;
//               transition: 05s;
//             }

//           .footer {
//             margin-top: 20px;
//             font-size: 12px;
//             color: #777;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="logo">
//             <img src="cid:${logoCid}" alt="CS341 Logo">
//           </div>
//           <h2>Hello ${username},</h2>
//           <p>Thank you for signing up for CS341! Please verify your email address by clicking the button below:</p>
//           <p>
//             <a href="${verificationUrl}" class="button">Verify Email</a>
//           </p>
//           <p>If you did not sign up for CS341, please ignore this message.</p>
//           <div class="footer">
//             <p>&copy; ${new Date().getFullYear()} CS341. All rights reserved.</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;


//     // Email sender details --------------------------------------------------------------
//     sendSmtpEmail.sender = {
//       name: "CS341 Support",
//       email: process.env.EMAIL_SENDER_EMAIL, 
//     };
//     sendSmtpEmail.to = [{ email }];


//     // Attach the image as an inline image --------------------------------------------------------------
//     if (logoBuffer) {
//       sendSmtpEmail.inlineImage = [
//         {
//           content: logoBuffer.toString("base64"),
//           name: "logo.png",
//           contentId: logoCid, 
//         },
//       ];
//     }

//     await apiInstance.sendTransacEmail(sendSmtpEmail);
//     console.log("Verification email sent");
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//     throw new Error("Failed to send verification email");
//   }
// };


// // Reset Password
// const sendPasswordResetEmail = async (email, token, username) => {
//   try {
//     const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//     sendSmtpEmail.subject = "Reset Your CS341 Password";

//     // Construct the password reset URL
//     const resetUrl = `${process.env.API_BASE_URL}/api/users/reset-password?token=${token}`;

//     // Attach image directly 
//     const logoCid = "cs341logo"; 
//     const logoPath = path.join(__dirname, "../public/images/logo.png");

//     // Read the image as a buffer
//     let logoBuffer;
//     try {
//       logoBuffer = fs.readFileSync(logoPath);
//     } catch (error) {
//       console.error("Error reading logo image:", error);
//       logoBuffer = null;
//     }

//     // HTML Email with inline image --------------------------------------------------------------
//     sendSmtpEmail.htmlContent = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Reset Your CS341 Password</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             line-height: 1.6;
//             color: #333;
//             background-color: #f4f4f4;
//             padding: 20px;
//             text-align: center;
//           }
//           .container {
//             max-width: 600px;
//             background: white;
//             margin: 0 auto;
//             padding: 20px;
//             border-radius: 10px;
//             box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//           }
//           .logo img {
//             max-width: 100px; /* Adjusted logo size */
//             height: auto;
//           }
//           .button {
//             display: inline-block;
//             padding: 12px 20px;
//             background-color: #007bff;
//             color: #ffffff;
//             font-size: 16px;
//             font-weight: bold;
//             text-decoration: none;
//             border-radius: 5px;
//             margin-top: 20px;
//           }
//           .button:hover {
//             background-color: #000;
//             color: #ffffff;
//             transition: 0.5s;
//           }
//           .footer {
//             margin-top: 20px;
//             font-size: 12px;
//             color: #777;
//           }
//           .support-info {
//             margin-top: 20px;
//             font-size: 14px;
//             color: #555;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="logo">
//             <img src="cid:${logoCid}" alt="CS341 Logo">
//           </div>
//           <h2>Hello ${username},</h2>
//           <p>We received a request to reset your password for your CS341 account. If this was you, please click the button below to reset your password:</p>
//           <p>
//             <a href="${resetUrl}" class="button">Reset Password</a>
//           </p>
//           <p><strong>Didn't request this?</strong> If you did not request a password reset, please ignore this email. Your account is secure, and no changes have been made.</p>
//           <div class="support-info">
//             <p>If you have any questions or need further assistance, please contact our support team at <a href="mailto:support@cs341.com">support@cs341.com</a>.</p>
//           </div>
//           <div class="footer">
//             <p>&copy; ${new Date().getFullYear()} CS341. All rights reserved.</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;


//     // Email sender details --------------------------------------------------------------
//     sendSmtpEmail.sender = {
//       name: "CS341 Support",
//       email: process.env.EMAIL_SENDER_EMAIL, // Must be verified in Brevo
//     };
//     sendSmtpEmail.to = [{ email }];


//     // Attach the image as an inline image
//     if (logoBuffer) {
//       sendSmtpEmail.inlineImage = [
//         {
//           content: logoBuffer.toString("base64"),
//           name: "logo.png",
//           contentId: logoCid, // This ensures the image is referenced correctly
//         },
//       ];
//     }

//     await apiInstance.sendTransacEmail(sendSmtpEmail);
//     console.log("Password reset email sent");
//   } catch (error) {
//     console.error("Error sending password reset email:", error);
//     throw new Error("Failed to send password reset email");
//   }
// };

// module.exports = { sendVerificationEmail, sendPasswordResetEmail };



































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

// /**
//  * Send a verification email to the user.
//  * @param {string} email - The user's email address.
//  * @param {string} token - The verification token.
//  * @param {string} username - The user's username.
//  */
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



// /**
//  * Send a password reset email to the user.
//  * @param {string} email - The user's email address.
//  * @param {string} token - The password reset token.
//  * @param {string} username - The user's username.
//  */
// const sendPasswordResetEmail = async (email, token, username) => {
//   const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//   sendSmtpEmail.subject = "Reset Your CS341 Password";

//   // Construct the password reset URL
//   const resetUrl = `${process.env.API_BASE_URL}/api/users/reset-password?token=${token}`;

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

// // HTML Email with inline image
// sendSmtpEmail.htmlContent = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Reset Your CS341 Password</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       line-height: 1.6;
//       color: #333;
//       background-color: #f4f4f4;
//       padding: 20px;
//       text-align: center;
//     }
//     .container {
//       max-width: 600px;
//       background: white;
//       margin: 0 auto;
//       padding: 20px;
//       border-radius: 10px;
//       box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//     }
//     .logo img {
//       max-width: 100px; /* Adjusted logo size */
//       height: auto;
//     }
//     .button {
//       display: inline-block;
//       padding: 12px 20px;
//       background-color: #007bff;
//       color: #ffffff;
//       font-size: 16px;
//       font-weight: bold;
//       text-decoration: none;
//       border-radius: 5px;
//       margin-top: 20px;
//     }
//     .button:hover {
//       background-color: #000;
//       color: #ffffff;
//       transition: 0.5s;
//     }
//     .footer {
//       margin-top: 20px;
//       font-size: 12px;
//       color: #777;
//     }
//     .support-info {
//       margin-top: 20px;
//       font-size: 14px;
//       color: #555;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="logo">
//       <img src="cid:${logoCid}" alt="CS341 Logo">
//     </div>
//     <h2>Hello ${username},</h2>
//     <p>We received a request to reset your password for your CS341 account. If this was you, please click the button below to reset your password:</p>
//     <p>
//       <a href="${resetUrl}" class="button">Reset Password</a>
//     </p>
//     <p><strong>Didn't request this?</strong> If you did not request a password reset, please ignore this email. Your account is secure, and no changes have been made.</p>
//     <div class="support-info">
//       <p>If you have any questions or need further assistance, please contact our support team at <a href="mailto:support@cs341.com">support@cs341.com</a>.</p>
//     </div>
//     <div class="footer">
//       <p>&copy; ${new Date().getFullYear()} CS341. All rights reserved.</p>
//     </div>
//   </div>
// </body>
// </html>
// `;

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
//     console.log("Password reset email sent");
//   } catch (error) {
//     console.error("Error sending password reset email:", error);
//   }
// };

// module.exports = { sendVerificationEmail, sendPasswordResetEmail };