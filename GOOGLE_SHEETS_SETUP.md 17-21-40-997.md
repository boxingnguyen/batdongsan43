# Google Sheets Setup Guide

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Contact Form Submissions" (or any name)
4. Copy the **Sheet ID** from the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

## Step 2: Set Up Google Apps Script

1. In your Google Sheet, go to **Tools** → **Script editor**
2. Replace all code with the script below:

```javascript
// Google Apps Script for handling contact form submissions

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();

    // Parse the JSON payload from the request
    const data = JSON.parse(e.postData.contents);

    // Get the next row number
    const lastRow = sheet.getLastRow();
    const nextRow = lastRow + 1;

    // Add headers if first submission (row 1)
    if (lastRow === 0) {
      sheet
        .getRange(1, 1, 1, 5)
        .setValues([["Timestamp", "Name", "Email", "Phone", "Message"]]);
    }

    // Get current timestamp
    const timestamp = new Date().toLocaleString("vi-VN");

    // Insert the data into the sheet
    sheet
      .getRange(nextRow, 1, 1, 5)
      .setValues([
        [
          timestamp,
          data.name || "",
          data.email || "",
          data.phone || "",
          data.message || "",
        ],
      ]);

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Data saved successfully",
        row: nextRow,
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Error:", error);
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (give it a name like "ContactFormHandler")

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Select **Type: Web app**
3. Fill in:
   - **Execute as:** Your Google Account
   - **Who has access:** Anyone
4. Click **Deploy**
5. **Copy the deployment URL** (looks like: `https://script.google.com/macros/d/{ID}/userweb`)

## Step 4: Add to Environment Variables

1. Open `.env.local` in the project root:

```bash
GOOGLE_SCRIPT_URL=https://script.google.com/macros/d/{YOUR_DEPLOYMENT_ID}/userweb
```

2. Replace `{YOUR_DEPLOYMENT_ID}` with the actual ID from Step 3

## Step 5: Test

1. Go to `/lien-he` in your app
2. Submit the form
3. Check your Google Sheet - the data should appear automatically!

## Troubleshooting

- **"Configuration incomplete" error**: Make sure `GOOGLE_SCRIPT_URL` is set in `.env.local`
- **No data appears in sheet**: Check the Apps Script execution logs (Tools → Execution log)
- **CORS error**: Make sure deployment is set to "Anyone" has access
- **Need new URL**: You can redeploy and get a new URL anytime via Deploy → Manage deployments
