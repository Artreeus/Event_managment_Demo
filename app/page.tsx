import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Calendar, CheckCircle, Users } from 'lucide-react';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Book Your Perfect Event
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Discover and book professional event services with ease. From consultations to full-scale events, we&apos;ve got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/categories">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Services
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Why Choose EventBook
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-slate-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-slate-900">Easy Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Simple and intuitive booking process. Select your service, choose your date, and confirm in minutes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-slate-900">Verified Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  All our service providers are verified and vetted to ensure quality and reliability.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-slate-900">24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Our dedicated support team is available around the clock to help with any questions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Book Your Event?</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Start browsing our wide selection of professional services and find the perfect option for your needs.
          </p>
          <Link href="/categories">
            <Button size="lg" variant="secondary">
              Explore Services
            </Button>
          </Link>
        </div>
      </section>

      {/* Demo Data Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Getting Started</h2>
          <p className="text-lg text-slate-600 mb-8">
            New to EventBook? Load our demo data to see the platform in action with sample categories, packages, and bookings.
          </p>
          <Link href="/seed-db">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Load Demo Data
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
