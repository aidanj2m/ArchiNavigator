const RESEND_KEY = process.env.RESEND_KEY;

export async function sendEmailViaResend({
  to,
  subject,
  html,
  fromEmail = "onboarding@resend.dev",
  replyTo,
}: {
  to: string | string[];
  subject: string;
  html: string;
  fromEmail?: string;
  replyTo?: string;
}): Promise<{ id?: string }> {
  console.log(`[Resend] Sending email to: ${to}`);
  console.log(`[Resend] Subject: ${subject}`);

  if (!RESEND_KEY) {
    throw new Error("RESEND_KEY environment variable not set");
  }

  const emailData: Record<string, unknown> = {
    from: fromEmail,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  };

  if (replyTo) {
    emailData.reply_to = replyTo;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  });

  const responseData = await res.json();

  if (!res.ok) {
    const errorDetail = responseData.message || "Unknown error";
    console.error(`[Resend] Error: ${res.status} - ${errorDetail}`);
    throw new Error(`Failed to send email: ${errorDetail}`);
  }

  console.log(`[Resend] Email sent successfully. ID: ${responseData.id}`);
  return responseData;
}

export function getIntroCallUserTemplate(
  name: string,
  callDate: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Georgia, serif;
                line-height: 1.8;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
            }
            .content {
                padding: 20px;
            }
            .call-details {
                background-color: #f9fafb;
                padding: 20px;
                border-left: 4px solid #4F46E5;
                margin: 25px 0;
                border-radius: 4px;
            }
            .signature {
                margin-top: 30px;
            }
            .title {
                color: #6b7280;
                font-size: 0.9em;
            }
        </style>
    </head>
    <body>
        <div class="content">
            <p>Hi ${name},</p>

            <p>I'm genuinely excited that you've decided to join ArchiNavigator! Building a standout architecture portfolio can feel overwhelming, but I promise you're in the right hands.</p>

            <div class="call-details">
                <h3>Our Intro Call</h3>
                <p><strong>When:</strong> ${callDate}</p>
                <p><strong>Duration:</strong> About 30 minutes</p>
            </div>

            <p>I'll be sending you a Google Meet link for our call in the next few hours. I'm really looking forward to learning about your architecture school goals and showing you exactly how we can help you build a portfolio that stands out.</p>

            <p>Here's what we'll cover together:</p>
            <ul>
                <li>Your unique journey and aspirations in architecture</li>
                <li>The specific projects that will make your portfolio shine</li>
                <li>A realistic timeline and next steps to get you started</li>
            </ul>

            <p>If you need to reschedule or if something comes up, just reply to this email. I'm here to work around your schedule.</p>

            <p>Can't wait to meet you and get started on this journey!</p>

            <div class="signature">
                <p>Warm regards,</p>
                <p>Aidan McKenzie<br>
                <span class="title">Founder/President @ ArchiNavigator</span></p>
            </div>
        </div>
    </body>
    </html>
    `;
}

export function getQuestionsCallUserTemplate(
  name: string,
  callDate: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Georgia, serif;
                line-height: 1.8;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
            }
            .content {
                padding: 20px;
            }
            .call-details {
                background-color: #f9fafb;
                padding: 20px;
                border-left: 4px solid #4F46E5;
                margin: 25px 0;
                border-radius: 4px;
            }
            .signature {
                margin-top: 30px;
            }
            .title {
                color: #6b7280;
                font-size: 0.9em;
            }
        </style>
    </head>
    <body>
        <div class="content">
            <p>Hi ${name},</p>

            <p>Thanks so much for reaching out! I'm happy to answer any questions you have about ArchiNavigator and how we can help you achieve your architecture school dreams.</p>

            <div class="call-details">
                <h3>Our Call</h3>
                <p><strong>When:</strong> ${callDate}</p>
                <p><strong>Duration:</strong> About 30 minutes</p>
            </div>

            <p>I'll send you a Google Meet link soon so we can chat face-to-face. Come prepared with any questions on your mind - whether it's about our process, pricing, timelines, or anything else about building a killer portfolio.</p>

            <p>Here are some things we can discuss:</p>
            <ul>
                <li>How our portfolio-building process actually works</li>
                <li>Project options and pricing that fits your needs</li>
                <li>Realistic timelines and when you can get started</li>
                <li>The architecture school admissions landscape</li>
                <li>Honestly, anything you want to know!</li>
            </ul>

            <p>If something comes up and you need to reschedule, just reply to this email. No worries at all - we'll find a time that works better for you.</p>

            <p>Looking forward to our conversation!</p>

            <div class="signature">
                <p>Best,</p>
                <p>Aidan McKenzie<br>
                <span class="title">Founder/President @ ArchiNavigator</span></p>
            </div>
        </div>
    </body>
    </html>
    `;
}

export function getAdminNotificationTemplate(
  name: string,
  email: string,
  callDate: string,
  callType: string
): string {
  const callTypeLabel =
    callType === "intro" ? "New Client Onboarding" : "Questions Call";

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #10b981;
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 8px 8px 0 0;
            }
            .content {
                background-color: #f9fafb;
                padding: 30px;
                border-radius: 0 0 8px 8px;
            }
            .client-details {
                background-color: white;
                padding: 20px;
                border-left: 4px solid #10b981;
                margin: 20px 0;
            }
            .action-required {
                background-color: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 15px;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                color: #6b7280;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>${callTypeLabel}</h1>
        </div>
        <div class="content">
            <p>Hi Aidan,</p>

            <p>A new call has been scheduled on ArchiNavigator!</p>

            <div class="client-details">
                <h3>Client Information</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Call Type:</strong> ${callTypeLabel}</p>
                <p><strong>Scheduled Date & Time:</strong> ${callDate}</p>
            </div>

            <div class="action-required">
                <h3>Action Required</h3>
                <p><strong>You need to:</strong></p>
                <ol>
                    <li>Create a Google Meet link for the scheduled time</li>
                    <li>Send the Google Meet invitation to <strong>${email}</strong></li>
                    <li>If you can't make this time, email them to reschedule</li>
                </ol>
            </div>

            <p>The client has already received an automated confirmation email letting them know to expect your Google Meet invitation.</p>

            <p>Best regards,<br>
            ArchiNavigator System</p>
        </div>
        <div class="footer">
            <p>This is an automated admin notification from ArchiNavigator</p>
        </div>
    </body>
    </html>
    `;
}
