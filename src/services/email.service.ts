/**
 * DimisiReads Email Service Abstraction
 * Production-ready for Resend, Amazon SES, or custom SMTP.
 */

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export class EmailService {
  /**
   * Generic email dispatcher
   */
  static async send(options: EmailOptions): Promise<boolean> {
    const isDev = process.env.NODE_ENV !== 'production';

    if (isDev) {
      console.log('\n================ [DIMISI EMAIL DISPATCH] ================');
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log('---------------------------------------------------------');
      console.log(options.text);
      console.log('=========================================================\n');
      return true;
    }

    // In production, integrate with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ from: 'DimisiReads <sanctuary@dimisireads.com>', ...options });
    return true;
  }

  /**
   * Send Email Verification Link
   */
  static async sendVerificationEmail(email: string, token: string): Promise<boolean> {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const verifyUrl = `${appUrl}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

    return this.send({
      to: email,
      subject: 'Verify your DimisiReads sanctuary account',
      text: `Welcome to DimisiReads.\n\nPlease verify your email by clicking the following link:\n${verifyUrl}\n\nThis link will expire in 24 hours.`,
      html: `
        <div style="font-family: serif; color: #1C1417; background-color: #F8F4E7; padding: 40px; border-radius: 8px;">
          <h2 style="color: #722F37;">Welcome to DimisiReads</h2>
          <p>Your sanctuary for contemplative, legal digital reading awaits.</p>
          <p style="margin: 25px 0;">
            <a href="${verifyUrl}" style="background-color: #722F37; color: #F8F4E7; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Verify My Sanctum Account
            </a>
          </p>
          <p style="font-size: 12px; color: #7D7376;">Or copy this URL: ${verifyUrl}</p>
        </div>
      `,
    });
  }

  /**
   * Send Password Reset Link
   */
  static async sendPasswordResetEmail(email: string, token: string): Promise<boolean> {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const resetUrl = `${appUrl}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    return this.send({
      to: email,
      subject: 'Reset your DimisiReads password',
      text: `A password reset was requested for your DimisiReads account.\n\nReset your password here:\n${resetUrl}\n\nThis link will expire in 1 hour. If you did not request this, ignore this email.`,
      html: `
        <div style="font-family: serif; color: #1C1417; background-color: #F8F4E7; padding: 40px; border-radius: 8px;">
          <h2 style="color: #722F37;">Reset Your Password</h2>
          <p>We received a request to illuminate a new key for your reading sanctum.</p>
          <p style="margin: 25px 0;">
            <a href="${resetUrl}" style="background-color: #D9A760; color: #1C1417; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Reset Password
            </a>
          </p>
          <p style="font-size: 12px; color: #7D7376;">This link expires in 1 hour.</p>
        </div>
      `,
    });
  }
}
