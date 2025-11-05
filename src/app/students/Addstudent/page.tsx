'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface NewStudent {
  student_id: string;
  name: string;
  phone_number: string;
  department: string;
  year: string;
  email: string;
  college: string;
  password: string;
  img?: File | null;
}

export default function AddStudentForm() {
  const router = useRouter();
  const [teacher, setTeacher] = useState<any>(null);
  const [formData, setFormData] = useState<NewStudent>({
    student_id: '',
    name: '',
    phone_number: '',
    department: '',
    year: '',
    email: '',
    college: '',
    password: '',
    img: null,
  });

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ✅ Check if teacher is logged in
  useEffect(() => {
    const storedTeacher = localStorage.getItem('teacher');
    if (!storedTeacher) {
      router.push('/loginTeacher');
    } else {
      setTeacher(JSON.parse(storedTeacher));
    }
  }, [router]);

  if (!teacher) {
    return <p className="text-center mt-10 text-gray-500">Loading dashboard...</p>;
  }

  // ✅ Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'img' && files) {
      setFormData((prev) => ({ ...prev, img: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Handle form submit
  const handleSubmit = async () => {
    setSuccess(null);
    setError(null);

    try {
      const data = new FormData();
      data.append('student_id', formData.student_id);
      data.append('name', formData.name);
      data.append('Phone_number', formData.phone_number);
      data.append('department', formData.department);
      data.append('year', formData.year);
      data.append('email', formData.email);
      data.append('college', formData.college);
      data.append('password', formData.password);
      if (formData.img) data.append('img', formData.img);

      const res = await fetch('https://institutemanagement3.onrender.com/payment/students/', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        setSuccess('✅ Student added successfully!');
        setFormData({
          student_id: '',
          name: '',
          phone_number: '',
          department: '',
          year: '',
          email: '',
          college: '',
          password: '',
          img: null,
        });
      } else {
        const errorData = await res.json();
        const formattedError = Object.entries(errorData)
          .map(([field, msg]) => `${field}: ${Array.isArray(msg) ? msg.join(', ') : msg}`)
          .join('; ');
        setError(`❌ Failed: ${formattedError}`);
      }
    } catch (err) {
      setError('❌ Network error');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white dark:bg-gray-900 dark:text-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">➕ Add New Student</h2>

      <div className="space-y-4">
        {[
          { name: 'student_id', placeholder: 'Student ID', type: 'text' },
          { name: 'name', placeholder: 'Full Name', type: 'text' },
          { name: 'phone_number', placeholder: 'Phone Number', type: 'text' },
          { name: 'department', placeholder: 'Department', type: 'text' },
          { name: 'year', placeholder: 'Year', type: 'text' },
          { name: 'email', placeholder: 'Email', type: 'email' },
          { name: 'college', placeholder: 'College', type: 'text' },
          { name: 'password', placeholder: 'Password', type: 'password' },
        ].map((field) => (
          <input
            key={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={(formData as any)[field.name]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 dark:bg-gray-800 dark:border-gray-600"
            required
          />
        ))}

        {/* Image Upload */}
        <div className="flex flex-col">
          <label htmlFor="img" className="text-sm text-gray-500 mb-1 dark:text-gray-400">
            Profile Image (optional)
          </label>
          <input
            id="img"
            type="file"
            name="img"
            accept="image/*"
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 cursor-pointer dark:bg-gray-800 dark:border-gray-600"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>

        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
}
