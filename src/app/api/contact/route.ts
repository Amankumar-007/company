import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  projectDescription: string;
  services: string[];
  budget: string;
  attachments?: Array<{
    url: string;
    publicId: string;
    format: string;
    resourceType: string;
    size: number;
    name: string;
    type: string;
  }>;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as ContactFormData;
    
    const { name, email, projectDescription, services, budget, attachments } = body;

    console.log('Received form data:', { name, email, projectDescription, services, budget });

    // Validate required fields
    if (!name || !email || !projectDescription) {
      console.log('Validation failed - missing required fields');
      return NextResponse.json(
        { message: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Check if environment variables are set
    if (!process.env.GMAIL_APP_PASSWORD) {
      console.error('GMAIL_APP_PASSWORD environment variable is not set');
      return NextResponse.json(
        { message: 'Server configuration error. Please contact administrator.' },
        { status: 500 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'amanr3388@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('Transporter verified successfully');
    } catch (verifyError) {
      console.error('Transporter verification failed:', verifyError);
      return NextResponse.json(
        { message: 'Email service configuration error. Please check Gmail settings.' },
        { status: 500 }
      );
    }

    // Create email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; margin: -20px -20px 30px -20px;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">New Contact Form Submission</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Company Website Contact Form</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 12px 0; font-weight: bold; color: #555; width: 120px;">Name:</td>
              <td style="padding: 12px 0; color: #333;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 12px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 12px 0; color: #333;">${email}</td>
            </tr>
          </table>
        </div>

        ${services.length > 0 ? `
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Interested Services</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${services.map(service => `
              <span style="background: #667eea; color: white; padding: 6px 12px; border-radius: 20px; font-size: 14px;">${service}</span>
            `).join('')}
          </div>
        </div>
        ` : ''}

        ${budget ? `
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Project Budget</h2>
          <p style="margin: 0; color: #333; font-size: 16px;">$${budget} USD</p>
        </div>
        ` : ''}

        ${attachments && attachments.length > 0 ? `
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Attachments</h2>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${attachments.map(attachment => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: white; border-radius: 6px; border: 1px solid #e0e0e0;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 40px; height: 40px; background: #667eea; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; font-weight: bold;">
                    ${attachment.format.toUpperCase()}
                  </div>
                  <div>
                    <p style="margin: 0; color: #333; font-weight: 500;">${attachment.name}</p>
                    <p style="margin: 0; color: #666; font-size: 12px;">${(attachment.size / 1024 / 1024).toFixed(2)} MB • ${attachment.type}</p>
                  </div>
                </div>
                <a href="${attachment.url}" target="_blank" style="background: #667eea; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500;">View</a>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Project Description</h2>
          <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #667eea;">
            <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${projectDescription}</p>
          </div>
        </div>

        <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; border-left: 4px solid #2196F3; margin-bottom: 20px;">
          <p style="margin: 0; color: #1976D2; font-size: 14px;">
            <strong>Submission Time:</strong> ${new Date().toLocaleString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>

        <div style="text-align: center; padding: 20px; border-top: 1px solid #e0e0e0; margin-top: 30px;">
          <p style="margin: 0; color: #666; font-size: 14px;">This email was sent from your company website contact form.</p>
          <p style="margin: 5px 0 0 0; color: #999; font-size: 12px;">Please respond to the customer at their provided email address.</p>
        </div>
      </div>
    `;

    // Email options
    const mailOptions = {
      from: 'amanr3388@gmail.com',
      to: 'amanr3388@gmail.com', // Send to your Gmail
      replyTo: email, // Allow replying directly to the customer
      subject: `New Contact Form Submission from ${name}`,
      html: emailContent,
    };

    // Send email
    console.log('Attempting to send email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    console.log('Email preview URL:', nodemailer.getTestMessageUrl(info));
    
    return NextResponse.json(
      { message: 'Form submitted successfully! We\'ll get back to you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Detailed error processing contact form:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Provide more specific error messages based on error type
    let errorMessage = 'Error processing form submission. Please try again later.';
    
    if (error instanceof Error) {
      if (error.message.includes('ETIMEDOUT') || error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (error.message.includes('Invalid login') || error.message.includes('User is authenticated but not connected')) {
        errorMessage = 'Email service authentication error. Please check Gmail app password configuration.';
      } else if (error.message.includes('GMAIL_APP_PASSWORD')) {
        errorMessage = 'Server configuration error. Gmail app password not configured.';
      }
    }
    
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
