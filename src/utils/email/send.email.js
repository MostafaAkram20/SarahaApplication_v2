
import nodemailer from "nodemailer";
// import path from 'node:path'
// import { info } from "node:console";


export const sendEmail = async ({ to = "" , subject = "", text = "", html = "", attachments = [] } = {}) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        // port: 587,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }, tls: {
            rejectUnauthorized: false
        }
    });


    try {
        const info = await transporter.sendMail({
            from: `"Saraha Application" <${process.env.SMTP_USER}>`, // sender address
            to, // list of recipients
            subject,
            text, // body
            html, // HTML body
            attachments
        });

        console.log("Message sent: %s", info.messageId);

    } catch (err) {
        console.error("Error while sending mail:", err);
    }


}