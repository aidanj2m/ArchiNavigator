import { NextResponse } from "next/server";
import { sendEmailViaResend } from "../services/resend";

export async function sendEmail(request: Request) {
  try {
    const body = await request.json();
    const {
      to,
      subject,
      html,
      from_email = "placeholder@archinavigator.com",
      reply_to,
    } = body;

    if (!to || !subject || !html) {
      return NextResponse.json(
        { detail: "to, subject, and html are required" },
        { status: 400 }
      );
    }

    console.log(`[Email Endpoint] Sending email to: ${to}`);
    console.log(`[Email Endpoint] Subject: ${subject}`);

    const result = await sendEmailViaResend({
      to,
      subject,
      html,
      fromEmail: from_email,
      replyTo: reply_to,
    });

    const emailId = result.id;
    console.log(`[Email Endpoint] Email sent successfully. ID: ${emailId}`);

    return NextResponse.json({
      success: true,
      email_id: emailId,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error(`[Email Endpoint] Error sending email: ${error}`);
    const message =
      error instanceof Error ? error.message : "Failed to send email";
    return NextResponse.json(
      { success: false, email_id: null, message },
      { status: 500 }
    );
  }
}

export async function testEmail() {
  try {
    console.log("[Email Endpoint] Sending test email");

    const testHtml = `
      <h1>Test Email from ArchiNavigator</h1>
      <p>This is a test email to verify the Resend integration is working correctly.</p>
      <p>If you're seeing this, the email service is configured properly!</p>
    `;

    const result = await sendEmailViaResend({
      to: "test@example.com",
      subject: "Test Email - ArchiNavigator",
      html: testHtml,
      fromEmail: "placeholder@archinavigator.com",
    });

    return NextResponse.json({
      success: true,
      email_id: result.id,
      message: "Test email sent successfully",
    });
  } catch (error) {
    console.error(`[Email Endpoint] Test email failed: ${error}`);
    const message =
      error instanceof Error ? error.message : "Test email failed";
    return NextResponse.json(
      { success: false, email_id: null, message },
      { status: 500 }
    );
  }
}
