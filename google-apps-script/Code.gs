/**
 * Google Apps Script - Lead Capture Webhook for Central Structure Fabrication
 * 
 * SPREADSHEET ID: UwD6HpvSCmhUbwtb-oY1RM9Ll7V
 * SHEET TAB: Leads
 * NOTIFICATION EMAIL: info.csf16@gmail.com
 */

const SPREADSHEET_ID = "1qeEeqbsvlhY-UwD6HpvSCmhUbwtb-oY1RM9Ll7V_YVs";
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
    const source = String(payload.source || "Website Contact Form").trim();
    const name = String(payload.name || "").trim();
    const company = String(payload.company || "").trim();
    const email = String(payload.email || "").trim();
    const requirement = String(payload.requirement || "").trim();
    const notes = String(payload.notes || "").trim();

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
    let ss;
    try {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (openErr) {
      Logger.log("openById failed for ID " + SPREADSHEET_ID + ": " + openErr.toString());
      try {
        ss = SpreadsheetApp.getActiveSpreadsheet();
      } catch (eActive) {}

      if (!ss) {
        ss = SpreadsheetApp.create("Central Structure Fabrication - Leads");
      }
    }
    let sheet = ss.getSheetByName(SHEET_NAME);

    const HEADERS = ["Timestamp", "Name", "Mobile Number", "Email", "Company", "Requirement", "Notes", "Source", "Status"];

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Create headers
      sheet.appendRow(HEADERS);
      // Format headers: bold, branded background and freeze row 1
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0049CA");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
      sheet.autoResizeColumns(1, HEADERS.length);
    } else {
      // Check if existing sheet has the legacy 4-column header, upgrade to full schema if so
      try {
        const lastCol = Math.max(sheet.getLastColumn(), 1);
        const firstRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
        if (firstRow.length <= 4 && String(firstRow[1]).toLowerCase().indexOf("mobile") !== -1) {
          sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
          const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
          headerRange.setFontWeight("bold");
          headerRange.setBackground("#0049CA");
          headerRange.setFontColor("#FFFFFF");
          sheet.setFrozenRows(1);
        }
      } catch (headerCheckErr) {
        Logger.log("Header check note: " + headerCheckErr.toString());
      }
    }

    // 4. Append lead row: Timestamp | Name | Mobile Number | Email | Company | Requirement | Notes | Source | Status
    // Note: Prepending "'" ensures Sheets treats the 10-digit mobile number as text rather than a mathematical integer
    sheet.appendRow([
      timestamp,
      name || "—",
      "'" + normalizedPhone,
      email || "—",
      company || "—",
      requirement || "—",
      notes || "—",
      source,
      "New"
    ]);

    // Apply clean text formatting: middle vertical alignment, text wrapping, and auto-column width
    try {
      const lastRow = sheet.getLastRow();
      const rowRange = sheet.getRange(lastRow, 1, 1, HEADERS.length);
      rowRange.setVerticalAlignment("middle");
      rowRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
      sheet.autoResizeColumns(1, HEADERS.length);
    } catch (fmtErr) {
      Logger.log("Format row note: " + fmtErr.toString());
    }

    // 5. Send email notification via MailApp (Rich Modern HTML + Plain Text Fallback)
    try {
      const emailSubject = "New Lead: " + (name ? name + " - " : "") + source;

      // Plain text fallback
      const emailBody = 
        "Central Structure Fabrication — New Website Lead\n\n" +
        "Name: " + (name || "Not provided") + "\n" +
        "Mobile Number: +91 " + normalizedPhone + "\n" +
        "Email: " + (email || "Not provided") + "\n" +
        "Company: " + (company || "Not provided") + "\n" +
        "Requirement: " + (requirement || "Not provided") + "\n" +
        (notes ? "Notes: " + notes + "\n" : "") +
        "Lead Source: " + source + "\n" +
        "Date & Time: " + timestamp + "\n" +
        "Status: New\n\n" +
        "📊 GOOGLE SHEET LINK:\n" +
        "https://docs.google.com/spreadsheets/d/" + SPREADSHEET_ID + "/edit\n\n" +
        "Please follow up with this customer promptly.";

      // Premium responsive HTML email template
      const safeName = escapeHtml(name || "Prospective Client");
      const safePhone = escapeHtml(normalizedPhone);
      const safeEmail = escapeHtml(email || "");
      const safeCompany = escapeHtml(company || "—");
      const safeReq = escapeHtml(requirement || "General Inquiry");
      const safeNotes = escapeHtml(notes || "");
      const safeSource = escapeHtml(source);
      const sheetUrl = "https://docs.google.com/spreadsheets/d/" + SPREADSHEET_ID + "/edit";

      const emailHtml = 
        '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '  <meta charset="utf-8">' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        '  <title>New Website Lead</title>' +
        '</head>' +
        '<body style="margin:0; padding:0; background-color:#F4F6F8; font-family:-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; color:#0F2130;">' +
        '  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#F4F6F8; padding:28px 12px;">' +
        '    <tr>' +
        '      <td align="center">' +
        '        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:580px; background-color:#FFFFFF; border-radius:12px; overflow:hidden; border:1px solid #E2E8F0; box-shadow:0 4px 12px rgba(0,0,0,0.06);">' +
        '          <!-- Header Banner -->' +
        '          <tr>' +
        '            <td style="background-color:#0F2130; padding:28px 32px; border-bottom:3px solid #0049CA;">' +
        '              <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
        '                <tr>' +
        '                  <td>' +
        '                    <span style="display:inline-block; font-size:10px; font-weight:700; color:#60A5FA; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:6px; background:rgba(0,73,202,0.25); padding:3px 10px; border-radius:12px;">' +
        '                      CENTRAL STRUCTURE FABRICATION' +
        '                    </span>' +
        '                    <h1 style="margin:8px 0 0 0; color:#FFFFFF; font-size:22px; font-weight:700; letter-spacing:-0.5px;">' +
        '                      New Lead Inquiry' +
        '                    </h1>' +
        '                  </td>' +
        '                  <td align="right" valign="middle">' +
        '                    <span style="display:inline-block; background-color:rgba(255,255,255,0.12); color:#E2E8F0; font-size:11px; font-weight:600; padding:5px 12px; border-radius:6px;">' +
        '                      ' + safeSource +
        '                    </span>' +
        '                  </td>' +
        '                </tr>' +
        '              </table>' +
        '            </td>' +
        '          </tr>' +
        '          <!-- Quick Action Bar (Call + Direct Google Sheet) -->' +
        '          <tr>' +
        '            <td style="background-color:#F8FAFC; padding:18px 32px; border-bottom:1px solid #E2E8F0;">' +
        '              <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
        '                <tr>' +
        '                  <td>' +
        '                    <div style="font-size:10px; font-weight:700; text-transform:uppercase; color:#647488; letter-spacing:0.8px; margin-bottom:4px;">' +
        '                      PRIMARY CONTACT' +
        '                    </div>' +
        '                    <div style="font-size:18px; font-weight:700; color:#0F2130;">' +
        '                      ' + safeName +
        '                    </div>' +
        '                  </td>' +
        '                  <td align="right" style="white-space:nowrap;">' +
        '                    <a href="tel:+91' + safePhone + '" style="display:inline-block; background-color:#0049CA; color:#FFFFFF; font-size:12px; font-weight:600; text-decoration:none; padding:8px 14px; border-radius:6px; box-shadow:0 2px 4px rgba(0,73,202,0.25); margin-right:6px;">' +
        '                      📞 Call' +
        '                    </a>' +
        '                    <a href="' + sheetUrl + '" target="_blank" style="display:inline-block; background-color:#0F9D58; color:#FFFFFF; font-size:12px; font-weight:600; text-decoration:none; padding:8px 14px; border-radius:6px; box-shadow:0 2px 4px rgba(15,157,88,0.25);">' +
        '                      📊 Sheet ↗' +
        '                    </a>' +
        '                  </td>' +
        '                </tr>' +
        '              </table>' +
        '            </td>' +
        '          </tr>' +
        '          <!-- Lead Details Table -->' +
        '          <tr>' +
        '            <td style="padding:24px 32px 28px 32px;">' +
        '              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">' +
        '                <tr>' +
        '                  <td width="36%" style="padding:11px 0; border-bottom:1px solid #F1F5F9; font-size:12px; font-weight:600; color:#647488; text-transform:uppercase; letter-spacing:0.5px;">' +
        '                    Mobile Number' +
        '                  </td>' +
        '                  <td style="padding:11px 0; border-bottom:1px solid #F1F5F9; font-size:14px; font-weight:700; color:#0F2130;">' +
        '                    <a href="tel:+91' + safePhone + '" style="color:#0049CA; text-decoration:none;">' +
        '                      +91 ' + safePhone +
        '                    </a>' +
        '                  </td>' +
        '                </tr>' +
        '                <tr>' +
        '                  <td style="padding:11px 0; border-bottom:1px solid #F1F5F9; font-size:12px; font-weight:600; color:#647488; text-transform:uppercase; letter-spacing:0.5px;">' +
        '                    Email Address' +
        '                  </td>' +
        '                  <td style="padding:11px 0; border-bottom:1px solid #F1F5F9; font-size:14px; font-weight:600; color:#0F2130;">' +
        '                    ' + (safeEmail ? '<a href="mailto:' + safeEmail + '" style="color:#0049CA; text-decoration:none;">' + safeEmail + '</a>' : '<span style="color:#94A3B8;">Not provided</span>') +
        '                  </td>' +
        '                </tr>' +
        '                <tr>' +
        '                  <td style="padding:11px 0; border-bottom:1px solid #F1F5F9; font-size:12px; font-weight:600; color:#647488; text-transform:uppercase; letter-spacing:0.5px;">' +
        '                    Company / Org' +
        '                  </td>' +
        '                  <td style="padding:11px 0; border-bottom:1px solid #F1F5F9; font-size:14px; font-weight:600; color:#0F2130;">' +
        '                    ' + safeCompany +
        '                  </td>' +
        '                </tr>' +
        '                <tr>' +
        '                  <td style="padding:11px 0; border-bottom:1px solid #F1F5F9; font-size:12px; font-weight:600; color:#647488; text-transform:uppercase; letter-spacing:0.5px;">' +
        '                    Requirement' +
        '                  </td>' +
        '                  <td style="padding:11px 0; border-bottom:1px solid #F1F5F9; font-size:14px; font-weight:600; color:#0F2130;">' +
        '                    <span style="display:inline-block; background-color:#EFF6FF; color:#0049CA; border:1px solid #DBEAFE; font-size:12px; font-weight:600; padding:3px 10px; border-radius:4px;">' +
        '                      ' + safeReq +
        '                    </span>' +
        '                  </td>' +
        '                </tr>' +
        '                <tr>' +
        '                  <td style="padding:11px 0; border-bottom:1px solid #F1F5F9; font-size:12px; font-weight:600; color:#647488; text-transform:uppercase; letter-spacing:0.5px;">' +
        '                    Google Sheet' +
        '                  </td>' +
        '                  <td style="padding:11px 0; border-bottom:1px solid #F1F5F9; font-size:13px; font-weight:600;">' +
        '                    <a href="' + sheetUrl + '" target="_blank" style="color:#0F9D58; text-decoration:none; font-weight:700;">' +
        '                      📊 View Leads Spreadsheet ↗' +
        '                    </a>' +
        '                  </td>' +
        '                </tr>' +
        '                <tr>' +
        '                  <td style="padding:11px 0; border-bottom:1px solid #F1F5F9; font-size:12px; font-weight:600; color:#647488; text-transform:uppercase; letter-spacing:0.5px;">' +
        '                    Received At' +
        '                  </td>' +
        '                  <td style="padding:11px 0; border-bottom:1px solid #F1F5F9; font-size:13px; color:#475569;">' +
        '                    ' + timestamp + ' IST' +
        '                  </td>' +
        '                </tr>' +
        '              </table>' +
        (safeNotes ? 
        '              <div style="margin-top:22px;">' +
        '                <div style="font-size:10px; font-weight:700; text-transform:uppercase; color:#647488; letter-spacing:0.8px; margin-bottom:8px;">' +
        '                  PROJECT SPECIFICATIONS / MESSAGE' +
        '                </div>' +
        '                <div style="background-color:#F8FAFC; border-left:4px solid #0049CA; border-top:1px solid #E2E8F0; border-right:1px solid #E2E8F0; border-bottom:1px solid #E2E8F0; padding:14px 18px; border-radius:6px; font-size:13px; color:#1E293B; line-height:1.6; white-space:pre-wrap;">' +
        '                  ' + safeNotes +
        '                </div>' +
        '              </div>' : '') +
        '              <!-- Bottom Action Button -->' +
        '              <div style="margin-top:28px; padding-top:22px; border-top:1px solid #E2E8F0; text-align:center;">' +
        '                <a href="' + sheetUrl + '" target="_blank" style="display:inline-block; background-color:#0F9D58; color:#FFFFFF; font-size:14px; font-weight:700; text-decoration:none; padding:12px 28px; border-radius:8px; box-shadow:0 2px 6px rgba(15,157,88,0.3);">' +
        '                  📊 Open Leads Google Sheet ↗' +
        '                </a>' +
        '              </div>' +
        '            </td>' +
        '          </tr>' +
        '          <!-- Footer -->' +
        '          <tr>' +
        '            <td style="background-color:#F8FAFC; padding:18px 32px; border-top:1px solid #E2E8F0; text-align:center;">' +
        '              <p style="margin:0; font-size:11px; color:#94A3B8; line-height:1.5;">' +
        '                Central Structure Fabrication (CSF) · Amroha, Uttar Pradesh, India<br>' +
        '                Automated notification from website lead intake engine.' +
        '              </p>' +
        '            </td>' +
        '          </tr>' +
        '        </table>' +
        '      </td>' +
        '    </tr>' +
        '  </table>' +
        '</body>' +
        '</html>';

      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: emailSubject,
        body: emailBody,
        htmlBody: emailHtml
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

/**
 * Helper to escape HTML characters for safe rich email rendering.
 */
function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
