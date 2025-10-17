import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Leaf, BrainCircuit } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/10 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl xl:text-6xl/none">
                    Keep Your Plants Thriving with PlantMD
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Snap a photo, get an instant AI diagnosis, and receive expert
                    remedy tips to bring your plants back to health.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">Get Started Now</Link>
                  </Button>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=2480&auto=format&fit=crop"
                width="600"
                height="600"
                alt="Hero Plant"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Why You'll Love PlantMD
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We've packed PlantMD with features to make plant care simple
                  and effective.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="text-primary" />
                    Instant AI Diagnosis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our advanced AI analyzes your plant's photo to identify
                    diseases with high accuracy in seconds.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="text-primary" />
                    Actionable Remedy Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get clear, step-by-step instructions and prevention advice
                    tailored to your plant's specific issue.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="text-primary" />
                    Track Your Plant's Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Keep a history of your diagnoses to monitor your plant's
                    recovery and progress over time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} PlantMD. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
