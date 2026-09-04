# Google Apps Script Deployment Guide

This guide walks you through deploying the Google Apps Script Web App to connect your landing page form directly to Google Sheets and email notifications.

---

## Configuration Summary

- **Spreadsheet ID:** `UwD6HpvSCmhUbwtb-oY1RM9Ll7V`
- **Sheet/Tab Name:** `Leads` (created automatically if missing)
- **Notification Email:** `info.csf16@gmail.com`
- **Columns:** `Timestamp | Mobile Number | Source | Status`

---

## 3-Minute Deployment Steps

### Step 1: Open Google Apps Script
1. Go to [https://script.google.com/home](https://script.google.com/home)
2. Click **+ New Project** (top left)
3. Rename the project at the top to: **CS Fabrication - Leads API**

---

### Step 2: Paste the Code
1. Erase any code inside `Code.gs`.
2. Copy the entire contents of [`google-apps-script/Code.gs`](file:///Users/admin/Documents/Nee/Development/CS/google-apps-script/Code.gs).
3. Paste into `Code.gs` in the editor.
4. Click the **Save** icon (floppy disk) or press `Ctrl+S` / `Cmd+S`.

---

### Step 3: Deploy as Web App
1. In the top right corner, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon (**Select type**) next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description:** `Lead Capture v1`
   - **Execute as:** `Me (your Google account)`
   - **Who has access:** `Anyone` *(Crucial: allows the landing page form to submit without authentication)*
4. Click **Deploy**.
5. When prompted with **Authorization required**:
   - Click **Authorize access**.
   - Choose your Google account.
   - If Google shows *"Google hasn't verified this app"*, click **Advanced** (bottom left), then click **Go to CS Fabrication - Leads API (unsafe)**.
   - Click **Allow** to grant permissions (Spreadsheet edit + sending notification emails).

---

### Step 4: Copy the Web App URL & Paste into Project
1. Copy the generated **Web app URL** (it looks like: `https://script.google.com/macros/s/AKfycb.../exec`).
2. Open [`src/services/leadService.ts`](file:///Users/admin/Documents/Nee/Development/CS/src/services/leadService.ts).
3. Replace `"PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"` with your actual Web App URL:
   ```typescript
   export const GOOGLE_SHEET_WEBHOOK_URL =
     "https://script.google.com/macros/s/YOUR_ACTUAL_DEPLOYED_ID/exec";
   ```
4. Save the file. That's it! The form is now fully live.
