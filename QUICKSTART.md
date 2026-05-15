# Quick Start Guide

Get EventBook running in 5 minutes!

## Step 1: Install Dependencies

```bash
pnpm install
```

## Step 2: Set Up Environment Variables

Create `.env.local` in the project root:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/eventbook

# Authentication (generate with: openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Stripe (Get from https://dashboard.stripe.com/apikeys)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Step 3: Start Development Server

```bash
pnpm dev
```

Visit http://localhost:3000

## Step 4: Load Demo Data

1. Go to http://localhost:3000/seed-db
2. Click "Seed Database with Demo Data"
3. Wait for confirmation

## Step 5: Log In & Explore

Use any demo credential:

**Customer:**
- Email: `customer1@example.com`
- Password: `Password123!`

**Admin:**
- Email: `admin@eventbook.com`
- Password: `Admin123!`

## Try These Actions

### As a Customer
- [ ] Browse categories at `/categories`
- [ ] View packages in a category
- [ ] Create a booking
- [ ] View bookings in dashboard
- [ ] Test Stripe payment (use card `4242 4242 4242 4242`)

### As Admin
- [ ] Visit `/admin` to see admin panel
- [ ] View all bookings
- [ ] Update booking status
- [ ] Manage categories and packages

## Demo Data Included

✅ 6 Event Categories  
✅ 18 Service Packages  
✅ 4 Demo Users  
✅ 3 Sample Bookings  

## Stripe Test Cards

| Card | Status |
|------|--------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 0002 | Decline |
| 4000 0025 0000 3155 | Auth Required |

Use any future date and any 3-digit CVC.

## Troubleshooting

**MongoDB Connection Error?**
- Check your MONGODB_URI is correct
- Verify whitelist IP in MongoDB Atlas

**Auth Issues?**
- Clear browser cookies
- Verify NEXTAUTH_URL matches localhost:3000

**Stripe Not Working?**
- Check API keys are in .env.local
- Ensure test mode is enabled in Stripe dashboard

## What's Next?

- [ ] Read [README.md](./README.md) for full documentation
- [ ] Customize categories and packages
- [ ] Update branding (colors, fonts, images)
- [ ] Configure additional services
- [ ] Deploy to production

Happy booking! 🎉
