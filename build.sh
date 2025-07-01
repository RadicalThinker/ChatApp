#!/bin/bash

echo "Starting build process for ChatApp..."

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend && npm install

# Install frontend dependencies  
echo "Installing frontend dependencies..."
cd ../frontend && npm install

# Build frontend
echo "Building frontend..."
npm run build

# Check if build was successful
if [ -f "dist/index.html" ]; then
    echo "✅ Frontend build successful - index.html found in dist/"
    ls -la dist/
else
    echo "❌ Frontend build failed - index.html not found in dist/"
    exit 1
fi

echo "✅ Build process completed successfully!"
