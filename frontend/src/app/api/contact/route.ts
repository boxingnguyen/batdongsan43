import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: "Vui lòng nhập tên" }, { status: 400 });
    }

    // Get Google Sheets Web App URL from environment variable
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL) {
      return NextResponse.json(
        {
          error:
            "Chưa cấu hình Google Sheets. Vui lòng thiết lập GOOGLE_SCRIPT_URL trong file .env.local",
        },
        { status: 500 },
      );
    }

    // Prepare data to send to Google Sheets
    const payload = {
      name: name.trim(),
      email: email ? email.trim() : "",
      phone: phone ? phone.trim() : "",
      message: message ? message.trim() : "",
    };

    // Send data to Google Apps Script Web App
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    // Try to parse as JSON, but handle text responses
    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      if (response.ok) {
        result = { success: true, message: responseText };
      } else {
        throw new Error(
          responseText || "Failed to submit data to Google Sheets",
        );
      }
    }

    // Check if the result indicates an error
    if (!response.ok || result.success === false) {
      return NextResponse.json(
        { error: result.error || "Không thể gửi dữ liệu đến Google Sheets" },
        { status: response.ok ? 400 : 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Gửi biểu mẫu thành công",
        data: result,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi nội bộ máy chủ" },
      { status: 500 },
    );
  }
}
