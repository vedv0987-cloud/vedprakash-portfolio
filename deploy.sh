#!/bin/bash
set -e

# Navigate to the directory where this script is located
cd "$(dirname "$0")"

echo "=========================================="
echo "1. Verifying TypeScript Strict Types..."
echo "=========================================="
npx tsc --noEmit

echo "=========================================="
echo "2. Testing Production Next.js Build..."
echo "=========================================="
npm run build

echo "=========================================="
echo "3. Committing Changes to Git..."
echo "=========================================="
git add -A
COMMIT_MSG="${1:-feat: production update and feature enhancements}"
git commit -m "$COMMIT_MSG" || echo "Working tree clean, continuing..."

echo "=========================================="
echo "4. Pushing to GitHub & Vercel Edge..."
echo "=========================================="
git push origin main

echo "=========================================="
echo "DEPLOYMENT COMPLETE!"
echo "Live at: https://nuradi.co.in"
echo "=========================================="
