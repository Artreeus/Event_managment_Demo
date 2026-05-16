import { NextResponse } from 'next/server';
import { User } from '@/lib/models/User';
import { Category } from '@/lib/models/Category';
import { Package } from '@/lib/models/Package';
import { Booking } from '@/lib/models/Booking';
import { connectDB } from '@/lib/mongodb';

// ── Demo credentials (kept in sync with login page demo fill) ──────────────
const DEMO_ADMIN_EMAIL = 'admin@example.com';
const DEMO_PASSWORD = 'password123';

const demoUsers = [
  { email: DEMO_ADMIN_EMAIL,         password: DEMO_PASSWORD, name: 'Admin User',       role: 'admin' },
  { email: 'sarah@example.com',      password: DEMO_PASSWORD, name: 'Sarah Johnson',    role: 'user' },
  { email: 'michael@example.com',    password: DEMO_PASSWORD, name: 'Michael Chen',     role: 'user' },
  { email: 'emily@example.com',      password: DEMO_PASSWORD, name: 'Emily Rodriguez',  role: 'user' },
];

const demoCategories = [
  { name: 'Wedding Planning',  description: 'Complete wedding planning and coordination services', icon: '💒', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800', displayOrder: 1 },
  { name: 'Birthday Parties',  description: 'Fun and memorable birthday celebration packages',    icon: '🎂', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800', displayOrder: 2 },
  { name: 'Photography',       description: 'Professional photography services for all occasions', icon: '📸', image: 'https://images.unsplash.com/photo-1471341971476-ae15f5e82be8?w=800', displayOrder: 3 },
  { name: 'Catering',          description: 'Delicious food catering services',                   icon: '🍽️', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800', displayOrder: 4 },
  { name: 'Decoration',        description: 'Beautiful event decoration and styling',              icon: '🎨', image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800', displayOrder: 5 },
  { name: 'DJ & Music',        description: 'Professional DJ and live music services',             icon: '🎵', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800', displayOrder: 6 },
];

const demoPackages = [
  // Wedding Planning
  { categoryName: 'Wedding Planning', name: 'Silver Package',   description: 'Perfect for intimate gatherings',         price: 2500,  duration: '4 hours',           features: ['Venue coordination', 'Basic decoration', 'Photography (4 hrs)', 'Guest list management'] },
  { categoryName: 'Wedding Planning', name: 'Gold Package',     description: 'Comprehensive wedding planning',           price: 5000,  duration: '8 hours',           features: ['Full venue coordination', 'Premium decoration', 'Photography (8 hrs)', 'Catering coordination', 'Guest accommodation'] },
  { categoryName: 'Wedding Planning', name: 'Platinum Package', description: 'Ultimate luxury wedding experience',       price: 10000, duration: '24 hours',          features: ['Complete event management', 'Luxury decoration', 'All-day photography', 'Catering & bar', 'Wedding planner', 'Transport'] },
  // Birthday Parties
  { categoryName: 'Birthday Parties', name: 'Silver Package',   description: 'Simple birthday celebration',              price: 500,   duration: '3 hours',           features: ['Venue decoration', 'Snacks & refreshments', 'Balloon arrangements', 'Basic entertainment'] },
  { categoryName: 'Birthday Parties', name: 'Gold Package',     description: 'Fun-filled birthday party',                price: 1200,  duration: '5 hours',           features: ['Full decoration', 'Catering & beverages', 'Games & activities', 'DJ service', 'Cake & desserts'] },
  { categoryName: 'Birthday Parties', name: 'Platinum Package', description: 'Unforgettable birthday bash',              price: 2500,  duration: '8 hours',           features: ['Premium decoration', 'Full catering', 'DJ & live entertainment', 'Photo booth', 'Coordinator'] },
  // Photography
  { categoryName: 'Photography',      name: 'Silver Package',   description: 'Basic photography coverage',               price: 800,   duration: '4 hours',           features: ['400-500 edited photos', 'Online gallery', 'Print rights', 'Same-day preview'] },
  { categoryName: 'Photography',      name: 'Gold Package',     description: 'Extended photography coverage',            price: 1500,  duration: '8 hours',           features: ['800-1000 photos', 'Premium album', 'Video highlight reel', 'Prints & digital copies'] },
  { categoryName: 'Photography',      name: 'Platinum Package', description: 'Premium all-day coverage',                 price: 3000,  duration: '12 hours',          features: ['1500+ photos', 'Luxury album', '4K video', 'Drone photography', 'Second photographer'] },
  // Catering
  { categoryName: 'Catering',         name: 'Silver Package',   description: 'Basic catering service',                   price: 1500,  duration: 'Per 50 guests',     features: ['2-course meal', 'Beverages', 'Service staff', 'Disposable plates'] },
  { categoryName: 'Catering',         name: 'Gold Package',     description: 'Premium catering service',                 price: 3000,  duration: 'Per 50 guests',     features: ['3-course meal', 'Open bar', 'Professional staff', 'Fine dining setup', 'Dessert bar'] },
  { categoryName: 'Catering',         name: 'Platinum Package', description: 'Luxury gourmet catering',                  price: 5000,  duration: 'Per 50 guests',     features: ['5-course meal', 'Premium bar', 'Chef & waitstaff', 'Live food stations', 'Cake service'] },
  // Decoration
  { categoryName: 'Decoration',       name: 'Silver Package',   description: 'Basic event decoration',                   price: 800,   duration: 'Decoration only',   features: ['Balloon arrangements', 'Basic lighting', 'Flower arrangements', 'Table setup'] },
  { categoryName: 'Decoration',       name: 'Gold Package',     description: 'Beautiful event styling',                  price: 1800,  duration: 'Decoration & setup', features: ['Premium decorations', 'Ambient lighting', 'Floral installations', 'Entrance arch', 'Centerpieces'] },
  { categoryName: 'Decoration',       name: 'Platinum Package', description: 'Luxury event transformation',              price: 3500,  duration: 'Full service',       features: ['Bespoke design', 'Pro lighting', 'Luxury florals', 'Theme implementation', 'Setup & breakdown'] },
  // DJ & Music
  { categoryName: 'DJ & Music',       name: 'Silver Package',   description: 'DJ with basic sound system',               price: 600,   duration: '4 hours',           features: ['DJ service', 'Sound system', '200+ song requests', 'MC services'] },
  { categoryName: 'DJ & Music',       name: 'Gold Package',     description: 'Professional DJ with full setup',          price: 1200,  duration: '6 hours',           features: ['Pro DJ', 'Premium sound', 'Lighting', 'MC services', 'Custom playlist'] },
  { categoryName: 'DJ & Music',       name: 'Platinum Package', description: 'Premium DJ with live band option',         price: 2500,  duration: '8 hours',           features: ['Pro DJ', 'Premium sound & lighting', 'Live band option', 'MC services', 'Custom entertainment'] },
];

export async function POST() {
  try {
    await connectDB();

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Package.deleteMany({}),
      Booking.deleteMany({}),
    ]);

    // ── Create users one-by-one so pre('save') bcrypt hook fires ──────────
    const createdUsers: any[] = [];
    for (const userData of demoUsers) {
      const user = new User(userData);
      const saved = await user.save();
      createdUsers.push(saved);
    }

    // ── Seed categories ──────────────────────────────────────────────────
    const createdCategories = await Category.insertMany(demoCategories);

    // Build a lookup map
    const catMap = new Map(createdCategories.map((c: any) => [c.name, c._id]));

    // ── Seed packages ────────────────────────────────────────────────────
    const packagesToCreate = demoPackages.map((pkg) => ({
      categoryId: catMap.get(pkg.categoryName),
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      duration: pkg.duration,
      features: pkg.features,
    }));
    const createdPackages = await Package.insertMany(packagesToCreate);

    // ── Seed sample bookings ─────────────────────────────────────────────
    const sampleBookings = [
      {
        userId: createdUsers[1]._id,
        packageId: createdPackages[0]._id,
        customerName: createdUsers[1].name,
        customerEmail: createdUsers[1].email,
        customerPhone: '555-0101',
        bookingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'confirmed',
        notes: 'Looking forward to our wedding!',
      },
      {
        userId: createdUsers[2]._id,
        packageId: createdPackages[3]._id,
        customerName: createdUsers[2].name,
        customerEmail: createdUsers[2].email,
        customerPhone: '555-0102',
        bookingDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        status: 'confirmed',
        notes: 'Birthday party for 50 guests',
      },
      {
        userId: createdUsers[3]._id,
        packageId: createdPackages[7]._id,
        customerName: createdUsers[3].name,
        customerEmail: createdUsers[3].email,
        customerPhone: '555-0103',
        bookingDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        status: 'pending',
        notes: 'Professional photo session for family portrait',
      },
    ];
    const createdBookings = await Booking.insertMany(sampleBookings);

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        users: createdUsers.length,
        categories: createdCategories.length,
        packages: createdPackages.length,
        bookings: createdBookings.length,
        credentials: {
          admin:     { email: DEMO_ADMIN_EMAIL,      password: DEMO_PASSWORD },
          customer1: { email: 'sarah@example.com',   password: DEMO_PASSWORD },
          customer2: { email: 'michael@example.com', password: DEMO_PASSWORD },
          customer3: { email: 'emily@example.com',   password: DEMO_PASSWORD },
        },
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, error: 'Seeding failed', details: String(error) },
      { status: 500 }
    );
  }
}
