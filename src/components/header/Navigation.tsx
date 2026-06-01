'use client'

import { NavigationDesktop } from './NavigationDesktop'
import { NavigationMenuMobile } from './NavigationMenuMobile'

export function Navigation() {
  return (
    <div className="allPages fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-center">
      <NavigationDesktop />
      <NavigationMenuMobile />
    </div>
  )
}
