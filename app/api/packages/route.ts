import { connectDB } from '@/lib/mongodb';
import { Package } from '@/lib/models/Package';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    await connectDB();

    let query: any = { active: true };
    if (categoryId) {
      query.categoryId = categoryId;
    }

    const packages = await Package.find(query).sort('displayOrder');
    return NextResponse.json(packages);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await connectDB();

    const pkg = new Package(body);
    await pkg.save();

    return NextResponse.json(pkg, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create package' },
      { status: 500 }
    );
  }
}
