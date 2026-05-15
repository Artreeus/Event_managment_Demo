'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import Header from '@/components/Header';

interface Category {
  _id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError('Failed to load categories');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main>
      <Header />
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Browse Services
            </h1>
            <p className="text-lg text-slate-600">
              Select a service category to get started
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
              {error}
            </div>
          ) : categories.length === 0 ? (
            <div className="bg-slate-100 rounded-lg p-8 text-center">
              <p className="text-slate-600">No categories available yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link key={category._id} href={`/packages/${category._id}`}>
                  <Card className="border-slate-200 hover:shadow-lg transition cursor-pointer h-full">
                    {category.image && (
                      <div className="h-48 bg-slate-200 rounded-t-lg overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-slate-900">{category.name}</CardTitle>
                      {category.description && (
                        <CardDescription>{category.description}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">Browse Packages</Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
