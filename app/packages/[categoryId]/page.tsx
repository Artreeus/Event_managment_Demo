'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader, Check } from 'lucide-react';
import Header from '@/components/Header';

interface Package {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  image: string;
}

export default function PackagesPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;
  const [packages, setPackages] = useState<Package[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`/api/packages?categoryId=${categoryId}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setPackages(data);

        // Fetch category name
        const catResponse = await fetch(`/api/categories`);
        if (catResponse.ok) {
          const categories = await catResponse.json();
          const cat = categories.find((c: any) => c._id === categoryId);
          if (cat) setCategoryName(cat.name);
        }
      } catch (err) {
        setError('Failed to load packages');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, [categoryId]);

  return (
    <main>
      <Header />
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <Link href="/categories" className="text-blue-600 hover:underline mb-4 inline-block">
              ← Back to Categories
            </Link>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              {categoryName} Packages
            </h1>
            <p className="text-lg text-slate-600">
              Select a package that fits your needs
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
          ) : packages.length === 0 ? (
            <div className="bg-slate-100 rounded-lg p-8 text-center">
              <p className="text-slate-600">No packages available for this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <Card key={pkg._id} className="border-slate-200 flex flex-col">
                  {pkg.image && (
                    <div className="h-48 bg-slate-200 rounded-t-lg overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-slate-900">{pkg.name}</CardTitle>
                    {pkg.description && (
                      <CardDescription>{pkg.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="mb-6">
                      <div className="text-3xl font-bold text-slate-900 mb-2">
                        ${pkg.price}
                      </div>
                      {pkg.duration && (
                        <Badge variant="secondary" className="text-slate-600">
                          {pkg.duration}
                        </Badge>
                      )}
                    </div>

                    {pkg.features && pkg.features.length > 0 && (
                      <div className="mb-6 flex-1">
                        <h4 className="font-semibold text-slate-900 mb-3">Includes:</h4>
                        <ul className="space-y-2">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                              <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Link href={`/book/${pkg._id}`} className="w-full">
                      <Button className="w-full">Book Now</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
