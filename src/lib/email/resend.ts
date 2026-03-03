/* eslint-disable no-console */
/**
 * Resend Email Utility
 * Handles internal notifications and client confirmation emails.
 * @see https://resend.com/docs
 */

import { Resend } from 'resend';
import { BUSINESS } from '@/lib/constants';
import { getContactWelcomeEmail } from './templates';

let _resend: Resend | null = null;

/**
 * Singleton getter for Resend client.
 * @throws Error if RESEND_API_KEY is missing.
 */
function getResend(): Resend {
  if (!_resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('[Email:Resend] Missing RESEND_API_KEY.');
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
 * @param data - The contact form details
 */
export async function sendContactNotification(data: ContactNotificationData) {
  const resend = getResend();

  try {
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
      console.error('[Email:Resend] Notification failed:', error);
      throw error;
    }

    console.info(`[Email:Resend] Notification sent for lead: ${data.email}`);
    return result;
  } catch (error) {
    console.error('[Email:Resend] Unexpected error in notification:', error);
    throw error;
  }
}

/**
 * Sends a branded confirmation email to the client.
 * @param data - Basic client details
 */
export async function sendContactConfirmation(data: {
  name: string;
  email: string;
  service?: string | null;
}) {
  const resend = getResend();

  try {
    const { error } = await resend.emails.send({
      from: `${BUSINESS.name} <office@bensonhomesolutions.com>`,
      to: [data.email],
      subject: `Inquiry Received: ${data.service || 'Benson Home Solutions'}`,
      html: getContactWelcomeEmail({
        name: data.name,
        service: data.service,
      }),
    });

    if (error) {
      console.error('[Email:Resend] Confirmation failed:', error);
      return;
    }

    console.info(`[Email:Resend] Confirmation sent to: ${data.email}`);
  } catch (error) {
    console.error('[Email:Resend] Unexpected error in confirmation:', error);
  }
}
