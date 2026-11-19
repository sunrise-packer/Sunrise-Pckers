# Sunrise Packers & Movers — Premium Professional Business Website

Official, full-featured multi-page business website for **Sunrise Packers & Movers**, designed and engineered to the highest industry standards.

---

## 🏢 Company Profile

- **Company Name:** Sunrise Packers & Movers
- **Tagline:** *Your Belongings..... Our Responsibility*
- **Owner & Founder:** Praveen Kumar Saket
- **Direct Phone:** 8517952427 (+91 8517952427)
- **WhatsApp:** +91 8517952427
- **Email:** sunr21963@gmail.com
- **Service Coverage:** All India
- **Office Address:** Juhi Gaon Hanuman Mandir Kamautha Top Number 2, Near Mansarovar Station, New Mumbai, Maharashtra 410206.

---

## 🎨 Brand Design System

- **Primary Royal Purple:** `#38245C` (Brand Identity & Core Surfaces)
- **Silver:** `#C7C9D3` (Borders, Separators, Decorative Accents)
- **White:** `#FFFFFF` (Primary Content Background)
- **Light Surface Background:** `#F7F7FA` (Section Alternation)
- **Dark Text:** `#24212D` (High-Contrast Readability)
- **Typography:** Outfit (Headings) + Plus Jakarta Sans (Body)
- **Framework:** Bootstrap 5 Responsive Grid + Lucide React Icons (No Tailwind CSS)

---

## 🧭 Multi-Page Routes & Features

1. **Home (`/`):**
   - Hero banner with container moving carrier visual, quick CTA buttons (Get Quote, Call Now, WhatsApp).
   - 4 Trust Highlight feature cards.
   - Comprehensive 12-services overview with direct links.
   - About Sunrise section introducing Praveen Kumar Saket.
   - 5-step interactive process timeline.
   - Real ground photo & video gallery preview.
   - Customer satisfaction commitment & transparent service pledge.
   - Interactive FAQ accordion.
   - Final conversion CTA & comprehensive footer.

2. **About Us (`/about`):**
   - Detailed company background, mission, vision, and core values.
   - Owner introduction and personal guarantee.
   - Real on-site packing proof-of-work collage.

3. **Our Services (`/services`):**
   - Listing of all 12 specialized services with interactive search/filtering.
   - Quality packaging standards guarantee.

4. **Individual Service Details (`/services/:slug`):**
   - Dynamic service detail pages for all 12 services:
     1. `home-shifting`
     2. `office-shifting`
     3. `shop-shifting`
     4. `car-transportation`
     5. `bike-transportation`
     6. `packing-moving`
     7. `local-shifting`
     8. `domestic-shifting`
     9. `storage-warehousing`
     10. `loading-unloading`
     11. `unpacking-service`
     12. `commercial-goods-transportation`
   - Detailed specifications, benefits, custom 4-step workflow, and service-specific FAQs.

5. **Gallery — Photos & Videos Together (`/gallery`):**
   - Single unified gallery page (no separate video page).
   - Media type tabs: **All**, **Photos**, **Videos**.
   - Category filters: **Packing**, **Loading**, **Transportation**, **Home Shifting**, **Office Shifting**, **Delivery**.
   - Responsive grid, lightbox photo zoom, and video player with full controls & fullscreen.

6. **Get Free Quote (`/get-quote`):**
   - Premium multi-section moving enquiry calculator.
   - Clickable multi-service selection icon cards.
   - Google Places Autocomplete on Pickup & Destination.
   - One-click current GPS location finder with reverse geocoding.
   - Interactive Google Map Picker modal with draggable pin.
   - Property size selector chips (1 RK to 4 BHK+ / Villa), floors, and lift status.
   - Review confirmation modal before WhatsApp opening.
   - Formats complete enquiry details into WhatsApp message to `+91 8517952427`.

7. **Contact Us (`/contact`):**
   - Office address, direct call, WhatsApp quick links.
   - Interactive Google Map centered on office location near Mansarovar Station, New Mumbai.
   - Quick inquiry form.

8. **Privacy Policy (`/privacy-policy`):**
   - Transparent corporate privacy terms, data handling, and no-spam guarantee.

---

## 💻 Tech Stack

- **React 18**
- **Vite 5**
- **Bootstrap 5** & **Bootstrap Icons**
- **Lucide React**
- **React Router DOM 6**
- **Google Maps JavaScript API** (Places Autocomplete + Geocoding)

---

## ⚡ Local Development

```bash
# Navigate to project directory
cd sunrise-packers-movers

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📦 Production Build for Hostinger

```bash
# Build static production assets
npm run build
```
Output files will be generated in `dist/`, including `.htaccess`, ready to be uploaded to Hostinger's `public_html`.
See [HOSTINGER_DEPLOYMENT.md](file:///Users/anupriyanshu/.gemini/antigravity/scratch/sunrise-packers-movers/HOSTINGER_DEPLOYMENT.md) for full instructions.
