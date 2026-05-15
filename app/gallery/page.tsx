'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { ArrowRight, Camera, ZoomIn, X } from 'lucide-react';

const categories = ['All', 'Weddings', 'Corporate', 'Birthday', 'Conferences', 'Galas', 'Outdoor'];

const galleryItems = [
  { id: 1, category: 'Weddings', title: 'Elegant Garden Wedding', location: 'Central Park, NY', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', span: 'row-span-2' },
  { id: 2, category: 'Corporate', title: 'Annual Tech Summit', location: 'Javits Center, NY', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', span: '' },
  { id: 3, category: 'Birthday', title: 'Rooftop Birthday Bash', location: 'The Standard, NY', img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', span: '' },
  { id: 4, category: 'Galas', title: 'Charity Gala Dinner', location: 'Plaza Hotel, NY', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', span: 'row-span-2' },
  { id: 5, category: 'Weddings', title: 'Beachside Ceremony', location: 'The Hamptons, NY', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80', span: '' },
  { id: 6, category: 'Outdoor', title: 'Summer Garden Party', location: 'Brooklyn Botanic Garden', img: 'https://images.unsplash.com/photo-1496843916299-590492c751f4?w=800&q=80', span: '' },
  { id: 7, category: 'Conferences', title: 'Leadership Conference', location: 'Times Square Hotel', img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&q=80', span: 'row-span-2' },
  { id: 8, category: 'Birthday', title: 'Sweet Sixteen Party', location: 'Brooklyn, NY', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', span: '' },
  { id: 9, category: 'Corporate', title: 'Product Launch Event', location: 'SoHo, NY', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80', span: '' },
  { id: 10, category: 'Weddings', title: 'Indoor Cathedral Wedding', location: 'St. Patrick\'s Cathedral', img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80', span: '' },
  { id: 11, category: 'Galas', title: 'Art Foundation Gala', location: 'MoMA, NY', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', span: '' },
  { id: 12, category: 'Outdoor', title: 'Festival in the Park', location: 'Central Park', img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80', span: 'row-span-2' },
  { id: 13, category: 'Corporate', title: 'Office Holiday Party', location: 'Midtown Manhattan', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80', span: '' },
  { id: 14, category: 'Conferences', title: 'Design Expo 2024', location: 'Javits Center', img: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80', span: '' },
  { id: 15, category: 'Birthday', title: '50th Anniversary Dinner', location: 'Per Se Restaurant, NY', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', span: '' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<(typeof galleryItems)[0] | null>(null);

  const filtered = activeCategory === 'All' ? galleryItems : galleryItems.filter((i) => i.category === activeCategory);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span><span>Gallery</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 text-sm text-blue-300 mb-5">
                <Camera className="w-4 h-4" />Real Events, Real Moments
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Event Gallery</h1>
              <p className="text-xl text-slate-300">Browse through hundreds of breathtaking events we&apos;ve helped bring to life.</p>
            </div>
            <Link href="/categories">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white px-6 flex-shrink-0">
                Book Your Event <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-12 bg-slate-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-sm text-slate-500 dark:text-gray-400 self-center">{filtered.length} photos</span>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setLightbox(item)}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-semibold text-blue-300 bg-blue-600/30 border border-blue-400/30 px-2 py-0.5 rounded-full mb-2 inline-block">
                      {item.category}
                    </span>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-slate-300 text-xs mt-0.5">{item.location}</p>
                  </div>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white dark:bg-gray-900 border-t border-slate-100 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">Ready to Create Your Moment?</h2>
          <p className="text-slate-500 dark:text-gray-400 mb-7 max-w-md mx-auto">Your event could be the next one featured here. Let us help you create something unforgettable.</p>
          <Link href="/categories">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
              Start Planning <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white flex items-center gap-2 text-sm transition-colors"
            >
              <X className="w-5 h-5" /> Close
            </button>
            <img src={lightbox.img} alt={lightbox.title} className="w-full rounded-2xl max-h-[75vh] object-cover" />
            <div className="mt-4 text-center">
              <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">{lightbox.category}</span>
              <p className="text-white font-bold text-xl mt-1">{lightbox.title}</p>
              <p className="text-slate-400 text-sm mt-0.5">{lightbox.location}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
