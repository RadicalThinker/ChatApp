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

### 5. Project Structure Expected by Backend

```
project-root/
├── backend/
│   └── src/
│       └── index.js (serves static files from frontend/dist)
├── frontend/
│   └── dist/ (created after npm run build)
│       └── index.html
└── package.json (root build scripts)
```

### 6. Common Issues and Solutions

**Issue 1: Build fails during npm install**
- Solution: Check package.json dependencies and ensure all are compatible

**Issue 2: Frontend build succeeds but files not found**
- Solution: Check the path resolution in backend/src/index.js

**Issue 3: CORS errors in production**
- Solution: Update FRONTEND_URL environment variable to match your Render URL

### 7. Alternative Deployment (if above fails)

If the single service deployment doesn't work, you can deploy as two separate services:

1. **Backend Service:** Deploy from `/backend` directory
2. **Frontend Service:** Deploy from `/frontend` directory as a static site

Then update the frontend to point to the backend API URL.
