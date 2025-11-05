'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginTeacher() {
  const router = useRouter();
  const [teacherPhone, setTeacherPhone] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://institutemanagement3.onrender.com/teacher/teacher/");
      if (!res.ok) throw new Error("Failed to fetch teachers");
      const teachers = await res.json();

      const teacher = teachers.find(
        (t: any) => t.teacher_phone === teacherPhone && t.teacher_password === teacherPassword
      );

      if (teacher) {
        localStorage.setItem("teacher", JSON.stringify(teacher));
        router.push("/Staff_Dashbord");
      } else {
        setError("Phone number or password is incorrect");
      }
    } catch (err) {
      console.error(err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleTeacherLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Teacher Login
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Phone Number"
          value={teacherPhone}
          onChange={(e) => setTeacherPhone(e.target.value)}
          className="w-full mb-4 p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={teacherPassword}
          onChange={(e) => setTeacherPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
