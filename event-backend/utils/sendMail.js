import nodemailer from "nodemailer";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

const sendMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  await transporter.sendMail({
    from: `"Eventify" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html
  });
};

export default sendMail;