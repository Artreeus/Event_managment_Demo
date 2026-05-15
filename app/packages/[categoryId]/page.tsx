'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader, Check, ArrowLeft, Clock, Star, Package } from 'lucide-react';
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
    const fetchAll = async () => {
      try {
        const [pkgRes, catRes] = await Promise.all([
          fetch(`/api/packages?categoryId=${categoryId}`),
          fetch('/api/categories'),
        ]);
        if (!pkgRes.ok) throw new Error('Failed to fetch');
        const pkgData = await pkgRes.json();
        setPackages(pkgData);
        if (catRes.ok) {
          const cats = await catRes.json();
          const cat = cats.find((c: any) => c._id === categoryId);
          if (cat) setCategoryName(cat.name);
        }
      } catch (err) {
        setError('Failed to load packages');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, [categoryId]);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span>{categoryName || 'Packages'}</span>
          </div>
          <Link href="/categories" className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm mb-5">
            <ArrowLeft className="w-4 h-4" />
            Back to Categories
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            {categoryName ? `${categoryName} Packages` : 'Packages'}
          </h1>
          <p className="text-slate-300 text-lg">Choose the package that fits your needs and budget</p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-14 bg-slate-50 dark:bg-gray-950 min-h-[50vh]">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
              <p className="text-slate-500 dark:text-gray-400 text-sm">Loading packages...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-red-600 dark:text-red-400 text-center">
              <p className="font-medium">{error}</p>
            </div>
          ) : packages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-16 h-16 bg-slate-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                <Package className="w-8 h-8 text-slate-400 dark:text-gray-500" />
              </div>
              <div className="text-center">
                <p className="text-slate-700 dark:text-gray-300 font-medium">No packages available yet</p>
                <p className="text-slate-400 dark:text-gray-500 text-sm mt-1">Check back soon</p>
              </div>
              <Link href="/categories">
                <Button variant="outline" size="sm" className="dark:border-gray-700 dark:text-gray-300">Back to Categories</Button>
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">
                {packages.length} {packages.length === 1 ? 'package' : 'packages'} available
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg, idx) => {
                  const isPopular = idx === 1 && packages.length >= 2;
                  return (
                    <div
                      key={pkg._id}
                      className={`relative bg-white dark:bg-gray-800 rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl ${
                        isPopular
                          ? 'border-blue-500 shadow-lg shadow-blue-100 dark:shadow-blue-950/40'
                          : 'border-slate-200 dark:border-gray-700 hover:shadow-slate-200/80 dark:hover:shadow-black/20'
                      }`}
                    >
                      {isPopular && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                            <Star className="w-3 h-3 fill-white" />
                            Most Popular
                          </span>
                        </div>
                      )}
                      <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-600 overflow-hidden flex-shrink-0">
                        {pkg.image ? (
                          <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-12 h-12 text-slate-400 dark:text-gray-500" />
                          </div>
                        )}
                        {isPopular && <div className="absolute inset-0 bg-blue-600/10" />}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="mb-5">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1.5">{pkg.name}</h3>
                          {pkg.description && (
                            <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">{pkg.description}</p>
                          )}
                        </div>
                        <div className="flex items-end gap-2 mb-4">
                          <span className="text-4xl font-bold text-slate-900 dark:text-white">${pkg.price}</span>
                          {pkg.duration && (
                            <div className="flex items-center gap-1 text-slate-500 dark:text-gray-400 text-sm mb-1">
                              <Clock className="w-3.5 h-3.5" />
                              {pkg.duration}
                            </div>
                          )}
                        </div>
                        <div className="border-t border-slate-100 dark:border-gray-700 mb-4" />
                        {pkg.features && pkg.features.length > 0 && (
                          <div className="mb-6 flex-1">
                            <p className="text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-3">What&apos;s included</p>
                            <ul className="space-y-2.5">
                              {pkg.features.map((feature, fIdx) => (
                                <li key={fIdx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-gray-300">
                                  <div className="w-5 h-5 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                                  </div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <Link href={`/book/${pkg._id}`} className="mt-auto">
                          <Button className={`w-full ${isPopular ? 'bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-200 dark:shadow-blue-900' : 'bg-slate-900 dark:bg-gray-700 hover:bg-slate-800 dark:hover:bg-gray-600'}`}>
                            Book Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
