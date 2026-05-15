# EventBook Platform - Deployment Guide

Complete guide to deploy EventBook to production.

## Prerequisites

- GitHub account (for version control)
- Vercel account (recommended) or other hosting
- MongoDB Atlas account (for production database)
- Stripe account with live keys

## Step 1: Prepare MongoDB

### Option A: MongoDB Atlas (Cloud)

1. Visit https://www.mongodb.com/cloud/atlas
2. Create a new project
3. Create a cluster (free tier available)
4. Create database user with strong password
5. Add IP whitelist (0.0.0.0/0 for development, specific IPs for production)
6. Copy connection string
7. Replace `<username>:<password>` with your credentials

### Option B: Self-Hosted MongoDB

- Set up MongoDB server on your infrastructure
- Ensure it's accessible from your application
- Configure authentication and backups
- Get connection string

## Step 2: Set Up Stripe

1. Go to https://stripe.com (sign up if needed)
2. Verify your business details
3. Navigate to Developers → API Keys
4. Get both **Publishable Key** and **Secret Key**
5. Set up webhooks:
   - Endpoint: `https://yourdomain.com/api/payments/webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
6. Get **Webhook Secret**
7. Switch to live keys when ready

## Step 3: Generate Security Keys

### NextAuth Secret

Generate a secure secret:
```bash
openssl rand -base64 32
```

Save the output for .env.local

## Step 4: Push to GitHub

### First Time Setup

```bash
# Initialize git if not done
git init

# Add remote repository
git remote add origin https://github.com/yourusername/eventbook.git

# Create main branch
git branch -M main

# Add all files
git add .

# Commit
git commit -m "Initial commit: EventBook platform"

# Push to GitHub
git push -u origin main
```

### Verify Files on GitHub

Ensure `.env.local` is in `.gitignore` (don't commit secrets!)

Check `.gitignore` contains:
```
.env.local
.env*.local
node_modules/
.next/
```

## Step 5: Deploy to Vercel (Recommended)

### Easiest Option: Git Integration

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Vercel detects Next.js automatically
5. Add environment variables:
   - Click "Environment Variables"
   - Add all variables from your `.env.local`

### Environment Variables to Add

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/eventbook
NEXTAUTH_URL=https://yourdomain.vercel.app
NEXTAUTH_SECRET=<your-generated-secret>
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

6. Click Deploy
7. Wait for build to complete (usually 2-3 minutes)

### After Deployment

1. Get your production URL from Vercel
2. Test the application
3. Set up custom domain:
   - Add domain in Vercel settings
   - Update Stripe webhook URL with new domain
   - Update NEXTAUTH_URL with new domain

## Step 6: Alternative Hosting Options

### Self-Hosted (VPS/Server)

```bash
# SSH into server
ssh user@your-server.com

# Install Node.js (if not present)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm

# Clone repository
git clone https://github.com/yourusername/eventbook.git
cd eventbook

# Install dependencies
pnpm install

# Create .env.local
nano .env.local
# Add all environment variables

# Build application
pnpm build

# Start with PM2 (recommended)
npm install -g pm2
pm2 start "pnpm start" --name "eventbook"
pm2 save
pm2 startup

# Setup Nginx reverse proxy
sudo nano /etc/nginx/sites-available/eventbook
# Add reverse proxy config
```

### Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-eventbook-app

# Set environment variables
heroku config:set MONGODB_URI=...
heroku config:set NEXTAUTH_SECRET=...
# ... add all variables

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

## Step 7: Configure Production Services

### MongoDB Backups

If using MongoDB Atlas:
1. Go to Atlas Dashboard
2. Select Cluster
3. Navigate to Backup
4. Enable automated backups (recommended daily)
5. Set retention policy

### Stripe Webhooks

1. Go to Stripe Dashboard
2. Developers → Webhooks
3. Update endpoint URL to your production domain
4. Test webhook by sending events
5. Monitor webhook logs

### Custom Domain

1. Buy domain from GoDaddy, Namecheap, etc.
2. Point DNS to your hosting provider
3. Set up SSL/TLS certificate (auto with Vercel/Heroku)
4. Update NEXTAUTH_URL
5. Update Stripe webhook URL

## Step 8: Post-Deployment

### Verify Functionality

- [ ] Home page loads
- [ ] User registration works
- [ ] Login functions correctly
- [ ] Categories display
- [ ] Packages show with prices
- [ ] Booking form submits
- [ ] Stripe payment works with live keys
- [ ] Email notifications send (if configured)
- [ ] Admin panel accessible
- [ ] Database operations work

### Performance Testing

```bash
# Build locally and test
pnpm build
pnpm start

# Monitor in production
# Use Vercel Analytics or similar
```

### Security Checklist

- [x] HTTPS enabled
- [x] Environment variables secured
- [x] Database password strong (16+ chars)
- [x] CORS properly configured
- [x] API rate limiting (if needed)
- [x] Input validation on all endpoints
- [x] Secrets not in version control
- [x] Regular backups enabled

## Step 9: Monitoring & Maintenance

### Set Up Monitoring

Options:
- Vercel Analytics (built-in)
- Datadog
- New Relic
- Sentry (error tracking)

### Regular Tasks

- [ ] Monitor database usage
- [ ] Check Stripe logs for failures
- [ ] Review error logs weekly
- [ ] Update dependencies monthly
- [ ] Test backup restoration quarterly
- [ ] Review security patches
- [ ] Monitor uptime

### Database Maintenance

```bash
# Connect to MongoDB
mongo "mongodb+srv://..."

# Basic maintenance
db.adminCommand({ replSetGetStatus: 1 })
db.stats()

# Create indexes if needed
db.bookings.createIndex({ userId: 1, status: 1 })
```

## Troubleshooting Deployment

### Build Fails

Check:
- Node version compatibility
- Missing environment variables
- TypeScript compilation errors
- Dependency conflicts

```bash
pnpm build --verbose  # For detailed error logs
```

### Blank Page After Deployment

- Check browser console for errors
- Verify environment variables are set
- Check Vercel logs
- Rebuild and redeploy

### Database Connection Failed

- Verify MONGODB_URI in environment
- Check IP whitelist (MongoDB Atlas)
- Ensure database user credentials correct
- Test connection locally

### Stripe Payments Not Working

- Verify keys are switched to live (not test)
- Check webhook is receiving events
- Verify webhook URL is correct
- Review Stripe logs for errors

### Auth Not Working

- Verify NEXTAUTH_URL matches deployment domain
- Check NEXTAUTH_SECRET is set
- Clear browser cookies
- Verify Auth.js configuration

## Step 10: Go Live!

### Pre-Launch Checklist

- [ ] All features tested in production
- [ ] Database backups configured
- [ ] Monitoring enabled
- [ ] Error tracking configured
- [ ] Support plan in place
- [ ] Documentation updated
- [ ] Demo data seeded (optional)
- [ ] Load testing completed

### Launch Steps

1. Verify all systems working
2. Announce service availability
3. Share production URL
4. Monitor closely first 24 hours
5. Be ready for user support

### Post-Launch Monitoring

- Monitor error rates
- Check performance metrics
- Review user feedback
- Make quick bug fixes
- Optimize based on usage

## Scaling & Optimization

### As Traffic Increases

1. **Database:**
   - Monitor connection count
   - Add indexes if needed
   - Consider read replicas

2. **Application:**
   - Enable caching headers
   - Use CDN for static assets
   - Implement API rate limiting

3. **Infrastructure:**
   - Monitor server resources
   - Scale horizontally if needed
   - Set up load balancing

### Cost Optimization

- MongoDB: Monitor storage and data usage
- Stripe: Review transaction fees
- Vercel: Monitor function invocations
- Bandwidth: Use CDN for assets

## Security Updates

### Regular Tasks

- [ ] Update dependencies (`pnpm update`)
- [ ] Check for security vulnerabilities (`npm audit`)
- [ ] Review Auth.js updates
- [ ] Update Stripe SDK
- [ ] Monitor security advisories

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update packages
pnpm update
```

## Disaster Recovery

### Backup Strategy

1. **Database:**
   - Enable automated backups
   - Test restore process quarterly
   - Keep backups for 30+ days

2. **Code:**
   - Use Git for version control
   - Tag releases
   - Keep deployment history

3. **Configuration:**
   - Document all settings
   - Keep secure key backups (encrypted)
   - Version control infrastructure-as-code

### Recovery Procedures

If database lost:
```bash
# Restore from MongoDB Atlas backup
# Contact MongoDB support if manual recovery needed
```

If application compromised:
```bash
# Rollback to previous version
git revert <commit-hash>
git push origin main
# Vercel will auto-redeploy
```

## Support & Help

**Vercel Issues:** https://vercel.com/support
**MongoDB Help:** https://www.mongodb.com/support
**Stripe Support:** https://support.stripe.com
**Next.js Docs:** https://nextjs.org/docs

---

**Deployment Date:** [Add your date]
**Production URL:** [Add your domain]
**Last Updated:** [Add update date]
