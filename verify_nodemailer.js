const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function checkNodemailer() {
  console.log("Checking Nodemailer configuration...");
  const password = process.env.GMAIL_APP_PASSWORD;
  
  if (!password) {
    console.error("❌ GMAIL_APP_PASSWORD is not set in .env.local");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'amanr3388@gmail.com',
      pass: password,
    },
  });

  try {
    await transporter.verify();
    console.log("✅ Nodemailer is configured correctly and ready to send emails.");
  } catch (error) {
    console.error("❌ Nodemailer verification failed:", error.message);
  }
}

checkNodemailer();
