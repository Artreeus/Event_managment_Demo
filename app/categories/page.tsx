'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader, ArrowRight, Search, Grid3X3 } from 'lucide-react';
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
  const [search, setSearch] = useState('');

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

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span>Services</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Browse Services</h1>
              <p className="text-slate-300 text-lg">
                Explore our professional event service categories
              </p>
            </div>
            {/* Search */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 bg-slate-50 min-h-[50vh]">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
              <p className="text-slate-500 text-sm">Loading categories...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-600 text-center">
              <p className="font-medium">{error}</p>
              <p className="text-sm mt-1 text-red-400">Please try refreshing the page</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center">
                <Grid3X3 className="w-8 h-8 text-slate-400" />
              </div>
              <div className="text-center">
                <p className="text-slate-700 font-medium">
                  {search ? 'No categories match your search' : 'No categories available yet'}
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  {search ? 'Try a different search term' : 'Check back soon for new services'}
                </p>
              </div>
              {search && (
                <Button variant="outline" size="sm" onClick={() => setSearch('')}>
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500 mb-6">
                {filtered.length} {filtered.length === 1 ? 'category' : 'categories'} found
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((category) => (
                  <Link key={category._id} href={`/packages/${category._id}`} className="group block">
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/80 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-52 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden flex-shrink-0">
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Grid3X3 className="w-12 h-12 text-slate-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1 line-clamp-2">
                            {category.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mt-auto">
                          Browse Packages
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
