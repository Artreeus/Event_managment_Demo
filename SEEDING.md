# EventBook - Database Seeding Guide

Complete guide for populating the database with demo data.

## What is Database Seeding?

Database seeding is the process of pre-populating your database with sample data for testing and demonstration purposes. EventBook includes comprehensive demo data ready to load with a single click.

## Demo Data Included

### Categories (6 Total)

| Category | Icon | Description |
|----------|------|-------------|
| Wedding Planning | 💒 | Complete wedding planning and coordination |
| Birthday Parties | 🎂 | Fun and memorable birthday celebrations |
| Photography | 📸 | Professional photography for all events |
| Catering | 🍽️ | Delicious food catering services |
| Decoration | 🎨 | Beautiful event decoration and styling |
| DJ & Music | 🎵 | Professional DJ and live music services |

### Packages (18 Total - 3 per Category)

Each category has three pricing tiers:

**Silver Package** - Budget-friendly
- Example: Wedding Silver at $2,500

**Gold Package** - Mid-range
- Example: Wedding Gold at $5,000

**Platinum Package** - Premium
- Example: Wedding Platinum at $10,000

All packages include realistic features, durations, and service descriptions.

### Users (4 Total)

**Admin User**
```
Email: admin@eventbook.com
Password: Admin123!
Role: admin
```

**Customer Users**
```
1. Email: customer1@example.com | Password: Password123! | Name: Sarah Johnson
2. Email: customer2@example.com | Password: Password123! | Name: Michael Chen
3. Email: customer3@example.com | Password: Password123! | Name: Emily Rodriguez
```

### Sample Bookings (3 Total)

1. **Wedding Booking (Confirmed)**
   - Category: Wedding Planning
   - Package: Silver
   - Customer: Sarah Johnson
   - Date: 30 days from now
   - Status: Confirmed

2. **Birthday Booking (Confirmed)**
   - Category: Birthday Parties
   - Package: Gold
   - Customer: Michael Chen
   - Date: 14 days from now
   - Status: Confirmed

3. **Photography Booking (Pending)**
   - Category: Photography
   - Package: Gold
   - Customer: Emily Rodriguez
   - Date: 21 days from now
   - Status: Pending

## How to Seed the Database

### Method 1: Web UI (Easiest)

1. Start development server:
   ```bash
   pnpm dev
   ```

2. Visit http://localhost:3000/seed-db

3. Click "Seed Database with Demo Data" button

4. Wait for confirmation message

5. Success! Demo data is now loaded

**Advantages:**
- ✅ No command line needed
- ✅ Visual feedback
- ✅ Shows demo credentials
- ✅ Easy to use

### Method 2: API Endpoint

Make a POST request to the seed endpoint:

```bash
curl -X POST http://localhost:3000/api/seed
```

Or using fetch in JavaScript:

```javascript
const response = await fetch('/api/seed', { method: 'POST' });
const data = await response.json();
console.log(data);
```

Response example:
```json
{
  "success": true,
  "message": "Database seeded successfully",
  "data": {
    "users": 4,
    "categories": 6,
    "packages": 18,
    "bookings": 3,
    "credentials": {
      "admin": { "email": "admin@eventbook.com", "password": "Admin123!" },
      "customer1": { "email": "customer1@example.com", "password": "Password123!" }
    }
  }
}
```

### Method 3: Node.js Script

If you have ts-node installed:

```bash
npx ts-node scripts/seed.ts
```

This will:
1. Connect to MongoDB
2. Clear existing collections
3. Create categories
4. Create packages
5. Create users
6. Create sample bookings
7. Display confirmation with demo credentials

## Testing After Seeding

### As a Customer

1. Log in with `customer1@example.com` / `Password123!`
2. Click "Browse Services" → Categories
3. You'll see all 6 categories
4. Select a category to view packages
5. Click "Book Now" on any package
6. Fill out booking form
7. Complete checkout (use Stripe test card: 4242 4242 4242 4242)

### As an Admin

1. Log in with `admin@eventbook.com` / `Admin123!`
2. Visit `/admin` to see admin dashboard
3. View categories, packages, bookings
4. Update booking statuses
5. Manage services (if CRUD implemented)

### Verify Data

Check the dashboard:
- 4 users created
- 6 categories listed
- 18 packages available
- 3 sample bookings in system

## Resetting the Database

To clear all data and start fresh:

1. Click "Seed Database" again - it will:
   - Delete all existing data
   - Create fresh demo data
   - Reset to initial state

Or manually clear:

```bash
# Connect to MongoDB
mongosh "mongodb+srv://..."

# Clear collections
use eventbook
db.users.deleteMany({})
db.categories.deleteMany({})
db.packages.deleteMany({})
db.bookings.deleteMany({})
db.payments.deleteMany({})
```

## Seed Data Location

### In Code

Demo data is defined in two places:

1. **Seed Script**: `scripts/seed.ts`
   - Server-side seed script
   - Run via command line

2. **Seed API**: `app/api/seed/route.ts`
   - API endpoint for seeding
   - Used by Web UI
   - Can be called from frontend

### Modifying Seed Data

To customize demo data:

1. Edit `app/api/seed/route.ts`
2. Modify the demo data arrays:
   - `demoCategories`
   - `demoPackages`
   - `demoUsers`
   - `sampleBookings`
3. Save and reseed database

Example - Add new category:

```typescript
const demoCategories = [
  // ... existing categories
  {
    name: 'Event Planning',
    description: 'Complete event planning services',
    icon: '🎪',
    displayOrder: 7,
  },
];
```

## Pricing Reference

### Wedding Planning
- Silver: $2,500 (4 hours)
- Gold: $5,000 (8 hours)
- Platinum: $10,000 (24 hours)

### Birthday Parties
- Silver: $500 (3 hours)
- Gold: $1,200 (5 hours)
- Platinum: $2,500 (8 hours)

### Photography
- Silver: $800 (4 hours)
- Gold: $1,500 (8 hours)
- Platinum: $3,000 (12 hours)

### Catering
- Silver: $1,500 (per 50 guests)
- Gold: $3,000 (per 50 guests)
- Platinum: $5,000 (per 50 guests)

### Decoration
- Silver: $800
- Gold: $1,800
- Platinum: $3,500

### DJ & Music
- Silver: $600 (4 hours)
- Gold: $1,200 (6 hours)
- Platinum: $2,500 (8 hours)

## FAQ

### Q: Will seeding delete my existing data?

**A:** Yes! The seed endpoint clears all collections before loading demo data. If you have custom data, export it first.

### Q: Can I seed production database?

**A:** Not recommended. The API clears all data. Use different databases for development/production or remove seed endpoint from production builds.

### Q: How do I modify package features?

Edit `demoPackages` in `app/api/seed/route.ts`:

```typescript
{
  categoryName: 'Wedding Planning',
  name: 'Silver Package',
  description: 'Perfect for intimate gatherings',
  price: 2500,
  duration: '4 hours',
  features: [
    'Venue coordination',
    'Basic decoration',
    'Photography (4 hours)',
    'Guest list management',
    // Add new features here
  ],
}
```

### Q: Can I automate seeding?

Yes! Call `/api/seed` via POST request in a setup script or CI/CD pipeline.

### Q: How often should I reseed?

During development: As often as needed
Production: Never (disable endpoint or protect with auth)

### Q: Where's my test data?

After seeding:
- Users in `users` collection
- Categories in `categories` collection
- Packages in `packages` collection
- Bookings in `bookings` collection
- All in your MongoDB database

## Production Considerations

### Should I include seed endpoint in production?

**Recommendation: NO**

For security, disable or protect the seed endpoint:

```typescript
// Option 1: Remove from production build
if (process.env.NODE_ENV === 'production') {
  return NextResponse.json(
    { error: 'Seed not available in production' },
    { status: 403 }
  );
}

// Option 2: Require authentication
const session = await getServerSession(authOptions);
if (!session || session.user?.role !== 'admin') {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### Seeding Production Database

If you need to seed production (careful!):

1. Use a separate script
2. Require manual approval
3. Backup database first
4. Log all operations
5. Monitor carefully

## Extending Demo Data

### Add New Category

1. Edit `demoCategories` array
2. Add new category object
3. Create packages for it in `demoPackages`
4. Reseed database

### Add More Packages

1. Edit `demoPackages` array
2. Add new package object
3. Reference existing category by name
4. Reseed database

### Add More Users

1. Edit `demoUsers` array
2. Add user with unique email
3. Reseed database (careful - this resets everything!)

## Data Relationships

```
Category (1) ──────────(n) Package
                              │
                              │
Booking (n)────────────(1) Package
  │
  └────────(1) User
  
Payment (1) ──────(1) Booking
```

## Troubleshooting Seeding

### Seed Fails - MongoDB Connection Error

Check:
- MongoDB is running
- `MONGODB_URI` is correct in `.env.local`
- Database credentials are valid
- IP whitelist includes your IP (MongoDB Atlas)

### Seed Succeeds but Data Not Visible

Check:
- Correct database name in connection string
- User has proper permissions
- Collections actually created (check MongoDB directly)
- Browser cache (hard refresh)

### Seed API Returns 500 Error

Check:
- Database connection working
- Collections exist
- Environment variables set
- Check server logs for error details

### Demo Credentials Don't Work

After seeding, try:
1. Clear browser cookies
2. Hard refresh (Ctrl+Shift+R)
3. Reseed database again
4. Use exact credentials from seed output

## Next Steps

After seeding and testing:

1. [Browse the code](./README.md)
2. [Deploy to production](./DEPLOYMENT.md)
3. [Customize for your needs](#extending-demo-data)
4. [Set up monitoring and backups](./DEPLOYMENT.md#step-9-monitoring--maintenance)

---

**Happy Seeding! 🌱**
