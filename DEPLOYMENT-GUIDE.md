# THE BOARD MAN - Vercel Deployment Guide

## 🚀 Complete Free Deployment Setup

This guide will help you deploy THE BOARD MAN website to Vercel with free backend services for email, database, and analytics.

---

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Gmail account (for email service)

---

## 1. 🗄️ Database Setup (Free - Vercel Postgres)

### Step 1: Create Vercel Postgres Database
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Storage** tab
3. Click **Create Database**
4. Select **Postgres** (Free tier: 60 hours of compute/month)
5. Choose a name: `board-man-db`
6. Select region closest to your users (Dubai/UAE users → Frankfurt)
7. Click **Create**

### Step 2: Get Database URL
1. Once created, go to **Settings** tab of your database
2. Copy the **Connection String** (starts with `postgresql://`)
3. Save this - you'll need it for environment variables

---

## 2. 📧 Email Service Setup (Free - Resend)

### Step 1: Sign up for Resend (Free)
1. Go to [Resend.com](https://resend.com)
2. Sign up with your email
3. Free tier: 3,000 emails/month, 100 emails/day

### Step 2: Verify Your Domain (Optional but Recommended)
1. In Resend dashboard, go to **Domains**
2. Add your domain (e.g., `board-man.com`)
3. Follow DNS setup instructions
4. **Alternative**: Use Resend's free domain for testing

### Step 3: Get API Key
1. Go to **API Keys** in Resend dashboard
2. Click **Create API Key**
3. Name it `board-man-production`
4. Copy the API key (starts with `re_`)

### Step 4: Create Email Templates
1. Go to **Emails** → **Templates**
2. Create templates for:
   - Contact form confirmations
   - Booking confirmations
   - Admin notifications

---

## 3. 📊 Analytics Setup (Free - Vercel Analytics)

### Step 1: Enable Vercel Analytics
1. In your Vercel project dashboard
2. Go to **Analytics** tab
3. Click **Enable Analytics** (Free tier: 100k events/month)

### Step 2: Add Analytics Code
I'll add the analytics code to your project automatically.

---

## 4. 🛠️ Project Configuration

Let me update your project with the necessary environment variables and database setup:

### Environment Variables Needed
```env
# Database
DATABASE_URL=your_vercel_postgres_connection_string

# Email Service
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@yourdomain.com

# App Configuration
NEXT_PUBLIC_BASE_URL=https://your-vercel-app.vercel.app
NEXTAUTH_SECRET=your_generated_secret
NEXTAUTH_URL=https://your-vercel-app.vercel.app

# Admin Authentication
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=your_secure_password
```

---

## 5. 🚀 Deployment Steps

### Step 1: Push to GitHub
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - THE BOARD MAN website"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/my-shadcn-website.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **New Project**
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Add Environment Variables
1. In Vercel project settings → **Environment Variables**
2. Add all variables from the list above
3. Use the database URL from Step 1
4. Use the Resend API key from Step 2

### Step 4: Deploy
1. Click **Deploy**
2. Wait for deployment to complete
3. Get your live URL (e.g., `https://your-app.vercel.app`)

---

## 6. 📱 Content Management Setup (Free - Sanity Studio)

### Option A: Simple File-Based CMS (Recommended for beginners)
- Blog posts as MDX files in `/content/blog/`
- Resources as JSON files in `/data/resources.json`
- Easy to manage, no external dependencies

### Option B: Sanity CMS (Free tier: 10k documents)
1. Sign up at [Sanity.io](https://sanity.io)
2. Create new project
3. Install Sanity in your project
4. Configure schemas for blog posts, resources

I recommend **Option A** for simplicity since you mentioned you don't know backend services.

---

## 7. 🔧 Post-Deployment Configuration

### Step 1: Update DNS (If you have a custom domain)
1. In your domain registrar (GoDaddy, Namecheap, etc.)
2. Add CNAME record: `www` → `your-app.vercel.app`
3. Add A record: `@` → Vercel IP addresses

### Step 2: SSL Certificate
- Vercel automatically provides SSL certificates
- No additional setup needed

### Step 3: Test All Features
- Contact form submissions
- Booking appointments
- Admin panel login
- Email notifications

---

## 8. 📈 Monitoring & Maintenance

### Free Monitoring Tools:
1. **Vercel Analytics** - Page views, performance
2. **Vercel Functions Logs** - API endpoint monitoring
3. **Resend Logs** - Email delivery status
4. **GitHub Actions** - Automated deployments

### Regular Tasks:
- Check email delivery in Resend dashboard
- Monitor database usage in Vercel
- Review analytics for user behavior
- Update content and blog posts

---

## 9. 💰 Cost Breakdown (All Free Tiers)

| Service | Free Tier Limits | Upgrade Cost |
|---------|------------------|--------------|
| Vercel Hosting | 100GB bandwidth/month | $20/month |
| Vercel Postgres | 60 hours compute/month | $20/month |
| Vercel Analytics | 100k events/month | $10/month |
| Resend Email | 3,000 emails/month | $20/month |
| **Total** | **$0/month** | **$70/month if upgraded** |

---

## 🆘 Troubleshooting Common Issues

### Build Failures
- Check environment variables are set
- Verify all dependencies in package.json
- Review build logs in Vercel dashboard

### Email Not Sending
- Verify Resend API key
- Check FROM_EMAIL domain is verified
- Review Resend logs for errors

### Database Connection Issues
- Verify DATABASE_URL format
- Check Vercel Postgres is active
- Ensure database migrations are run

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Resend Docs**: https://resend.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **THE BOARD MAN Support**: Contact form on your website

---

## 🎯 Next Steps After Deployment

1. **Test everything** thoroughly
2. **Set up Google Search Console** for SEO
3. **Create Google Business Profile** for local SEO
4. **Set up social media** accounts
5. **Monitor analytics** and user feedback
6. **Plan content strategy** for blog and resources

---

*Your THE BOARD MAN website will be live and fully functional with all these free services! 🎉*