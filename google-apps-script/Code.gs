/**
 * Google Apps Script - Lead Capture Webhook for Central Structure Fabrication
 * 
 * SPREADSHEET ID: UwD6HpvSCmhUbwtb-oY1RM9Ll7V
 * SHEET TAB: Leads
 * NOTIFICATION EMAIL: info.csf16@gmail.com
 */

const SPREADSHEET_ID = "UwD6HpvSCmhUbwtb-oY1RM9Ll7V";
const SHEET_NAME = "Leads";
const NOTIFICATION_EMAIL = "info.csf16@gmail.com";

/**
 * Handles incoming POST requests from the landing page form.
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  // Wait up to 30 seconds for concurrent requests to serialize cleanly
  lock.tryLock(30000);

  try {
    if (!e || (!e.postData && !e.parameter)) {
      return createJsonResponse({ success: false, error: "No payload received" }, 400);
    }

    let payload = {};
    if (e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        // In case form-urlencoded data was submitted
        payload = e.parameter || {};
      }
    } else if (e.parameter) {
      payload = e.parameter;
    }

    const rawPhone = String(payload.phone || payload.mobile || "").trim();
    const source = String(payload.source || "Landing Page").trim();

    // 1. Phone number validation & normalization
    const normalizedPhone = normalizePhoneNumber(rawPhone);
    if (!normalizedPhone) {
      return createJsonResponse({
        success: false,
        error: "Invalid phone number. Must be a 10-digit Indian mobile number."
      }, 400);
    }

    // 2. Generate formatted Indian timestamp (e.g. 04/09/2026 16:30)
    const now = new Date();
    const timestamp = Utilities.formatDate(now, "Asia/Kolkata", "dd/MM/yyyy HH:mm");

    // 3. Open spreadsheet & retrieve/create 'Leads' sheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Create headers
      sheet.appendRow(["Timestamp", "Mobile Number", "Source", "Status"]);
      // Format headers: bold and freeze row 1
      const headerRange = sheet.getRange(1, 1, 1, 4);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#F5F4EF");
      headerRange.setFontColor("#141516");
      sheet.setFrozenRows(1);
      sheet.autoResizeColumns(1, 4);
    }

    // 4. Append lead row: Timestamp | Mobile Number | Source | Status
    // Note: Prepending "'" ensures Sheets treats the 10-digit mobile number as text rather than a mathematical integer
    sheet.appendRow([timestamp, "'" + normalizedPhone, source, "New"]);

    // 5. Send email notification via MailApp
    try {
      const emailSubject = "New Lead – Solar Landing Page";
      const emailBody = 
        "New lead received from the landing page.\n\n" +
        "Mobile Number: " + normalizedPhone + "\n" +
        "Source: " + source + "\n" +
        "Date & Time: " + timestamp + "\n" +
        "Status: New\n\n" +
        "Please follow up with the customer.";

      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: emailSubject,
        body: emailBody
      });
    } catch (emailErr) {
      Logger.log("Email notification failed: " + emailErr.toString());
      // Continue execution so lead is still safely stored
    }

    // 6. Return standard success response
    return createJsonResponse({
      success: true,
      message: "Lead submitted successfully"
    }, 200);

  } catch (err) {
    Logger.log("doPost Error: " + err.toString());
    return createJsonResponse({
      success: false,
      error: "Something went wrong. Please try again."
    }, 500);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Health check endpoint for GET requests.
 */
function doGet(e) {
  return createJsonResponse({
    status: "active",
    service: "Central Structure Fabrication Lead Capture API",
    spreadsheetId: SPREADSHEET_ID,
    sheet: SHEET_NAME,
    notificationEmail: NOTIFICATION_EMAIL
  }, 200);
}

/**
 * Helper to normalize Indian mobile numbers to 10 digits.
 * Accepts:
 *  - 10-digit Indian numbers starting with 6-9
 *  - +91 / 91 / 0 prefixes
 * Returns 10-digit string or null if invalid.
 */
function normalizePhoneNumber(raw) {
  if (!raw) return null;
  var cleaned = String(raw).replace(/[\s\-()]/g, "");

  if (cleaned.indexOf("+91") === 0) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.indexOf("91") === 0 && cleaned.length === 12) {
    cleaned = cleaned.substring(2);
  } else if (cleaned.indexOf("0") === 0 && cleaned.length === 11) {
    cleaned = cleaned.substring(1);
  }

  // Must be strictly 10 digits starting with 6, 7, 8, or 9
  if (/^[6-9]\d{9}$/.test(cleaned)) {
    return cleaned;
  }
  return null;
}

/**
 * Helper to build JSON output with CORS support.
 */
function createJsonResponse(data, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
