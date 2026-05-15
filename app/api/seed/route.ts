import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { User } from '@/lib/models/User';
import { Category } from '@/lib/models/Category';
import { Package } from '@/lib/models/Package';
import { Booking } from '@/lib/models/Booking';
import { connectDB } from '@/lib/mongodb';

const demoCategories = [
  {
    name: 'Wedding Planning',
    description: 'Complete wedding planning and coordination services',
    icon: '💒',
    displayOrder: 1,
  },
  {
    name: 'Birthday Parties',
    description: 'Fun and memorable birthday celebration packages',
    icon: '🎂',
    displayOrder: 2,
  },
  {
    name: 'Photography',
    description: 'Professional photography services for all occasions',
    icon: '📸',
    displayOrder: 3,
  },
  {
    name: 'Catering',
    description: 'Delicious food catering services',
    icon: '🍽️',
    displayOrder: 4,
  },
  {
    name: 'Decoration',
    description: 'Beautiful event decoration and styling',
    icon: '🎨',
    displayOrder: 5,
  },
  {
    name: 'DJ & Music',
    description: 'Professional DJ and live music services',
    icon: '🎵',
    displayOrder: 6,
  },
];

const demoPackages = [
  // Wedding Planning packages
  {
    categoryName: 'Wedding Planning',
    name: 'Silver Package',
    description: 'Perfect for intimate gatherings',
    price: 2500,
    duration: '4 hours',
    features: ['Venue coordination', 'Basic decoration', 'Photography (4 hours)', 'Guest list management'],
  },
  {
    categoryName: 'Wedding Planning',
    name: 'Gold Package',
    description: 'Comprehensive wedding planning',
    price: 5000,
    duration: '8 hours',
    features: ['Full venue coordination', 'Premium decoration', 'Photography (8 hours)', 'Catering coordination', 'Guest accommodation help'],
  },
  {
    categoryName: 'Wedding Planning',
    name: 'Platinum Package',
    description: 'Ultimate luxury wedding experience',
    price: 10000,
    duration: '24 hours',
    features: ['Complete event management', 'Premium decoration & styling', 'All-day photography', 'Catering & bar service', 'Wedding planner', 'Transport coordination'],
  },
  // Birthday Parties packages
  {
    categoryName: 'Birthday Parties',
    name: 'Silver Package',
    description: 'Simple birthday celebration',
    price: 500,
    duration: '3 hours',
    features: ['Venue decoration', 'Snacks & refreshments', 'Balloon arrangements', 'Basic entertainment'],
  },
  {
    categoryName: 'Birthday Parties',
    name: 'Gold Package',
    description: 'Fun-filled birthday party',
    price: 1200,
    duration: '5 hours',
    features: ['Full decoration setup', 'Catering & beverages', 'Games & activities', 'DJ service', 'Cake & desserts'],
  },
  {
    categoryName: 'Birthday Parties',
    name: 'Platinum Package',
    description: 'Unforgettable birthday bash',
    price: 2500,
    duration: '8 hours',
    features: ['Premium decoration', 'Full catering service', 'DJ & live entertainment', 'Photo booth', 'Cake & premium desserts', 'Professional party coordinator'],
  },
  // Photography packages
  {
    categoryName: 'Photography',
    name: 'Silver Package',
    description: 'Basic photography coverage',
    price: 800,
    duration: '4 hours',
    features: ['400-500 photos', 'Same-day editing', 'Online gallery', 'Print rights'],
  },
  {
    categoryName: 'Photography',
    name: 'Gold Package',
    description: 'Extended photography coverage',
    price: 1500,
    duration: '8 hours',
    features: ['800-1000 photos', 'Same-day editing', 'Premium album', 'Video highlight reel', 'Prints & digital copies'],
  },
  {
    categoryName: 'Photography',
    name: 'Platinum Package',
    description: 'Premium all-day coverage',
    price: 3000,
    duration: '12 hours',
    features: ['1500+ photos', 'Professional editing', 'Luxury album', '4K video coverage', 'Drone photography', 'Second photographer'],
  },
  // Catering packages
  {
    categoryName: 'Catering',
    name: 'Silver Package',
    description: 'Basic catering service',
    price: 1500,
    duration: 'Per 50 guests',
    features: ['2-course meal', 'Beverages', 'Basic service staff', 'Disposable plates'],
  },
  {
    categoryName: 'Catering',
    name: 'Gold Package',
    description: 'Premium catering service',
    price: 3000,
    duration: 'Per 50 guests',
    features: ['3-course meal', 'Open bar', 'Professional staff', 'Fine dining setup', 'Dessert bar'],
  },
  {
    categoryName: 'Catering',
    name: 'Platinum Package',
    description: 'Luxury gourmet catering',
    price: 5000,
    duration: 'Per 50 guests',
    features: ['5-course meal', 'Premium bar service', 'Chef & waitstaff', 'Live food stations', 'Dessert & cake service'],
  },
  // Decoration packages
  {
    categoryName: 'Decoration',
    name: 'Silver Package',
    description: 'Basic event decoration',
    price: 800,
    duration: 'Decoration only',
    features: ['Standard balloon arrangements', 'Basic lighting', 'Flower arrangements', 'Table setup'],
  },
  {
    categoryName: 'Decoration',
    name: 'Gold Package',
    description: 'Beautiful event styling',
    price: 1800,
    duration: 'Decoration & setup',
    features: ['Premium decorations', 'Ambient lighting design', 'Floral installations', 'Entrance arch', 'Table centerpieces'],
  },
  {
    categoryName: 'Decoration',
    name: 'Platinum Package',
    description: 'Luxury event transformation',
    price: 3500,
    duration: 'Full decoration service',
    features: ['Bespoke decoration design', 'Professional lighting design', 'Luxury floral arrangements', 'Theme implementation', 'Setup & breakdown', 'Decorator consultation'],
  },
  // DJ & Music packages
  {
    categoryName: 'DJ & Music',
    name: 'Silver Package',
    description: 'DJ with basic sound',
    price: 600,
    duration: '4 hours',
    features: ['DJ service', 'Sound system', '200+ song requests', 'MC services'],
  },
  {
    categoryName: 'DJ & Music',
    name: 'Gold Package',
    description: 'Professional DJ with full setup',
    price: 1200,
    duration: '6 hours',
    features: ['Professional DJ', 'Premium sound system', 'Lighting', 'MC services', 'Custom playlist'],
  },
  {
    categoryName: 'DJ & Music',
    name: 'Platinum Package',
    description: 'Premium DJ with live band option',
    price: 2500,
    duration: '8 hours',
    features: ['Professional DJ', 'Premium sound & lighting', 'Live band option', 'MC services', 'Custom entertainment'],
  },
];

const demoUsers = [
  {
    email: 'admin@eventbook.com',
    password: 'Admin123!',
    name: 'Admin User',
    role: 'admin',
  },
  {
    email: 'customer1@example.com',
    password: 'Password123!',
    name: 'Sarah Johnson',
    role: 'user',
  },
  {
    email: 'customer2@example.com',
    password: 'Password123!',
    name: 'Michael Chen',
    role: 'user',
  },
  {
    email: 'customer3@example.com',
    password: 'Password123!',
    name: 'Emily Rodriguez',
    role: 'user',
  },
];

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Package.deleteMany({});
    await Booking.deleteMany({});

    // Seed users
    const createdUsers = await User.insertMany(demoUsers);

    // Seed categories
    const createdCategories = await Category.insertMany(demoCategories);

    // Seed packages
    const packagesToCreate = demoPackages.map((pkg) => {
      const category = createdCategories.find((c) => c.name === pkg.categoryName);
      return {
        categoryId: category?._id,
        name: pkg.name,
        description: pkg.description,
        price: pkg.price,
        duration: pkg.duration,
        features: pkg.features,
      };
    });

    const createdPackages = await Package.insertMany(packagesToCreate);

    // Create sample bookings
    const sampleBookings = [
      {
        userId: createdUsers[1]._id,
        packageId: createdPackages[0]._id,
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah@example.com',
        customerPhone: '555-0101',
        bookingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'confirmed',
        notes: 'Looking forward to our wedding!',
      },
      {
        userId: createdUsers[2]._id,
        packageId: createdPackages[3]._id,
        customerName: 'Michael Chen',
        customerEmail: 'michael@example.com',
        customerPhone: '555-0102',
        bookingDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        status: 'confirmed',
        notes: 'Birthday party for 50 guests',
      },
      {
        userId: createdUsers[3]._id,
        packageId: createdPackages[7]._id,
        customerName: 'Emily Rodriguez',
        customerEmail: 'emily@example.com',
        customerPhone: '555-0103',
        bookingDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        status: 'pending',
        notes: 'Professional photo session for family portrait',
      },
    ];

    const createdBookings = await Booking.insertMany(sampleBookings);

    return NextResponse.json(
      {
        success: true,
        message: 'Database seeded successfully',
        data: {
          users: createdUsers.length,
          categories: createdCategories.length,
          packages: createdPackages.length,
          bookings: createdBookings.length,
          credentials: {
            admin: { email: 'admin@eventbook.com', password: 'Admin123!' },
            customer1: { email: 'customer1@example.com', password: 'Password123!' },
            customer2: { email: 'customer2@example.com', password: 'Password123!' },
            customer3: { email: 'customer3@example.com', password: 'Password123!' },
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, error: 'Seeding failed', details: String(error) },
      { status: 500 }
    );
  }
}
