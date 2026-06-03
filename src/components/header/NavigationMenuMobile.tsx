'use client'

import 'animate.css'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { ArrowDownRight, ShoppingCart, Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import Link from 'next/link'

export function NavigationMenuMobile() {
  const navLinks = [
    { title: 'Hjem', href: '/' },
    { title: 'Bøker', href: '/books' },
  ]

  // sheet fra shadcn ui, som er en mobil meny som kommer inn fra høyre
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden fixed z-50 top-4 right-4">
        <Menu size={40} />
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>

        <Accordion type="single" collapsible className="w-full px-4" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Menu</AccordionTrigger>
            <AccordionContent className="flex items-center w-full flex-col gap-4 text-balance">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`flex slide-in-right items-center w-full border-2 rounded-lg p-2 transition-all `}
                >
                  {link.title}

                  <ArrowDownRight className="ml-2 h-4 w-4" />
                </Link>
              ))}

              <Link
                href="/cart"
                className="flex items-center w-full border-2 rounded-lg p-2 bg-blue-200 transition-all relative"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Lukk</Button>
          </SheetClose>

          <p className="text-sm text-center text-muted-foreground mt-4">
            © 2026 BookDragonsv2 -Eksamen. All rights reserved. Latif Hassan
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
