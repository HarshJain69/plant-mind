import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Leaf, BrainCircuit, Camera, Shield, Award, Star, ArrowRight, Sparkles, Heart, Users, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/20 dark:via-green-950/20 dark:to-teal-950/20">
          <div className="absolute inset-0 bg-grid-black/[0.02] bg-grid-16" />
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-300/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-8 lg:grid-cols-[1fr_500px] lg:gap-16 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-6 animate-fade-in">
                <div className="space-y-4">
                  <Badge variant="secondary" className="w-fit bg-green-100 text-green-700 border-green-200">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI-Powered Plant Care
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl xl:text-7xl/none bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Your Plants' Personal Doctor
                  </h1>
                  <p className="max-w-[600px] text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
                    Transform your plant care with AI-powered diagnosis. Snap a photo, get instant expert analysis, and receive personalized care recommendations to keep your green friends thriving.
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <Link href="/dashboard">
                      <Camera className="w-4 h-4 mr-2 group-hover:rotate-6 transition-transform" />
                      Start Diagnosis
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-green-200 hover:bg-green-50">
                    <Link href="/plant-library">
                      <Leaf className="w-4 h-4 mr-2" />
                      Explore Plants
                    </Link>
                  </Button>
                </div>
                
                {/* Stats */}
                <div className="flex gap-8 pt-6 border-t border-green-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">10K+</div>
                    <div className="text-sm text-gray-600">Plants Diagnosed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">98%</div>
                    <div className="text-sm text-gray-600">Accuracy Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">5K+</div>
                    <div className="text-sm text-gray-600">Happy Users</div>
                  </div>
                </div>
              </div>
              
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-2xl opacity-20 animate-pulse" />
                <img
                  src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=2480&auto=format&fit=crop"
                  width="600"
                  height="600"
                  alt="Hero Plant"
                  className="relative mx-auto aspect-square overflow-hidden rounded-2xl object-cover shadow-2xl border border-green-100 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg animate-bounce">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <Badge variant="outline" className="border-green-200 text-green-700">
                Key Features
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Why Plant Parents Love PlantMD
              </h2>
              <p className="max-w-[900px] text-gray-600 dark:text-gray-300 text-lg md:text-xl/relaxed">
                Cutting-edge AI technology meets botanical expertise to give you the ultimate plant care experience.
              </p>
            </div>
            
            <div className="mx-auto grid max-w-6xl gap-8 py-12 lg:grid-cols-3">
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-green-100 hover:border-green-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BrainCircuit className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">
                    Instant AI Diagnosis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Our advanced AI analyzes your plant's photo using machine learning to identify diseases, pests, and nutrient deficiencies with 98% accuracy in seconds.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-green-100 hover:border-green-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">
                    Expert Remedy Solutions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Get personalized, step-by-step treatment plans with natural remedies, organic solutions, and prevention strategies tailored to your specific plant.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-green-100 hover:border-green-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">
                    Health Tracking & Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Monitor your plant's recovery journey with detailed analytics, progress photos, and health trends to become a better plant parent.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4">
                Three Simple Steps to Healthier Plants
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Getting expert plant care advice has never been easier
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                    <Camera className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Snap a Photo</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Take a clear photo of your plant's leaves, stems, or affected areas using your smartphone.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                    <BrainCircuit className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our advanced AI instantly analyzes your photo and identifies potential issues with high accuracy.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Get Solutions</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Receive personalized care instructions and remedy recommendations to nurse your plant back to health.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4">
                Loved by Plant Parents Everywhere
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Join thousands of happy plant parents who've transformed their plant care with PlantMD
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 border-green-100">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                    "PlantMD saved my fiddle leaf fig! The AI diagnosed root rot before I even noticed, and the remedy tips worked perfectly. My plant is thriving now!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                      S
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">Sarah Johnson</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Plant Enthusiast</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-blue-100">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                    "As a beginner, PlantMD has been my plant care mentor. The detailed explanations help me understand what my plants need. Highly recommended!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      M
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">Mike Chen</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">New Plant Parent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 border-orange-100">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                    "The accuracy is incredible! PlantMD identified a pest issue I missed completely. The organic treatment suggestions worked like magic."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                      E
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">Emily Rodriguez</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Garden Expert</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center text-white">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                  Ready to Become a Plant Care Expert?
                </h2>
                <p className="max-w-[900px] text-green-100 text-lg md:text-xl">
                  Join thousands of plant parents who've transformed their green thumb with AI-powered plant care.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button asChild size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50 shadow-lg">
                  <Link href="/dashboard">
                    <Camera className="w-4 h-4 mr-2" />
                    Start Your First Diagnosis
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                  <Link href="/plant-library">
                    <Leaf className="w-4 h-4 mr-2" />
                    Browse Plant Library
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-green-400" />
                <span className="font-bold text-xl">PlantMD</span>
              </Link>
              <p className="text-gray-400 text-sm">
                AI-powered plant care for healthier, happier plants. Your green thumb's best friend.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/dashboard" className="hover:text-green-400 transition-colors">Diagnosis</Link></li>
                <li><Link href="/plant-library" className="hover:text-green-400 transition-colors">Plant Library</Link></li>
                <li><Link href="/care-guide" className="hover:text-green-400 transition-colors">Care Guide</Link></li>
                <li><Link href="/profile" className="hover:text-green-400 transition-colors">My Plants</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-green-400 transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-green-400 transition-colors">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-green-400 transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-green-400 transition-colors">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/help" className="hover:text-green-400 transition-colors">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-green-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/api" className="hover:text-green-400 transition-colors">API Docs</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} PlantMD. All rights reserved. Made with ❤️ for plant lovers.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Badge variant="secondary" className="bg-green-900 text-green-300">
                <Award className="w-3 h-3 mr-1" />
                98% Accuracy
              </Badge>
              <Badge variant="secondary" className="bg-blue-900 text-blue-300">
                <Users className="w-3 h-3 mr-1" />
                10K+ Users
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
