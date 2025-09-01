import nodemailer from 'nodemailer'
export const transporter = nodemailer.createTransport({
  service: "Gmail", // Use Gmail SMTP
  auth: {
    user: "ap4866017@gmail.com", // Your Gmail address
    pass: "tqsp srfc mtil yrxn", // Your Gmail App Password
  },
});