'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Student {
  id: number;
  student_id: string;
  name: string;
  Phone_number: number;
  department: string;
  year: number;
  email: string;
  college: string;
  password: string;
  img?: string | null;
}

interface Attendance {
  id: number;
  date: string;
  status: 'Present' | 'Absent';
  student: number;
}

const API_BASE_URL = 'https://institutemanagement3.onrender.com/';

export default function StudentPortal() {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [searchId, setSearchId] = useState('');
  const [searchPassword, setSearchPassword] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [monthFilter, setMonthFilter] = useState(new Date().toISOString().split('T')[0].slice(0, 7)); // YYYY-MM
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [currentPasswordCheck, setCurrentPasswordCheck] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

  const router = useRouter();
    // ✅ Check if teacher is logged in


  useEffect(() => {
    fetch(`${API_BASE_URL}/payment/students/`)
      .then(res => res.json())
      .then((data: Student[]) => setStudents(data))
      .catch(err => console.error('Error fetching students:', err));

    fetch(`${API_BASE_URL}/attendance/attendance/`)
      .then(res => res.json())
      .then((data: Attendance[]) => setAttendance(data))
      .catch(err => console.error('Error fetching attendance:', err));
  }, []);

  const handleBack = () => router.back();

  const handleSearch = () => {
    const found = students.find(
      s => s.student_id === searchId.trim() && s.password === searchPassword.trim()
    );
    if (!found) alert('No student found with that ID and password!');
    setSelectedStudent(found || null);
    setIsUpdatingPassword(false);
    setCurrentPasswordCheck('');
    setNewPassword('');
  };

  const handleStartUpdate = () => setIsUpdatingPassword(true);
  const handleCancelUpdate = () => setIsUpdatingPassword(false);

  const handleSavePassword = async () => {
    if (!selectedStudent) return;
    if (currentPasswordCheck.trim() !== selectedStudent.password) {
      alert('❌ Current password is incorrect!');
      return;
    }
    if (!newPassword.trim()) {
      alert('New password cannot be empty!');
      return;
    }

    const updatedStudent = { ...selectedStudent, password: newPassword };

    try {
      const res = await fetch(`${API_BASE_URL}/payment/students/${selectedStudent.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStudent),
      });
      if (res.ok) {
        alert('✅ Password updated successfully!');
        setSelectedStudent(updatedStudent);
        setIsUpdatingPassword(false);
      } else {
        alert('❌ Failed to update password.');
      }
    } catch {
      alert('❌ Network error.');
    }
  };

  // Filter attendance by selected student and month
  const filteredAttendance = selectedStudent
    ? attendance.filter(
        att =>
          att.student === selectedStudent.id &&
          att.date.slice(0, 7) === monthFilter // YYYY-MM match
      )
    : [];

  const presentCount = filteredAttendance.filter(att => att.status === 'Present').length;
  const absentCount = filteredAttendance.filter(att => att.status === 'Absent').length;

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white dark:bg-gray-900 rounded shadow relative">
      <h1 className="text-2xl font-bold mb-4 text-center">🎓 Student Portal</h1>

      <button
        onClick={handleBack}
        className="absolute top-4 right-4 text-xl text-gray-600 hover:text-black px-2 py-1"
      >
        ✖
      </button>

      <div className="flex flex-col gap-3 mb-4">
        <input
          type="text"
          placeholder="Enter your Student ID"
          value={searchId}
          onChange={e => setSearchId(e.target.value)}
          className="px-3 py-2 border rounded dark:bg-gray-800"
        />
        <input
          type="password"
          placeholder="Enter your Password"
          value={searchPassword}
          onChange={e => setSearchPassword(e.target.value)}
          className="px-3 py-2 border rounded dark:bg-gray-800"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login & View
        </button>
      </div>

      {selectedStudent && (
        <div className="border rounded p-4 dark:border-gray-700 text-center">
          <h2 className="text-lg font-semibold mb-2">👤 {selectedStudent.name}</h2>

          {selectedStudent.img ? (
            <img
              src={selectedStudent.img}
              alt={selectedStudent.name}
              className="mx-auto mb-4 rounded w-32 h-32 object-cover cursor-pointer hover:opacity-80"
              onClick={() => setModalImageUrl(selectedStudent.img!)}
            />
          ) : (
            <p className="mb-4 text-gray-500">No profile image available.</p>
          )}

          <p><strong>ID:</strong> {selectedStudent.student_id}</p>
          <p><strong>Phone:</strong> {selectedStudent.Phone_number}</p>
          <p><strong>Department:</strong> {selectedStudent.department}</p>
          <p><strong>Year:</strong> {selectedStudent.year}</p>
          <p><strong>Email:</strong> {selectedStudent.email}</p>
          <p><strong>College:</strong> {selectedStudent.college}</p>

          {/* Month filter */}
          <div className="mt-4">
            <label className="block mb-1 font-medium">📆 Select Month</label>
            <input
              type="month"
              value={monthFilter}
              onChange={e => setMonthFilter(e.target.value)}
              className="px-3 py-2 border rounded dark:bg-gray-800"
            />
          </div>
                <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <Link href="/attendence "className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-600" >
          attendence record
        </Link>
         <Link href="/payment " className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600"> payment record</Link>

      </div>

          {/* Attendance summary */}
          <div className="mt-4 text-left">
            <p><strong>Total Classes in Month:</strong> {filteredAttendance.length}</p>
            <p className="text-green-600"><strong>Present:</strong> {presentCount}</p>
            <p className="text-red-600"><strong>Absent:</strong> {absentCount}</p>
          </div>

          {!isUpdatingPassword ? (
            <button
              onClick={handleStartUpdate}
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Update Password
            </button>
          ) : (
            <div className="mt-4 text-left">
              <input
                type="password"
                placeholder="Enter current password"
                value={currentPasswordCheck}
                onChange={e => setCurrentPasswordCheck(e.target.value)}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 mb-2"
              />
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 mb-2"
              />
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleSavePassword}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelUpdate}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {modalImageUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative">
            <button
              onClick={() => setModalImageUrl(null)}
              className="absolute top-2 right-2 bg-white text-black rounded-full px-2 py-1 font-bold hover:bg-gray-200"
            >
              ✕
            </button>
            <img
              src={modalImageUrl}
              alt="Profile enlarged"
              className="max-w-full max-h-screen rounded"
            />
          </div>
        </div>
      )}

    </div>
  );
}
