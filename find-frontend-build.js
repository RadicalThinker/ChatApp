#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const express = require("express");

// Function to find the frontend build directory
function findFrontendBuild() {
  const possiblePaths = [
    path.join(process.cwd(), "frontend", "dist"),
    path.join(process.cwd(), "dist"),
    path.join(__dirname, "..", "frontend", "dist"),
    path.join(__dirname, "..", "..", "frontend", "dist"),
  ];

  for (const buildPath of possiblePaths) {
    const indexPath = path.join(buildPath, "index.html");
    if (fs.existsSync(indexPath)) {
      console.log(`✅ Found frontend build at: ${buildPath}`);
      return buildPath;
    }
  }

  console.error("❌ Frontend build not found in any of these locations:");
  possiblePaths.forEach((p) => console.error(`  - ${p}`));
  return null;
}

// Export for use in other modules
module.exports = { findFrontendBuild };

// If run directly, perform the check
if (require.main === module) {
  console.log("🔍 Searching for frontend build...");
  const buildPath = findFrontendBuild();

  if (!buildPath) {
    console.error("❌ Frontend build verification failed");
    process.exit(1);
  } else {
    console.log("✅ Frontend build verification successful");
  }
}
