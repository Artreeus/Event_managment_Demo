import { connectDB } from '@/lib/mongodb';
import { Category } from '@/lib/models/Category';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({ active: true }).sort('displayOrder');
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await connectDB();

    const category = new Category(body);
    await category.save();

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
