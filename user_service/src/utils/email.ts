import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: "phamtrungnguyenvx99@gmail.com",
    pass: "jquv uecu futl rocg", //
  },
});

export const sendEmail = async (
  email: string,
  subject: string,
  text: string
): Promise<void> => {
  // Hàm trả về kiểu Promise<void>
  const mailOptions = {
    from: "phamtrungnguyenvx99@gmail.com",
    to: email,
    subject: subject,
    html: text,
  };
  await transporter.sendMail(mailOptions);
  return;
};
