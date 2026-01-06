# Firebase Storage Rules Configuration

## Problem
The image upload was failing with a 500 error because the code was trying to use the filesystem (`fs/promises`), which doesn't work in Vercel's serverless environment.

## Solution
Updated the upload API to use Firebase Storage instead.

## Required: Configure Storage Rules

You need to set up Firebase Storage rules in the Firebase Console:

### Steps:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Storage** in the left sidebar
4. Click on the **Rules** tab
5. Replace the existing rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow anyone to read images
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Only allow authenticated admins to upload/delete images
    match /productos/{imageName} {
      allow write: if request.auth != null;
    }
  }
}
```

6. Click **Publish**

### Rules Explanation:

- **Read access**: Anyone can view images (needed for public product images)
- **Write access**: Only authenticated users can upload images to the `productos/` folder
- This prevents unauthorized uploads while allowing public access to product images

### Testing:

After configuring the rules, try uploading an image to a product again. It should work without errors.

### Alternative (Temporary - Less Secure):

If you want to test quickly, you can use these permissive rules (NOT recommended for production):

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Warning**: These rules allow anyone to upload/delete files. Only use for testing!
