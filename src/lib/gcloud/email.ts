import { google } from 'googleapis';
import { getGoogleAuth } from './auth';

/**
 * Benson Home Solutions - Gcloud Email Dispatcher
 * Uses the Gmail API to notify Elric of new leads.
 * Note: Requires domain-wide delegation or service account Gmail enablement.
 */
export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  service?: string;
  message: string;
  attachment?: {
    name: string;
    type?: string;
    data: string;
  };
}) {
  // googleapis and google-auth-library expose incompatible private-field types here,
  // but the runtime object is a valid GoogleAuth instance for Gmail requests.
  const gmail = google.gmail({ version: 'v1', auth: getGoogleAuth() as never });

  const subject = `[NEW LEAD] ${lead.service || 'General Inquiry'} - ${lead.name}`;
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=
`;

  const boundary = `benson-boundary-${Date.now()}`;
  const chunkString = (value: string, size: number) => {
    const chunks: string[] = [];
    for (let i = 0; i < value.length; i += size) {
      chunks.push(value.slice(i, i + size));
    }
    return chunks.join('\n');
  };
  const attachment = lead.attachment && lead.attachment.data && lead.attachment.name ? lead.attachment : undefined;
  const attachmentNote = attachment?.name ? `<p><strong>Attachment:</strong> ${attachment.name}</p>` : '';
  const htmlParts = [
    `<h2>New Website Lead</h2>`,
    `<p><strong>Name:</strong> ${lead.name}</p>`,
    `<p><strong>Email:</strong> ${lead.email}</p>`,
    `<p><strong>Phone:</strong> ${lead.phone || 'Not provided'}</p>`,
    `<p><strong>Address:</strong> ${lead.address || 'Not provided'}</p>`,
    `<p><strong>Service:</strong> ${lead.service || 'Not specified'}</p>`,
    `<p><strong>Message:</strong><br/>${lead.message.replace(/\n/g, '<br/>')}</p>`,
    attachmentNote,
    `<hr/>`,
    `<p><small>This lead was captured via the website contact flow and validated via Gcloud.</small></p>`,
  ].filter(Boolean);
  const messageParts = [
    'From: Benson Home Solutions <office@bensonhomesolutions.com>',
    'To: office@bensonhomesolutions.com',
    `Subject: ${utf8Subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=utf-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    htmlParts.join('\n'),
  ];
  if (attachment) {
    messageParts.push(
      `--${boundary}`,
      `Content-Type: ${attachment.type || 'application/octet-stream'}; name="${attachment.name}"`,
      `Content-Disposition: attachment; filename="${attachment.name}"`,
      'Content-Transfer-Encoding: base64',
      '',
      chunkString(attachment.data, 76)
    );
  }
  messageParts.push(`--${boundary}--`);

  const message = messageParts.join('\n');
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  try {
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
    return true;
  } catch (error) {
    console.error('[Gcloud Email Error]', error);
    return false;
  }
}
