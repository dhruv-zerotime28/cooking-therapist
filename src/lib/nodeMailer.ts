import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

interface IResetEmail {
  resetUrl: string;
  email: string;
}

interface INewAdminCredentials {
  email: string;
  password: string;
}

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const SendPasswordResetLink = async (data: IResetEmail) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: 'Reset Your Password',
    text: `Please click the following link to reset your password: ${data.resetUrl}`,
    html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h2 style="color: #388e3c;">Password Reset Request</h2>
            <p>Hello,</p>
            <p>We received a request to reset your password. Click the button below to proceed:</p>
            <p style="text-align: center;">
              <a href="${data.resetUrl}" 
                 style="display: inline-block; padding: 12px 20px; color: #fff; background-color: #388e3c; 
                 text-decoration: none; border-radius: 5px; font-weight: bold;">
                Reset Password
              </a>
            </p>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Thanks,<br>The Support Team</p>
          </div>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { success: true, message: 'Mail sent successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error while sending mail:', error);
    return NextResponse.json(
      { success: false, message: 'Error while sending reset password link' },
      { status: 500 }
    );
  }
};

export const newAdminCredentials = async (data: INewAdminCredentials) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: 'Your Admin Credentials for Cooking Therapist',
    text: `You have been added as an admin in Cooking Therapist. Here are your credentials:
  
  Email: ${data.email}
  Password: ${data.password}
  
  Please keep your credentials secure.
  
  Thanks,
  The Support Team`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #388e3c; text-align: center;">Admin Credentials</h2>
        <p>Hello,</p>
        <p>You have been added as an admin in <strong>Cooking Therapist</strong>. Here are your credentials:</p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; text-align: center;">
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Password:</strong> ${data.password}</p>
        </div>
        <p style="color: red;"><strong>Note:</strong> Please change your password after logging in.</p>
        <p>Best regards,<br><strong>The Support Team</strong></p>
      </div>
    `,
  };
  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { success: true, message: 'Credentails has been shared on mail' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error while sending mail:', error);
    return NextResponse.json(
      { success: false, message: 'err occured while sending mail' },
      { status: 500 }
    );
  }
};

export const sendContactUsReply = async (data: any) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: `Re: ${data.subject || 'Your Inquiry to Cooking Therapist'}`,
    text: `
  Hello ${data.name},
  
  Thank you for reaching out to Cooking Therapist!
  
  We have received your message:
  
  "${data.message}"
  
  Our response to your inquiry:
  
  "${data.reply}"
  
  If you have any further questions or need assistance, please don't hesitate to reply to this email.
  
  We appreciate you being part of the Cooking Therapist community.
  
  Best regards,
  The Cooking Therapist Support Team
    `,
    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff; color: #333;">
      <h1 style="color: #2e7d32; text-align: center; margin-bottom: 20px;">Response from Cooking Therapist</h1>
      <p style="font-size: 16px;">Hello <strong>${data.name}</strong>,</p>
      <p style="font-size: 16px;">Thank you for reaching out to <strong>Cooking Therapist</strong>! We appreciate you contacting us.</p>
  
      <section style="background-color: #f9f9f9; border-left: 5px solid #388e3c; padding: 15px 20px; margin: 20px 0; border-radius: 6px;">
        <h3 style="margin-top: 0; color: #388e3c;">Your Original Message:</h3>
        <p style="font-style: italic; font-size: 15px; color: #555;">"${data.message}"</p>
      </section>
  
      <section style="background-color: #e8f5e9; border-left: 5px solid #2e7d32; padding: 15px 20px; margin-bottom: 20px; border-radius: 6px;">
        <h3 style="margin-top: 0; color: #2e7d32;">Our Reply:</h3>
        <p style="font-size: 15px; color: #2e7d32;">"${data.reply}"</p>
      </section>
  
      <p style="font-size: 16px;">If you have any further questions or need assistance, please feel free to reply to this email. We're here to help!</p>
  
      <p style="font-size: 16px;">Thank you for being a valued member of the Cooking Therapist community.</p>
  
      <p style="font-size: 16px; margin-top: 40px;">
        Best regards,<br/>
        <strong>The Cooking Therapist Support Team</strong>
      </p>
    </div>
    `,
  };
  
console.log('mail data:',data)
  try {
    await transporter.sendMail(mailOptions);
    return
  } catch (error) {
    throw Error('Error while sending the Message')
  }
};
