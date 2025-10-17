
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Leaf, Menu, X, Camera, BookOpen, Users, Phone, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Diagnose',
    href: '/dashboard',
    icon: Camera,
    description: 'AI-powered plant diagnosis'
  },
  {
    name: 'Plant Library',
    href: '/plant-library', 
    icon: Leaf,
    description: 'Browse plant care information'
  },
  {
    name: 'Care Guide',
    href: '/care-guide',
    icon: BookOpen,
    description: 'Complete plant care guide'
  },
  {
    name: 'About',
    href: '/about',
    icon: Users,
    description: 'Learn about PlantMD'
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: Phone,
    description: 'Get in touch with us'
  }
];

export function AppHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            PlantMD
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800",
                  isActive 
                    ? "text-green-600 bg-green-50 dark:bg-gray-800" 
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Account</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="text-gray-500">Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {pathname !== '/dashboard' && (
            <Button asChild className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Link href="/dashboard">
                <Camera className="h-4 w-4 mr-2" />
                Try PlantMD
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Link href="/" className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded flex items-center justify-center">
                      <Leaf className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      PlantMD
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              
              <div className="mt-8 space-y-4">
                {navigation.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg transition-colors",
                        isActive 
                          ? "bg-green-50 text-green-600 border border-green-200" 
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      <IconComponent className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </Link>
                  );
                })}
                
                <div className="pt-4 border-t space-y-3">
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    <User className="h-5 w-5" />
                    <span>My Profile</span>
                  </Link>
                  
                  <Button asChild className="w-full">
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Camera className="h-4 w-4 mr-2" />
                      Try PlantMD
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
