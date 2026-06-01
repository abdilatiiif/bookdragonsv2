import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Bookdragons - bok for alle',
  title: 'Bookdragonsv2',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
