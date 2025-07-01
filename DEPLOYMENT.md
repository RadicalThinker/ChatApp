# ChatApp Deployment Guide

## Render Deployment Instructions

### 1. Pre-deployment Setup

1. Make sure your environment variables are set in Render:
   - `NODE_ENV=production`
   - `PORT=10000` (or whatever port Render assigns)
   - `MONGODB_URI=your_mongodb_connection_string`
   - `JWT_SECRET=your_jwt_secret`
   - `CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name`
   - `CLOUDINARY_API_KEY=your_cloudinary_api_key`
   - `CLOUDINARY_API_SECRET=your_cloudinary_api_secret`
   - `FRONTEND_URL=https://your-app-name.onrender.com` (optional)

### 2. Render Service Configuration

**Build Command:**
```
npm run build
```

**Start Command:**
```
npm start
```

**Root Directory:**
```
.
```

### 3. Manual Build Test (Local)

To test the build process locally:

**On Windows (PowerShell):**
```powershell
.\build.ps1
```

**On Linux/Mac:**
```bash
chmod +x build.sh
./build.sh
```

### 4. Troubleshooting

If you get the error `ENOENT: no such file or directory, stat '/opt/render/project/frontend/dist/index.html'`:

1. **Check Build Logs:** Make sure the frontend build command completed successfully
2. **Verify Build Output:** Ensure `frontend/dist/index.html` exists after build
3. **Check Paths:** Verify the backend is looking in the correct directory for static files
4. **Environment Variables:** Make sure `NODE_ENV=production` is set

### 🚨 Fixing ENOENT Error: Frontend Build Not Found

If you're getting the error `ENOENT: no such file or directory, stat '/opt/render/project/frontend/dist/index.html'`, follow these steps:

#### Step 1: Verify Build Command
In your Render dashboard, ensure your **Build Command** is:
```
npm run build
```

#### Step 2: Check Build Logs
1. Go to your Render service dashboard
2. Click on "Logs" 
3. Look for the build process output
4. Ensure you see messages like:
   - "Installing backend dependencies..."
   - "Installing frontend dependencies..."  
   - "Building frontend..."
   - "✅ Build successful: index.html found"

#### Step 3: Test Locally
Run this command locally to test the build:
```bash
npm run build
npm run check-deployment
```

#### Step 4: Manual Verification
After deployment, check the logs for these messages:
- "🚀 Setting up production static file serving..."
- "✅ Found frontend build at: [path]"
