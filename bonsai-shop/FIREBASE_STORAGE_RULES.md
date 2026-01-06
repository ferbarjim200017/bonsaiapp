# Image Upload Configuration

## Problem
The image upload was failing with a 500 error because external storage services require additional configuration and costs.

## Solution
Images are now converted to **base64** and stored directly in Firestore. This is:
- ✅ **Completely free**: No external storage needed
- ✅ **No configuration**: Works immediately
- ✅ **Simple**: One less service to manage

## How it works:
1. Images are uploaded through the form
2. Converted to base64 format (data URLs)
3. Stored directly in Firestore with the product data
4. Displayed using the data URL in `<img src="data:image/jpeg;base64,..."/>`

## Limitations:
- **Max file size**: 500KB per image
- **Recommendation**: Compress images before uploading
  - Use https://tinypng.com/ or https://squoosh.app/
  - Optimal size: 100-300KB per image
  - This keeps the page fast and saves Firestore space

## Why base64?
- **Firestore limit**: 1MB per document
- A product with 3 images at 300KB each = 900KB ✅
- No need for external storage services
- Simpler architecture
- Free and unlimited

## If you need larger images:
For products that need high-resolution images (>500KB), consider:
1. Compress images first (recommended)
2. Use Cloudinary free tier (25GB, requires account)
3. Use ImgBB free tier (unlimited, with API key)

