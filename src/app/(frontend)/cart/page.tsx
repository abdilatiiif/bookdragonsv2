'use client'

import Kurv from '@/components/handlekurv/Kurv'
import BestillingsForm, { type CartItem } from '@/components/handlekurv/BestillingsForm'
import { useEffect, useState } from 'react'

const CART_KEY = 'cart'

export default function Handlekurv() {
  const [items, setItems] = useState<CartItem[]>([])
  const [harLastetKurv, setHarLastetKurv] = useState(false)

  useEffect(() => {
    try {
      const lagretKurv = localStorage.getItem(CART_KEY)
      const dataFraKurv = lagretKurv ? JSON.parse(lagretKurv) : []

      if (Array.isArray(dataFraKurv)) {
        setItems(dataFraKurv as CartItem[])
      } else {
        setItems([])
      }
    } catch {
      setItems([])
    } finally {
      setHarLastetKurv(true)
    }
  }, [])

  useEffect(() => {
    if (!harLastetKurv) return
    localStorage.setItem(CART_KEY, JSON.stringify(items))
    console.log('Handlekurv oppdatert:', items)
  }, [harLastetKurv, items])

  // beregninger for total antall varer og total pris
  const { totalItems, totalPrice } = items.reduce(
    (sum, item) => {
      const antall = Number(item.quantity) || 1
      return {
        totalItems: sum.totalItems + antall,
        totalPrice: sum.totalPrice + (Number(item.price) || 0) * antall,
      }
    },
    { totalItems: 0, totalPrice: 0 },
  )

  console.log('Total antall varer i kurven:', totalItems)
  console.log('Total pris for varene i kurven:', totalPrice)

  // handlekurv-funksjoner
  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }
  const tømkurv = () => {
    setItems([])
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-28">
      <h1 className="mb-6 text-3xl font-bold">Handlekurv</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
          {!items.length ? (
            <Kurv />
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-3 rounded-lg border border-black/10 p-3 sm:flex-row"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-24 w-full rounded-md object-cover sm:w-20"
                  />

                  <div className="flex w-full flex-col justify-between gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold">{item.title}</p>
                      <p className="font-bold">
                        {(Number(item.price) || 0) * (Number(item.quantity) || 1)} kr
                      </p>
                      <p className="text-sm text-gray-500">Antall: {item.quantity || 1}</p>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        Fjern
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <BestillingsForm
          items={items}
          totalItems={totalItems}
          totalPrice={totalPrice}
          tømkurv={tømkurv}
        />
      </div>
    </div>
  )
}
