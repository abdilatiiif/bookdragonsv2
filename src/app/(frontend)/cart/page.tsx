'use client'

import { useEffect, useState } from 'react'

export default function Handlekurv() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch('/my-route')
      .then((res) => res.json())
      .then(setData)
  }, [])

  return <div className="p-20">{data ? JSON.stringify(data) : 'Laster...'}</div>
}
