
'use client';

import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-bold">PlantMD</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {pathname !== '/dashboard' && (
              <Button asChild>
                <Link href="/dashboard">Launch App</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
