# Google Maps API Configuration & Setup Guide — Sunrise Packers & Movers

This document outlines the Google Maps and Places Autocomplete configuration for Sunrise Packers & Movers (`https://www.sunrisepackersmovers.in/`).

---

## 🔑 1. Current API Key & Environment Configuration

The production Google Maps API key configured in `.env` is:
```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyCvhCB1xFRNnObWAimnqKm0H8f8qQO4l7U
```

---

## 🛡️ 2. Required Google Cloud Console Configuration

To ensure Google Maps JavaScript API, Places Autocomplete, and Geocoding function seamlessly without `UrlAuthenticationCommonError` or `RefererNotAllowedMapError`, apply the following configuration in [Google Cloud Console](https://console.cloud.google.com/):

### Step 1: Enable Required APIs
Go to **Google Cloud Console > APIs & Services > Library**, search and click **Enable** for each of these:
1. **Maps JavaScript API**
2. **Places API**
3. **Places API (New)**
4. **Geocoding API**

> **Important:** Both **Places API** and **Places API (New)** should be enabled to guarantee backwards and forwards compatibility across all modern web browsers.

### Step 2: Configure Website (HTTP Referrer) Restrictions
Go to **APIs & Services > Credentials**, select the API key (`AIzaSyCvhCB1xFRNnObWAimnqKm0H8f8qQO4l7U`), and under **Application restrictions**, choose **Websites (HTTP referrers)**.

Add the following exact referrer URLs:
```text
https://sunrisepackersmovers.in/*
https://www.sunrisepackersmovers.in/*
http://localhost:*/*
http://127.0.0.1:*/*
```

> **Note on wildcards:** Google Cloud requires the trailing `/*` to match all paths, query strings, and subpages on the domain.

### Step 3: Configure API Restrictions
Under **API restrictions**:
* Select **Restrict key**.
* Check the following APIs:
  - Maps JavaScript API
  - Places API
  - Places API (New)
  - Geocoding API
* Click **Save**.

### Step 4: Ensure Billing Account is Linked
Google Maps Platform requires an active Google Cloud Billing Account linked to the project. Google provides a **$200 monthly free tier credit** (approximately 28,000 autocomplete requests / month for free).
* Verify at: **Google Cloud Console > Billing**.

---

## 🚀 3. Multi-Engine Fail-Safe Architecture

The website features an enterprise-grade multi-engine location search module (`src/services/locationService.js` and `src/components/LocationAutocomplete.jsx`):
1. **Google Places Autocomplete (Primary):**
   * Uses `google.maps.places.AutocompleteService` directly via JavaScript SDK.
   * Restricts suggestions strictly to India (`componentRestrictions: { country: 'in' }`).
2. **Real-time India Address Search (Fail-safe):**
   * If Google Maps API is blocked, quota exceeded, or restricted on unlisted development URLs, the system automatically and silently queries real-time Indian address services (Photon/OSM).
   * Fully supports societies, buildings, apartments, villages, colonies, landmarks, and PIN codes across India.
3. **Curated Navi Mumbai / Maharashtra Nodes:**
   * Instant zero-latency suggestions for all sectors of Kamothe, Kharghar, Panvel, Ulwe, Taloja, Vashi, Nerul, Belapur, Thane, Mumbai, and Pune.
4. **Current Location (GPS):**
   * Reverse geocodes the user's real coordinates into a clean street/locality/city/PIN address using Google Geocoder or OpenStreetMap reverse geocoding.
5. **Always 100% Editable:**
   * Customers can freely type, paste, backspace, or edit any address manually. Forms and WhatsApp messages will never be blocked by external API outages.
