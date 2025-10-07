'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Menu } from 'lucide-react'

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Clients', href: '/clients' },
  { name: 'Resources', href: '/resources' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo - Optimized for mobile */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors">THE BOARD MAN</span>
              <span className="text-xs text-blue-200 hidden sm:block">ACCOUNTING & AUDITORS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-200 hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
              <Link href="/booking">Book Consultation</Link>
            </Button>
          </div>

          {/* Mobile CTA + Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs px-3 py-1 h-8">
              <Link href="/booking">Book</Link>
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted p-2 h-8 w-8">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px] bg-background border-border">
                <SheetHeader className="text-left">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex flex-col pt-4">
                    <span className="text-lg font-bold text-white">THE BOARD MAN</span>
                    <span className="text-sm text-blue-200">ACCOUNTING & AUDITORS</span>
                  </div>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  <Separator className="bg-border" />
                  
                  <nav className="flex flex-col space-y-1">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center py-3 px-4 text-sm font-medium text-slate-200 hover:text-white hover:bg-muted/50 rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  
                  <Separator className="bg-border" />
                  
                  <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                    <Link href="/booking" onClick={() => setIsOpen(false)}>
                      Book Consultation
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}