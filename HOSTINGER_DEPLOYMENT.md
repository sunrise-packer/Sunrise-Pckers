# Hostinger Shared Hosting Deployment Guide — Sunrise Packers & Movers

This project is built using **React + Vite** and configured specifically for smooth, zero-configuration deployment on **Hostinger Shared Web Hosting** (or any Apache-based cPanel / hPanel web host).

---

## 🚀 Quick Deployment Summary (3 Easy Steps)

1. **Build Production Files locally:**
   ```bash
   npm run build
   ```
2. **Locate the Output:**
   All production-ready files are generated inside the `dist/` directory.
3. **Upload to Hostinger:**
   Upload the contents of the `dist/` folder directly into your Hostinger `public_html` root directory.

---

## 📁 What Files Are in `dist/`?

When you run `npm run build`, Vite outputs:
- `index.html` — Main HTML file with SEO metadata and LocalBusiness schema.
- `.htaccess` — Apache rewrite rules ensuring React Router routes (e.g., `/about`, `/services/home-shifting`, `/gallery`, `/get-quote`) work on page refresh.
- `assets/` — Minified JS, CSS, and font bundles.
- `images/` — Original company logo and real on-site moving photos.
- `videos/` — Work videos.
- `robots.txt` & `sitemap.xml` — Search engine indexing files.

---

## 🛠️ Step-by-Step Instructions via Hostinger File Manager

1. Log in to your **Hostinger hPanel** ([hpanel.hostinger.com](https://hpanel.hostinger.com)).
2. Under **Websites**, click **Manage** on your domain.
3. Open **File Manager** (Files -> File Manager -> Access files of your domain).
4. Navigate inside the `public_html` directory:
   - If there is a default `default.php` or placeholder file from Hostinger, delete or move it.
5. Create a ZIP of the contents inside your local `dist/` folder (or upload them individually).
   - *Tip:* Select all files inside `dist/` (including hidden `.htaccess`), compress them to `dist.zip`, upload `dist.zip` to `public_html`, then right-click and choose **Extract**.
6. Verify that `index.html` and `.htaccess` are located directly in `/public_html/` (NOT inside a subfolder like `/public_html/dist/`).

---

## ⚙️ Apache `.htaccess` Verification

Your build includes a pre-configured `.htaccess` file:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^ index.html [L]
</IfModule>
```
This ensures that when a visitor directly types or refreshes `https://yourdomain.com/get-quote` or `https://yourdomain.com/services/bike-transportation`, Apache serves `index.html` instead of a 404 error, and React Router seamlessly renders the page.

---

## 🔒 SSL & HTTPS Setup on Hostinger

1. In hPanel, go to **Security** -> **SSL**.
2. Click **Install SSL** (Hostinger provides free Let's Encrypt SSL certificates with automatic renewal).
3. Toggle **Force HTTPS** to ON.

---

## 🗺️ Google Maps API Domain Restriction on Production

To ensure Google Maps Autocomplete and Map Picker work on your live domain:
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Select your API Key -> Edit API Key.
3. Under **Application restrictions**, choose **Websites**.
4. Add website restrictions:
   - `https://yourdomain.com/*`
   - `https://www.yourdomain.com/*`
5. Save changes.
