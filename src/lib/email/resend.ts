import { Resend } from 'resend';
import { BUSINESS } from '@/lib/constants';

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not set.');
    }
    _resend = new Resend(apiKey);
  }
  return _resend;
}

interface ContactNotificationData {
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
  submittedAt: string;
}

/**
 * Sends an internal notification to the office when a contact form is submitted.
 */
export async function sendContactNotification(data: ContactNotificationData) {
  const resend = getResend();

  const { data: result, error } = await resend.emails.send({
    from: `${BUSINESS.name} Website <noreply@bensonhomesolutions.com>`,
    to: [BUSINESS.email],
    subject: `New Contact Form: ${data.name} — ${data.service || 'General Inquiry'}`,
    html: `
      <div style="font-family: 'Source Sans 3', Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #4C0C14; margin-bottom: 4px;">New Website Lead</h2>
        <p style="color: #4A4A4A; margin-top: 0;">Submitted ${data.submittedAt}</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #2D2D2D; width: 100px;">Name</td>
            <td style="padding: 8px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #2D2D2D;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          ${data.phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #2D2D2D;">Phone</td><td style="padding: 8px 0;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>` : ''}
          ${data.service ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #2D2D2D;">Service</td><td style="padding: 8px 0;">${data.service}</td></tr>` : ''}
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #FFFDF9; border-left: 4px solid #4C0C14;">
          <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #4A4A4A;">
          This is an automated notification from bensonhomesolutions.com
        </p>
      </div>
    `,
  });

  if (error) {
    console.error('[Resend] Failed to send contact notification:', error);
    throw error;
  }

  return result;
}

/**
 * Sends a confirmation email to the person who submitted the contact form.
 */
export async function sendContactConfirmation(data: {
  name: string;
  email: string;
}) {
  const resend = getResend();

  const { error } = await resend.emails.send({
    from: `${BUSINESS.name} <noreply@bensonhomesolutions.com>`,
    to: [data.email],
    subject: `We received your message — ${BUSINESS.name}`,
    html: `
      <div style="font-family: 'Source Sans 3', Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #4C0C14;">Thanks for reaching out, ${data.name}!</h2>
        <p>We received your message and will get back to you within <strong>one business day</strong>.</p>
        <p>If this is urgent, call us directly:</p>
        <ul>
          <li><strong>Main:</strong> <a href="tel:${BUSINESS.phone}">${BUSINESS.phone}</a></li>
          <li><strong>After hours:</strong> <a href="tel:${BUSINESS.afterhoursPhone}">${BUSINESS.afterhoursPhone}</a></li>
        </ul>
        <p style="margin-top: 24px;">— The ${BUSINESS.name} Team</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="font-size: 12px; color: #4A4A4A;">
          ${BUSINESS.name} · Oregon ${BUSINESS.license}<br/>
          <a href="${BUSINESS.url}">${BUSINESS.url}</a>
        </p>
      </div>
    `,
  });

  if (error) {
    console.error('[Resend] Failed to send confirmation email:', error);
    // Don't throw — confirmation is non-critical
  }
}
