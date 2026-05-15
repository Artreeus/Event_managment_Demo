# EventBook - Professional Event Booking Platform

A modern, full-stack event booking platform built with Next.js, MongoDB, Stripe, and Auth.js.

## Features

- **Event Categories**: Browse 6 event service categories (Wedding, Birthday, Photography, Catering, Decoration, DJ & Music)
- **Service Packages**: Each category offers 3 pricing tiers (Silver, Gold, Platinum)
- **Secure Booking**: Easy-to-use booking forms with validation
- **Payment Integration**: Stripe payment processing for seamless transactions
- **User Dashboard**: Manage bookings, view booking history, and update profile
- **Admin Panel**: Full admin dashboard for managing categories, packages, and bookings
- **Authentication**: Secure email/password authentication with Auth.js

## Tech Stack

- **Frontend**: Next.js 15+ App Router, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Auth.js with NextAuth.js
- **Payments**: Stripe API
- **Styling**: Tailwind CSS with custom theming

## Getting Started

### Prerequisites

- Node.js 18+ (recommended 20+)
- MongoDB database (local or cloud like MongoDB Atlas)
- Stripe account (for payment processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event-booking-platform
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the project root:
   ```env
   # MongoDB
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

   # Authentication
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=<generate-a-random-secret>

   # Stripe
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

   To generate NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

### Database Setup

#### Option 1: Load Demo Data (Recommended for Testing)

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Visit http://localhost:3000/seed-db

3. Click "Seed Database with Demo Data" button

This will populate your database with:
- 6 Event Categories
- 18 Service Packages (3 per category)
- 4 Demo Users (1 Admin, 3 Customers)
- 3 Sample Bookings

#### Option 2: Run Seed Script (Node.js)

If you have ts-node set up:
```bash
npx ts-node scripts/seed.ts
```

## Demo Credentials

After seeding, use these credentials to log in:

**Admin Account:**
- Email: `admin@eventbook.com`
- Password: `Admin123!`

**Customer Accounts:**
- Email: `customer1@example.com` | Password: `Password123!`
- Email: `customer2@example.com` | Password: `Password123!`
- Email: `customer3@example.com` | Password: `Password123!`

## Project Structure

```
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication routes
│   │   ├── categories/     # Category CRUD
│   │   ├── packages/       # Package CRUD
│   │   ├── bookings/       # Booking CRUD
│   │   ├── payments/       # Stripe integration
│   │   ├── admin/          # Admin-only routes
│   │   └── seed/           # Database seeding
│   ├── (public pages)       # Public routes
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── categories/         # Browse categories
│   ├── packages/           # Browse packages
│   ├── book/               # Booking form
│   ├── dashboard/          # User dashboard
│   ├── admin/              # Admin panel
│   └── seed-db/            # Seed UI page
├── components/             # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── SessionProvider.tsx # Auth session provider
│   ├── admin/             # Admin components
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── models/            # Mongoose models
│   ├── auth.ts            # Auth.js configuration
│   ├── mongodb.ts         # MongoDB connection
│   └── utils.ts           # Utility functions
├── scripts/
│   └── seed.ts            # Database seeding script
└── public/                # Static assets
```

## Key Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with service overview |
| Categories | `/categories` | Browse all event categories |
| Packages | `/packages/[categoryId]` | View packages in a category |
| Booking Form | `/book/[packageId]` | Create a new booking |
| Login | `/login` | User login |
| Register | `/register` | New user registration |
| Dashboard | `/dashboard` | User bookings and profile |
| Bookings | `/bookings` | View all user bookings |
| Admin Panel | `/admin` | Admin dashboard (admin only) |
| Seed Database | `/seed-db` | Load demo data into database |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth.js handler

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/[id]` - Update category (admin)

### Packages
- `GET /api/packages` - Get all packages
- `POST /api/packages` - Create package (admin)

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/[bookingId]` - Get booking details
- `PUT /api/bookings/[bookingId]` - Update booking

### Payments
- `POST /api/payments/create-intent` - Create Stripe payment intent
- `POST /api/payments/confirm` - Confirm payment
- `POST /api/payments/webhook` - Stripe webhook handler

### Admin
- `GET /api/admin/bookings` - Get all bookings (admin)
- `PUT /api/admin/bookings/[bookingId]` - Update booking status (admin)

## Development

### Running the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
pnpm build
pnpm start
```

### Code Quality

The project uses:
- TypeScript for type safety
- ESLint for code linting
- Tailwind CSS for styling

## Testing the Booking Flow

1. Log in with a customer account
2. Navigate to `/categories` or click "Browse Services"
3. Select a category and choose a package
4. Fill out the booking form
5. Proceed to checkout with Stripe
6. Use Stripe test card: `4242 4242 4242 4242` (any future date, any CVC)
7. Confirm booking completion

As an admin, visit `/admin` to:
- View all bookings
- Update booking statuses
- Manage categories and packages

## Database Models

### User
- Email, password, name, role (user/admin)
- Timestamps, email verification

### Category
- Name, description, icon, display order
- Active status, timestamps

### Package
- Category reference, name, description, price
- Features list, duration, timestamps

### Booking
- User & package references
- Customer details, booking date, status
- Notes, timestamps

### Payment
- Booking reference, Stripe payment ID
- Amount, status, timestamps

## Stripe Integration

### Setup Steps

1. Get your Stripe keys from https://dashboard.stripe.com/apikeys
2. Add them to `.env.local`:
   - `STRIPE_PUBLISHABLE_KEY` - Public key
   - `STRIPE_SECRET_KEY` - Secret key
   - `STRIPE_WEBHOOK_SECRET` - Webhook secret

3. Set up webhooks in Stripe Dashboard:
   - Endpoint URL: `https://yourdomain.com/api/payments/webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`

### Test Cards

For testing with Stripe:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Auth Required: `4000 0025 0000 3155`

## Authentication

The platform uses Auth.js with email/password authentication:

- Credentials provider with bcrypt password hashing
- Session-based authentication with secure cookies
- Role-based access control (user/admin)
- Protected routes using middleware

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on git push

### Other Platforms

Set these environment variables:
- `MONGODB_URI`
- `NEXTAUTH_URL` (must match your domain)
- `NEXTAUTH_SECRET`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Troubleshooting

### MongoDB Connection Failed
- Check `MONGODB_URI` is correct
- Verify IP whitelist in MongoDB Atlas
- Ensure credentials are correct

### Auth.js Errors
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies if issues persist

### Stripe Errors
- Verify API keys are correct
- Check webhook secret in .env.local
- Test with Stripe test cards

## Contributing

Contributions are welcome! Please:
1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT License - feel free to use this project for your needs.

## Support

For issues, questions, or feature requests, please open an issue on GitHub.

## Future Enhancements

- [ ] Review and rating system
- [ ] Email notifications
- [ ] SMS reminders
- [ ] Advanced analytics dashboard
- [ ] Recurring bookings
- [ ] Multiple payment methods
- [ ] Service provider profiles
- [ ] Availability calendar
