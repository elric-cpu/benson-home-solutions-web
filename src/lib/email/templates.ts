import { BUSINESS } from '../constants';

export const EMAIL_STYLES = `
  body { font-family: 'Source Sans 3', Arial, sans-serif; line-height: 1.6; color: #2D2D2D; background-color: #FFFDF9; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
  .header { text-align: center; margin-bottom: 40px; }
  .logo { color: #4C0C14; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-decoration: none; }
  .card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; margin-bottom: 30px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
  .title { color: #4C0C14; font-size: 28px; font-weight: 800; margin-bottom: 16px; line-height: 1.2; }
  .badge { display: inline-block; padding: 4px 12px; background: #4C0C14; color: #FFFDF9; border-radius: 100px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 20px; }
  .button { display: inline-block; background: #4C0C14; color: #FFFDF9; padding: 16px 32px; border-radius: 8px; font-weight: 700; text-decoration: none; margin-top: 20px; }
  .footer { text-align: center; font-size: 12px; color: #94a3b8; margin-top: 40px; }
  .data-grid { border-top: 1px solid #f1f5f9; margin-top: 20px; padding-top: 20px; }
  .data-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
  .data-label { color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 11px; }
  .data-value { font-weight: 700; color: #2D2D2D; }
`;

export function getCalculatorReportEmail(data: {
  name?: string;
  address: string;
  annualTotal: number;
  monthlyTotal: number;
  isServiceArea: boolean;
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head><style>${EMAIL_STYLES}</style></head>
      <body>
        <div class="container">
          <div class="header">
            <a href="${BUSINESS.url}" class="logo">BENSON.</a>
          </div>
          <div class="card">
            <div class="badge">Property Report Ready</div>
            <h1 class="title">The True Cost of Your Home</h1>
            <p>We've analyzed the data for <strong>${data.address}</strong>.</p>
            
            <div class="data-grid">
              <div class="data-row">
                <span class="data-label">Annual Hidden Cost</span>
                <span class="data-value">$${data.annualTotal.toLocaleString()}</span>
              </div>
              <div class="data-row">
                <span class="data-label">Monthly Equivalent</span>
                <span class="data-value">$${data.monthlyTotal.toLocaleString()}</span>
              </div>
            </div>

            <p style="margin-top: 30px;">This estimate includes property taxes, insurance, maintenance reserves, and energy consumption specific to your location.</p>
            
            ${
              data.isServiceArea
                ? `
                <div style="background: #fdf2f2; border: 1px solid #fee2e2; padding: 20px; border-radius: 12px; margin-top: 30px;">
                  <h3 style="color: #991b1b; margin-top: 0;">Benson Service Area Match</h3>
                  <p style="color: #b91c1c; font-size: 14px;">Great news: This property is within our direct service area. You qualify for a <strong>Free Maintenance Assessment</strong> ($250 value).</p>
                  <a href="${BUSINESS.url}/contact" class="button">Claim Your Free Assessment</a>
                </div>
              `
                : `
                <p style="font-size: 14px; color: #64748b;">We don't currently offer direct service in your area, but you can use this report to negotiate better rates with local vendors.</p>
              `
            }
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${BUSINESS.name} | Oregon CCB #258533</p>
            <p>541-321-5115 | office@bensonhomesolutions.com</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function getContactWelcomeEmail(data: {
  name: string;
  service?: string | null;
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head><style>${EMAIL_STYLES}</style></head>
      <body>
        <div class="container">
          <div class="header">
            <a href="${BUSINESS.url}" class="logo">BENSON.</a>
          </div>
          <div class="card">
            <div class="badge">Inquiry Received</div>
            <h1 class="title">Thanks for reaching out, ${data.name.split(' ')[0]}!</h1>
            <p>We've received your request regarding <strong>${data.service || 'our services'}</strong>. Our team is reviewing the details now.</p>
            
            <p style="margin-top: 20px;">You can expect a direct response from Elric or our operations manager within <strong>one business day</strong>.</p>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; margin-top: 30px;">
              <h3 style="color: #2D2D2D; margin-top: 0; font-size: 16px;">While You Wait...</h3>
              <p style="color: #4A4A4A; font-size: 14px;">Have you checked the hidden costs of your property? Use our free tool to see your true annual homeownership expenses.</p>
              <a href="${BUSINESS.url}/tools/cost-calculator" style="color: #4C0C14; font-weight: 700; text-decoration: none; font-size: 14px;">Calculate Your True Home Cost &rarr;</a>
            </div>

            <div style="margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
              <p style="font-size: 13px; color: #64748b; margin-bottom: 5px;"><strong>Urgent?</strong> Call our 24/7 line at 541-413-0480.</p>
              <p style="font-size: 13px; color: #64748b;"><strong>Licensed:</strong> Oregon CCB #258533</p>
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${BUSINESS.name} | Albany, OR</p>
            <p>bensonhomesolutions.com</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
