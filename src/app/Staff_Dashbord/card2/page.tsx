'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const [teacher, setTeacher] = useState<any>(null)

  useEffect(() => {
    const storedTeacher = localStorage.getItem('teacher')
    if (!storedTeacher) {
      router.push('/loginTeacher') // redirect if not logged in
    } else {
      setTeacher(JSON.parse(storedTeacher))
    }
  }, [router])

  if (!teacher) {
    return <p className="text-center mt-10 text-gray-500">Loading dashboard...</p>
  }

  return (
    <div className="max-w-4xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {/* Add Payment Card */}
      <div
        className="cursor-pointer border border-red-600 hover:border-sky-400 hover:text-sky-700 p-6 rounded-2xl shadow-lg text-center transition-transform hover:scale-105"
        onClick={() => router.push('/payment/add')}
      >
        <h2 className="text-xl font-bold mb-2">ADD PAYMENT</h2>
        <p className="text-gray-600">Manage all payment tasks here</p>
      </div>

      {/* All Payments Card */}
      <div
        className="cursor-pointer border border-red-600 hover:border-sky-400 hover:text-sky-700 p-6 rounded-2xl shadow-lg text-center transition-transform hover:scale-105"
        onClick={() => router.push('/payment/print')}
      >
        <h2 className="text-xl font-bold mb-2">ALL PAYMENTS</h2>
        <p className="text-gray-600">View and print all student payments</p>
      </div>

      {/* Edit Payment Card */}
      <div
        className="cursor-pointer border border-red-600 hover:border-sky-400 hover:text-sky-700 p-6 rounded-2xl shadow-lg text-center transition-transform hover:scale-105"
        onClick={() => router.push('/payment/Edit_payment')}
      >
        <h2 className="text-xl font-bold mb-2">EDIT PAYMENT</h2>
        <p className="text-gray-600">Update or modify existing payments</p>
      </div>
    </div>
  )
}
