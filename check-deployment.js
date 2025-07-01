// Simple script to test build and deployment setup
const fs = require("fs");
const path = require("path");

console.log("🔍 Checking deployment setup...\n");

// Check current working directory
console.log("Current working directory:", process.cwd());

// Check if frontend dist exists
const frontendDistPath = path.join(process.cwd(), "frontend", "dist");
const indexHtmlPath = path.join(frontendDistPath, "index.html");

console.log("Looking for frontend build at:", frontendDistPath);

if (fs.existsSync(frontendDistPath)) {
  console.log("✅ Frontend dist directory exists");

  if (fs.existsSync(indexHtmlPath)) {
    console.log("✅ index.html found");
    console.log("✅ Deployment setup looks good!");
  } else {
    console.log("❌ index.html NOT found in dist directory");
    console.log("Contents of dist directory:");
    try {
      const files = fs.readdirSync(frontendDistPath);
      console.log(files);
    } catch (e) {
      console.log("Error reading dist directory:", e.message);
    }
  }
} else {
  console.log("❌ Frontend dist directory does not exist");

  // Check if frontend directory exists
  const frontendPath = path.join(process.cwd(), "frontend");
  if (fs.existsSync(frontendPath)) {
    console.log("Frontend directory exists, but no dist folder found");
    console.log("Contents of frontend directory:");
    try {
      const files = fs.readdirSync(frontendPath);
      console.log(files);
    } catch (e) {
      console.log("Error reading frontend directory:", e.message);
    }
  } else {
    console.log("❌ Frontend directory does not exist");
  }
}

// Check project structure
console.log("\n📁 Project structure:");
try {
  const rootFiles = fs.readdirSync(process.cwd());
  console.log("Root directory contents:", rootFiles);
} catch (e) {
  console.log("Error reading root directory:", e.message);
}
