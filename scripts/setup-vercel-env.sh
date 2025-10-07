#!/bin/bash

# Vercel Environment Variables Setup Script
# Run these commands in your terminal to set up Vercel environment variables

echo "Setting up Vercel environment variables..."

# Generate a new NEXTAUTH_SECRET for production
NEXTAUTH_SECRET=$(openssl rand -base64 32)
echo "Generated NEXTAUTH_SECRET: $NEXTAUTH_SECRET"

# Set environment variables in Vercel
echo "Run these commands in your terminal:"
echo ""
echo "vercel env add NEXTAUTH_SECRET production"
echo "# Enter: $NEXTAUTH_SECRET"
echo ""
echo "vercel env add NEXTAUTH_URL production"  
echo "# Enter: https://the-board-man-website.vercel.app"
echo ""
echo "vercel env add DATABASE_URL production"
echo "# Enter: postgresql://neondb_owner:npg_qc1sHDwUdt4i@ep-billowing-grass-ad8vyn2j-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
echo ""
echo "vercel env add RESEND_API_KEY production"
echo "# Enter: re_Tp9KVL6U_3f1JY9FVDawyFxig7rg54qJr"
echo ""
echo "vercel env add FROM_EMAIL production"
echo "# Enter: onboarding@resend.dev"
echo ""
echo "vercel env add ADMIN_EMAIL production"
echo "# Enter: russelcsemi@gmail.com"
echo ""
echo "vercel env add NEXT_PUBLIC_BASE_URL production"
echo "# Enter: https://the-board-man-website.vercel.app"

echo ""
echo "After setting all variables, redeploy with:"
echo "vercel --prod"