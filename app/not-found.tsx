import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Sparkles, Home, Search, ArrowRight, Calendar } from 'lucide-react';

const quickLinks = [
  { icon: Home, label: 'Go Home', href: '/', desc: 'Back to the main page' },
  { icon: Search, label: 'Browse Services', href: '/categories', desc: 'Explore event services' },
  { icon: Calendar, label: 'View Gallery', href: '/gallery', desc: 'See real events' },
];

export default function NotFound() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />

      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 text-sm text-blue-300 mb-6">
            <Sparkles className="w-4 h-4" />Oops — Page Not Found
          </div>
          <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/20 mb-4 leading-none">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">This Page Took the Night Off</h1>
          <p className="text-slate-300 text-lg max-w-md mx-auto mb-10">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 px-8">
                <Home className="w-4 h-4 mr-2" />Back to Home
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-white/10 hover:text-white px-8">
                Browse Services <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-center text-lg font-semibold text-slate-900 dark:text-white mb-8">
            Or try one of these popular destinations:
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {quickLinks.map(({ icon: Icon, label, href, desc }) => (
              <Link key={label} href={href} className="group block">
                <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{label}</p>
                  <p className="text-xs text-slate-500 dark:text-gray-400">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
