import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message, honeypot } = body;

    // Honeypot anti-spam check
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Transmission acknowledged." });
    }

    // Input validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please provide a valid name (min 2 characters)." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters long." }, { status: 400 });
    }

    // Log contact submission securely
    console.log(`[CONTACT TRANSMISSION] From: ${name} <${email}> | Subject: ${subject || "General Inquiry"} | Time: ${new Date().toISOString()}`);

    return NextResponse.json({
      success: true,
      message: "Transmission received. Amay Kumar will review your transmission and respond shortly.",
    });
  } catch {
    return NextResponse.json({ error: "Failed to process transmission." }, { status: 500 });
  }
}
