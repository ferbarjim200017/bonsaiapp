# Image Upload Configuration

## Problem
The image upload was failing with a 500 error because the code was trying to use the filesystem (`fs/promises`), which doesn't work in Vercel's serverless environment.

## Solution
Updated the upload API to use **Vercel Blob Storage** instead, which is free up to 1GB per month.

## Vercel Blob Storage (Free Tier)

### Features:
- ✅ **Free**: 1GB storage included
- ✅ **No external accounts needed**: Uses your Vercel project
- ✅ **Automatic setup**: Vercel configures it automatically on deployment
- ✅ **Public URLs**: Direct access to uploaded images

### How it works:
1. Images are uploaded to Vercel Blob Storage via the `/api/upload` endpoint
2. Vercel returns a public URL for each image
3. URLs are stored in Firestore with the product data

### No configuration needed!
Vercel automatically creates the `BLOB_READ_WRITE_TOKEN` environment variable when you deploy. Just push your code and it will work.

### Usage limits (Free tier):
- Storage: 1GB
- Bandwidth: 100GB/month

For a small bonsai shop, this is more than enough for product images.

### Alternative: If you need more storage
If you exceed the free tier, you can:
1. Compress images before upload (recommended)
2. Use Cloudinary free tier (25GB, requires external account)
3. Upgrade Vercel plan (paid)

