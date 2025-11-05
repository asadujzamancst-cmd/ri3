'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TeacherDashboard() {
  const router = useRouter()
  const [teacher, setTeacher] = useState<any>(null)

  useEffect(() => {
    const storedTeacher = localStorage.getItem('teacher')
    if (!storedTeacher) {
      router.push('/loginTeacher') // redirect to teacher login
    } else {
      setTeacher(JSON.parse(storedTeacher))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('teacher')
    router.push('/loginTeacher')
  }

  if (!teacher) return <p className="text-center mt-20">Loading...</p>

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {teacher.teacher_name}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="cursor-pointer border border-red-500 hover:text-sky-700 hover:border-sky-700 p-6 rounded-2xl shadow-lg text-center transition-transform hover:scale-105"
          onClick={() => router.push('/Staff_Dashbord/card')}
        >
          <h2 className="text-xl font-bold mb-2">STUDENT MANAGEMENT</h2>
          <p className="text-gray-600">Manage Student-related tasks here</p>
        </div>

        <div
          className="cursor-pointer border border-red-500 hover:text-sky-700 hover:border-sky-700 p-6 rounded-2xl shadow-lg text-center transition-transform hover:scale-105"
          onClick={() => router.push('/Staff_Dashbord/card2')}
        >
          <h2 className="text-xl font-bold mb-2">PAYMENT MANAGEMENT</h2>
          <p className="text-gray-600">Manage staff-related tasks here</p>
        </div>

        <div
          className="cursor-pointer border border-red-500 hover:text-sky-700 hover:border-sky-700 p-6 rounded-2xl shadow-lg text-center transition-transform hover:scale-105"
          onClick={() => router.push('/Staff_Dashbord/card3')}
        >
          <h2 className="text-xl font-bold mb-2">COURSE MANAGEMENT</h2>
          <p className="text-gray-600">Manage staff-related tasks here</p>
        </div>

        <div
          className="cursor-pointer border border-red-500 hover:text-sky-700 hover:border-sky-700 p-6 rounded-2xl shadow-lg text-center transition-transform hover:scale-105"
          onClick={() => router.push('/Staff_Dashbord/card4')}
        >
          <h2 className="text-xl font-bold mb-2">ATTENDANCE MANAGEMENT</h2>
          <p className="text-gray-600">Manage staff-related tasks here</p>
        </div>

                <div
          className="cursor-pointer border border-red-500 hover:text-sky-700 hover:border-sky-700 p-6 rounded-2xl shadow-lg text-center transition-transform hover:scale-105"
          onClick={() => router.push('/Staff_Dashbord/card5')}
        >
          <h2 className="text-xl font-bold mb-2">Exam MANAGEMENT</h2>
          <p className="text-gray-600">Manage staff-related tasks here</p>
        </div>



                <div
          className="cursor-pointer border border-red-500 hover:text-sky-700 hover:border-sky-700 p-6 rounded-2xl shadow-lg text-center transition-transform hover:scale-105"
          onClick={() => router.push('/Staff_Dashbord/card6')}
        >
          <h2 className="text-xl font-bold mb-2">LIbrary MANAGEMENT</h2>
          <p className="text-gray-600">Manage staff-related tasks here</p>
        </div>


                <div
          className="cursor-pointer border border-red-500 hover:text-sky-700 hover:border-sky-700 p-6 rounded-2xl shadow-lg text-center transition-transform hover:scale-105"
          onClick={() => router.push('/Staff_Dashbord/card7')}
        >
          <h2 className="text-xl font-bold mb-2">notice MANAGEMENT</h2>
          <p className="text-gray-600">Manage staff-related tasks here</p>
        </div>


                <div
          className="cursor-pointer border border-red-500 hover:text-sky-700 hover:border-sky-700 p-6 rounded-2xl shadow-lg text-center transition-transform hover:scale-105"
          onClick={() => router.push('/Staff_Dashbord/card8')}
        >
          <h2 className="text-xl font-bold mb-2">holiday MANAGEMENT</h2>
          <p className="text-gray-600">Manage staff-related tasks here</p>
        </div>


                <div
          className="cursor-pointer border border-red-500 hover:text-sky-700 hover:border-sky-700 p-6 rounded-2xl shadow-lg text-center transition-transform hover:scale-105"
          onClick={() => router.push('/Staff_Dashbord/card9')}
        >
          <h2 className="text-xl font-bold mb-2">Result MANAGEMENT</h2>
          <p className="text-gray-600">Manage staff-related tasks here</p>
        </div>

        

                <div
          className="cursor-pointer border border-red-500 hover:text-sky-700 hover:border-sky-700 p-6 rounded-2xl shadow-lg text-center transition-transform hover:scale-105"
          onClick={() => router.push('/Staff_Dashbord/card10')}
        >
          <h2 className="text-xl font-bold mb-2">Event MANAGEMENT</h2>
          <p className="text-gray-600">Manage staff-related tasks here</p>
        </div>



                <div
          className="cursor-pointer border border-red-500 hover:text-sky-700 hover:border-sky-700 p-6 rounded-2xl shadow-lg text-center transition-transform hover:scale-105"
          onClick={() => router.push('/Staff_Dashbord/card4')}
        >
          <h2 className="text-xl font-bold mb-2">ATTENDANCE MANAGEMENT</h2>
          <p className="text-gray-600">Manage staff-related tasks here</p>
        </div>

                <div
          className="cursor-pointer border border-red-500 hover:text-sky-700 hover:border-sky-700 p-6 rounded-2xl shadow-lg text-center transition-transform hover:scale-105"
          onClick={() => router.push('/Staff_Dashbord/card4')}
        >
          <h2 className="text-xl font-bold mb-2">ATTENDANCE MANAGEMENT</h2>
          <p className="text-gray-600">Manage staff-related tasks here</p>
        </div>
      </div>
    </div>
  )
}
