'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NavigationDesktop } from './NavigationDesktop'
import { NavigationMenuMobile } from './NavigationMenuMobile'
import { ShoppingCart, Users } from 'lucide-react'

const CART_KEY = 'cart' // nøkkel for å hente data fra localStorage
export function Navigation() {
  const [vareAntall, setVareAntall] = useState(0)

  useEffect(() => {
    try {
      const lagretKurv = localStorage.getItem(CART_KEY)
      const dataFraKurv = lagretKurv ? JSON.parse(lagretKurv) : []
      const varerIKurv = Array.isArray(dataFraKurv) ? dataFraKurv : []
      setVareAntall(varerIKurv.length)
    } catch {
      setVareAntall(0)
    }
  }, [])

  return (
    <div className="allPages fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-center">
      <Link
        href="/cart"
        className="absolute right-4 hidden items-center gap-2 rounded-full border border-black/10 bg-white/90 px-4 py-2 text-sm font-semibold shadow-sm transition-colors hover:bg-white md:flex"
      >
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />
          {vareAntall > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[11px] text-white">
              {vareAntall}
            </span>
          )}
        </div>
        <span>Handlekurv</span>
      </Link>
      <Link
        href="/ansatte"
        className=" absolute left-4 hidden items-center gap-2 rounded-full border border-black/10 bg-white/90 px-4 py-2 text-sm font-semibold shadow-sm transition-colors hover:bg-white md:flex"
      >
        <Users className="h-5 w-5" /> Ansatte
      </Link>

      <NavigationDesktop />
      <NavigationMenuMobile />
    </div>
  )
}
