# Google Apps Script Deployment Guide

This guide walks you through deploying the Google Apps Script Web App to connect your landing page form directly to Google Sheets and email notifications.

---

## Configuration Summary

- **Spreadsheet ID:** `UwD6HpvSCmhUbwtb-oY1RM9Ll7V`
- **Sheet/Tab Name:** `Leads` (created automatically if missing)
- **Notification Email:** `info.csf16@gmail.com`
- **Columns:** `Timestamp | Name | Mobile Number | Email | Company | Requirement | Notes | Source | Status`

---

## 3-Minute Deployment Steps

### Step 1: Open Google Apps Script
1. Go to [https://script.google.com/home](https://script.google.com/home)
2. Open your existing project: **CS Fabrication - Leads API** (or click **+ New Project**)

---

### Step 2: Paste the Code
1. Replace the code inside `Code.gs` with the latest contents of [`google-apps-script/Code.gs`](file:///Users/admin/Documents/Nee/Development/CS/google-apps-script/Code.gs).
2. Click the **Save** icon (floppy disk) or press `Ctrl+S` / `Cmd+S`.

---

### Step 3: Deploy as Web App (or Update Existing Deployment)
If updating an existing deployment:
1. Click **Deploy** (top right) > **Manage deployments**.
2. Click the pencil icon (**Edit**) next to your active deployment.
3. In the **Version** dropdown, select **New version**.
4. Click **Deploy**.

If creating a new deployment:
1. In the top right corner, click **Deploy** > **New deployment**.
2. Click the gear icon (**Select type**) > **Web app**.
3. Fill in:
   - **Description:** `Lead Capture v2 (Full Contact & RFQ Form Support)`
   - **Execute as:** `Me (your Google account)`
   - **Who has access:** `Anyone` *(Crucial: allows forms to submit without authentication)*
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
