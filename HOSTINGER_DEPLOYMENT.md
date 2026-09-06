# Hostinger Deployment Guide - First Savvy

This package includes the pre-compiled **production build** (`.next`), static assets (`public`), and server entrypoint (`server.js`) ready for Hostinger deployment.

---

### Method 1: Hostinger Node.js Application (Recommended)

1. **Upload & Extract:**
   - Log in to your Hostinger **hPanel**.
   - Go to **File Manager** -> your domain root (e.g. `/home/uXXXX/domains/yourdomain.com/` or `public_html`).
   - Upload the ZIP file and **Extract** it.

2. **Configure Node.js in hPanel:**
   - In hPanel search or sidebar, click **Node.js**.
   - Set **Node.js version**: `20.x` (or `18.x+`).
   - Set **Application Root**: The directory where you extracted the files (e.g. `/` or `public_html`).
   - Set **Application Startup File**: `server.js` (or `node_modules/next/dist/bin/next` with argument `start`).
   - Click **Create / Save**.

3. **Install Dependencies:**
   - In the Node.js settings panel in hPanel, click **NPM Install** (or run `npm install --production` in Terminal/SSH).
   - *Note: Since the production `.next` build is already bundled, you do NOT need to run `npm run build` on Hostinger.*

4. **Restart & Run:**
   - Click **Restart Application** in the Node.js panel.
   - Your site will now be live!

---

### Method 2: VPS / SSH Deployment (PM2)

If you are using Hostinger VPS:
```bash
# 1. Unzip
unzip 1stsavvy-main.zip -d 1stsavvy
cd 1stsavvy

# 2. Install production dependencies
npm install --production

# 3. Start with PM2
npm install -g pm2
pm2 start server.js --name "1stsavvy"
pm2 save
pm2 startup
```
