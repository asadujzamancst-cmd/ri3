"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Teacher {
  teacher_id: number;
  title: string;
  teacher_name: string;
  teacher_password: string;
  teacher_email: string;
  teacher_phone: string;
  teacher_address: string;
  details: string;
  image?: string | null;
}

export default function TeacherPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [title, setTitle] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");
  const [teacherAddress, setTeacherAddress] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://institutemanagement3.onrender.com/teacher/teacher/");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setTeachers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch teachers. Check backend server.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setTeacherName("");
    setTeacherPassword("");
    setTeacherEmail("");
    setTeacherPhone("");
    setTeacherAddress("");
    setDetails("");
    setImage(null);
    setEditingTeacher(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("teacher_name", teacherName);
    formData.append("teacher_password", teacherPassword);
    formData.append("teacher_email", teacherEmail);
    formData.append("teacher_phone", teacherPhone);
    formData.append("teacher_address", teacherAddress);
    formData.append("details", details);
    if (image) formData.append("image", image);

    try {
      let res: Response;
      if (editingTeacher) {
        res = await fetch(`https://institutemanagement3.onrender.com/teacher/teacher/${editingTeacher.teacher_id}/`, {
          method: "PATCH",
          body: formData,
        });
      } else {
        res = await fetch("https://institutemanagement3.onrender.com/teacher/teacher/", {
          method: "POST",
          body: formData,
        });
      }

      if (!res.ok) {
        const errData = await res.json();
        setError("Error: " + JSON.stringify(errData));
        return;
      }

      await fetchTeachers();
      resetForm();
    } catch (err) {
      console.error(err);
      setError("Network error while saving teacher.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://institutemanagement3.onrender.com/teacher/teacher/${id}/`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchTeachers();
    } catch (err) {
      console.error(err);
      setError("Delete error. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setTitle(teacher.title);
    setTeacherName(teacher.teacher_name);
    setTeacherPassword(teacher.teacher_password);
    setTeacherEmail(teacher.teacher_email);
    setTeacherPhone(teacher.teacher_phone);
    setTeacherAddress(teacher.teacher_address);
    setDetails(teacher.details);
    setImage(null);
  };
    useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      // ✅ যদি টোকেন না থাকে → login এ পাঠাবে
      router.push("/login");
    } else {
      // ✅ টোকেন থাকলে loading false → dashboard দেখাবে
      setLoading(false);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">👨‍🏫 Teacher Management</h1>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {loading && <p className="text-center mb-4">Loading...</p>}

      <form onSubmit={handleSubmit} className="mb-10 border p-4 rounded bg-gray-50 dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">{editingTeacher ? "Edit Teacher" : "Add New Teacher"}</h2>

        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full mb-2 p-2 border rounded" required />
        <input type="text" placeholder="Teacher Name" value={teacherName} onChange={e => setTeacherName(e.target.value)} className="w-full mb-2 p-2 border rounded" required />
        <input type="password" placeholder="Password" value={teacherPassword} onChange={e => setTeacherPassword(e.target.value)} className="w-full mb-2 p-2 border rounded" required />
        <input type="email" placeholder="Email" value={teacherEmail} onChange={e => setTeacherEmail(e.target.value)} className="w-full mb-2 p-2 border rounded" required />
        <input type="text" placeholder="Phone" value={teacherPhone} onChange={e => setTeacherPhone(e.target.value)} className="w-full mb-2 p-2 border rounded" required />
        <input type="text" placeholder="Address" value={teacherAddress} onChange={e => setTeacherAddress(e.target.value)} className="w-full mb-2 p-2 border rounded" required />

        <textarea placeholder="Details" value={details} onChange={e => setDetails(e.target.value)} rows={4} className="w-full mb-2 p-2 border rounded resize-none" required />

        <label className="block mb-1 font-medium">Image (optional):</label>
        <input type="file" accept="image/*" onChange={e => { if(e.target.files && e.target.files.length>0) setImage(e.target.files[0]); }} className="mb-2" />

        <div className="flex gap-3">
          <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">{editingTeacher ? "Update" : "Add"}</button>
          {editingTeacher && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600 transition">Cancel</button>}
        </div>
      </form>

      <h2 className="text-2xl font-semibold mb-4">All Teachers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map(t => (
          <div key={t.teacher_id} className="border rounded p-4 bg-gray-100 dark:bg-gray-800 shadow">
            <h3 className="text-lg font-bold">{t.title}</h3>
            <p className="font-medium mb-1">👨‍🏫 {t.teacher_name}</p>
            <p className="text-sm mb-1">🔑 {t.teacher_password}</p>
            <p className="text-sm mb-1">✉️ {t.teacher_email}</p>
            <p className="text-sm mb-1">📞 {t.teacher_phone}</p>
            <p className="text-sm mb-1">🏠 {t.teacher_address}</p>
            <p className="text-sm mb-2">{t.details}</p>
            {t.image && <img src={`https://institutemanagement3.onrender.com/${t.image}`} alt={t.teacher_name} className="w-full h-40 object-cover mb-2 rounded border hover:opacity-80 transition" />}
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(t)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
              <button onClick={() => handleDelete(t.teacher_id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
