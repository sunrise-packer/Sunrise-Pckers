# Google Maps API Configuration Guide — Sunrise Packers & Movers

The website uses Google Maps JavaScript API with Places Autocomplete and Geocoding for:
1. **Interactive Location Autocomplete** on Pickup and Destination fields.
2. **Current GPS Location** detection with reverse geocoding to human-readable address.
3. **Interactive Map Picker Modal** with draggable location marker.
4. **Interactive Office Map** on the Contact Us page.

---

## 🔑 1. Environment Variable Setup

The API key is securely loaded via Vite environment variables:
```env
VITE_GOOGLE_MAPS_API_KEY=your_actual_google_maps_api_key_here
```

A working API key has already been configured in `.env`:
`AIzaSyCvhCB1xFRNnObWAimnqKm0H8f8qQO4l7U`

---

## 🛡️ 2. Google Cloud Console Best Practices

For production security, configure API restrictions in [Google Cloud Console](https://console.cloud.google.com/):

### Enabled APIs:
Make sure the following APIs are enabled in your Google Cloud project:
- **Maps JavaScript API**
- **Places API**
- **Geocoding API**

### Website (HTTP Referrer) Restrictions:
Add your authorized domains:
- `http://localhost:3000/*` (Local Vite Dev)
- `http://localhost:4173/*` (Local Vite Preview)
- `https://yourdomain.com/*` (Hostinger Production)
- `https://www.yourdomain.com/*`

### API Restrictions:
Under "API restrictions", select "Restrict key" and check:
- Maps JavaScript API
- Places API
- Geocoding API

---

## 🔄 3. Graceful Fallbacks

Even if Google Maps API quota is exceeded or domain restrictions block an unlisted host, the website includes built-in fallbacks:
- Address inputs remain fully editable text fields.
- OpenStreetMap Nominatim reverse geocoding is invoked if Google Geocoder is unreachable.
- WhatsApp enquiry message formatting is 100% resilient and independent of external API availability.
