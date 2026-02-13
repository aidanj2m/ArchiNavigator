import { NextResponse } from "next/server";
import { supabaseRequest } from "../services/supabase";
import {
  sendEmailViaResend,
  getIntroCallUserTemplate,
  getQuestionsCallUserTemplate,
  getAdminNotificationTemplate,
} from "../services/resend";

export async function createCallBooking(request: Request) {
  try {
    const body = await request.json();
    const { name, email, call_date, call_type = "questions" } = body;

    if (!name || !email || !call_date) {
      return NextResponse.json(
        { detail: "Name, email, and call_date are required" },
        { status: 400 }
      );
    }

    if (call_type !== "intro" && call_type !== "questions") {
      return NextResponse.json(
        { detail: 'call_type must be "intro" or "questions"' },
        { status: 400 }
      );
    }

    console.log(
      `[Calls] Creating ${call_type} call booking for: ${email} at ${call_date}`
    );

    const callDate = new Date(call_date);
    if (callDate <= new Date()) {
      return NextResponse.json(
        { detail: "Call date must be in the future" },
        { status: 400 }
      );
    }

    const bookingData = {
      name,
      email,
      call_date: callDate.toISOString(),
      call_type,
    };

    const result = await supabaseRequest("POST", "signups", bookingData);

    if (!result || result.length === 0) {
      return NextResponse.json(
        { detail: "Failed to create call booking" },
        { status: 500 }
      );
    }

    const createdBooking = result[0];
    console.log(
      `[Calls] Successfully created ${call_type} call booking with ID: ${createdBooking.id}`
    );

    const callDateFormatted = callDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });

    // Send confirmation email to user
    try {
      let userEmailHtml: string;
      let userSubject: string;

      if (call_type === "intro") {
        userEmailHtml = getIntroCallUserTemplate(name, callDateFormatted);
        userSubject = "Welcome to ArchiNavigator - Intro Call Scheduled";
      } else {
        userEmailHtml = getQuestionsCallUserTemplate(name, callDateFormatted);
        userSubject = "Call Scheduled - We're Ready to Help!";
      }

      await sendEmailViaResend({
        to: email,
        subject: userSubject,
        html: userEmailHtml,
        fromEmail: "amckenzie@archinavigator.com",
      });
      console.log(`[Calls] User confirmation email sent to ${email}`);
    } catch (emailError) {
      console.error(`[Calls] Failed to send user email: ${emailError}`);
    }

    // Send notification email to admin
    try {
      const adminEmailHtml = getAdminNotificationTemplate(
        name,
        email,
        callDateFormatted,
        call_type
      );
      const adminSubject = `New ${call_type === "intro" ? "Intro" : "Questions"} Call Scheduled - ${name}`;

      await sendEmailViaResend({
        to: "amckenzie@archinavigator.com",
        subject: adminSubject,
        html: adminEmailHtml,
        fromEmail: "notifications@archinavigator.com",
      });
      console.log(
        "[Calls] Admin notification email sent to amckenzie@archinavigator.com"
      );
    } catch (emailError) {
      console.error(`[Calls] Failed to send admin notification: ${emailError}`);
    }

    const message =
      call_type === "intro"
        ? "Intro call scheduled! Check your email for confirmation."
        : "Call booking successful! We'll be in touch soon to confirm the details.";

    return NextResponse.json({
      id: createdBooking.id,
      name: createdBooking.name,
      email: createdBooking.email,
      call_date: createdBooking.call_date,
      call_type: createdBooking.call_type,
      created_at: createdBooking.created_at,
      message,
    });
  } catch (error) {
    console.error(`[Calls] Error creating call booking: ${error}`);
    return NextResponse.json(
      { detail: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
