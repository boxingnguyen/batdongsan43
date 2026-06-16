import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields (only name and phone are required)
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // Get Google Sheets Web App URL from environment variable
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL) {
      console.error('GOOGLE_SCRIPT_URL is not set in environment variables');
      return NextResponse.json(
        { 
          error: 'Google Sheets integration not configured. Please set GOOGLE_SCRIPT_URL in your .env.local file. See GOOGLE_SHEETS_SETUP.md for instructions.' 
        },
        { status: 500 }
      );
    }

    // Get the next index (row number) - we'll calculate this by getting existing rows
    // For now, we'll let Google Apps Script handle the index calculation
    
    // Prepare data to send to Google Sheets
    // Email and message are optional, use empty string if not provided
    const payload = {
      name: name.trim(),
      email: email ? email.trim() : '',
      phone: phone.trim(),
      message: message ? message.trim() : '',
    };

    // Send data to Google Apps Script Web App
    console.log('Sending data to Google Sheets:', { url: GOOGLE_SCRIPT_URL, payload });
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log('Google Sheets response:', { status: response.status, statusText: response.statusText, body: responseText });
    
    // Try to parse as JSON, but handle text responses
    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      // If not JSON, treat as success if status is ok
      if (response.ok) {
        result = { success: true, message: responseText };
      } else {
        console.error('Failed to parse response as JSON:', responseText);
        throw new Error(responseText || 'Failed to submit data to Google Sheets');
      }
    }

    // Check if the result indicates an error
    if (!response.ok || (result.success === false)) {
      console.error('Google Sheets API error:', { 
        status: response.status, 
        statusText: response.statusText,
        result 
      });
      return NextResponse.json(
        { error: result.error || 'Failed to submit data to Google Sheets' },
        { status: response.ok ? 400 : 500 }
      );
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully',
        data: result 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

