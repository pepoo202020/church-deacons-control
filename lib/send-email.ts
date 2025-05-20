"use server";

import nodemailer from "nodemailer";
import { loadEmailTemplate } from "./email";

export async function sendEmail(
  data: Record<string, string>,
  templateName: string,
  sendTo: string,
  subject: string
) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_PORT === "465", // true for port 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  // Load and populate email template
  const emailHtml = loadEmailTemplate(templateName, data);
  // Send email
  await transporter.sendMail({
    from: `"Deacons Controller" <${process.env.EMAIL_USER}>`,
    to: sendTo,
    subject: subject,
    html: emailHtml,
  });
  console.log(`Email sent to ${data.email}`);
}
