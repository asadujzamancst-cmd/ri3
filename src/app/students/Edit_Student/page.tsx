"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  img?: string;
}

export default function StudentListPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [teacher, setTeacher] = useState<any>(null);

  const [filterId, setFilterId] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const router = useRouter();

 

  // ✅ Fetch students
  const fetchStudents = async () => {
    try {
      const res = await fetch("https://institutemanagement3.onrender.com/payment/students/");
      const data = await res.json();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Filter function
  const handleFilter = () => {
    let filtered = students;

    if (filterId.trim() !== "") {
      filtered = filtered.filter((s) =>
        s.student_id.toLowerCase().includes(filterId.toLowerCase())
      );
    }
    if (filterPhone.trim() !== "") {
      filtered = filtered.filter((s) =>
        String(s.Phone_number).includes(filterPhone)
      );
    }
    if (filterDept.trim() !== "") {
      filtered = filtered.filter((s) =>
        s.department.toLowerCase().includes(filterDept.toLowerCase())
      );
    }
    setFilteredStudents(filtered);
  };

  // ✅ Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    try {
      const res = await fetch(`https://institutemanagement3.onrender.com/payment/students/${id}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchStudents();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  // ✅ Edit setup
  const handleEditClick = (student: Student) => {
    setEditingStudent(student);

    const data = new FormData();
    data.set("student_id", student.student_id);
    data.set("name", student.name);
    data.set("Phone_number", String(student.Phone_number));
    data.set("department", student.department);
    data.set("year", String(student.year));
    data.set("email", student.email);
    data.set("college", student.college);
    data.set("password", student.password);
    setFormData(data);
  };

  // ✅ Input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;

    const newFormData = new FormData();
    formData.forEach((value, key) => {
      newFormData.set(key, value);
    });

    if (e.target.name === "img" && e.target.files) {
      newFormData.set("img", e.target.files[0]);
    } else {
      newFormData.set(e.target.name, e.target.value);
    }

    setFormData(newFormData);
  };

  // ✅ Update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent || !formData) return;

    try {
      const res = await fetch(
        `https://institutemanagement3.onrender.com/payment/students/${editingStudent.id}/`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (res.ok) {
        setEditingStudent(null);
        setFormData(null);
        fetchStudents();
      } else {
        console.error("Update failed");
      }
    } catch (error) {
      console.error("Update error", error);
    }
  };
   // ✅ Check if teacher is logged in
useEffect(() => {
  const storedTeacher = localStorage.getItem("teacher");
  if (!storedTeacher) {
    router.push("/loginTeacher");
  } else {
    setTeacher(JSON.parse(storedTeacher));
  }
}, [router]);

// Then inside return()


  return (
    <div className="max-w-7xl mt-20 mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Student Management</h1>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2 mb-6">
        <input
          type="text"
          placeholder="Filter by ID"
          value={filterId}
          onChange={(e) => setFilterId(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Filter by Phone"
          value={filterPhone}
          onChange={(e) => setFilterPhone(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Filter by Department"
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply Filter
        </button>
      </div>

      {/* Edit Form */}
      {editingStudent && formData && (
        <form
          onSubmit={handleUpdate}
          className="mb-10 border p-4 rounded bg-gray-50 dark:bg-gray-800"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">Update Student</h2>
          {[
            { label: "Student ID", name: "student_id", type: "text" },
            { label: "Name", name: "name", type: "text" },
            { label: "Phone Number", name: "Phone_number", type: "text" },
            { label: "Department", name: "department", type: "text" },
            { label: "Year", name: "year", type: "number" },
            { label: "Email", name: "email", type: "email" },
            { label: "College", name: "college", type: "text" },
            { label: "Password", name: "password", type: "text" },
          ].map((field) => (
            <div key={field.name} className="mb-3">
              <label className="block font-medium mb-1">{field.label}</label>
              <input
                name={field.name}
                defaultValue={(editingStudent as any)[field.name]}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                type={field.type}
              />
            </div>
          ))}

          <div className="mb-3">
            <label className="block font-medium mb-1">Profile Image (optional)</label>
            <input
              type="file"
              name="img"
              accept="image/*"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mr-2">
            Update
          </button>
          <button
            type="button"
            onClick={() => setEditingStudent(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <div key={student.id} className="border rounded p-4 shadow bg-white dark:bg-gray-900">
            <h2 className="text-lg font-bold mb-2 text-center border-b pb-1">Student Details</h2>
            <p><strong>🎓 ID:</strong> {student.student_id}</p>
            <p><strong>👤 Name:</strong> {student.name}</p>
            <p><strong>📞 Phone:</strong> {student.Phone_number}</p>
            <p><strong>🏛️ Dept:</strong> {student.department}</p>
            <p><strong>📅 Year:</strong> {student.year}</p>
            <p><strong>✉️ Email:</strong> {student.email}</p>
            <p><strong>🏫 College:</strong> {student.college}</p>
            <p><strong>🔑 Password:</strong> {student.password}</p>
            {student.img && (
              <img
                src={student.img}
                alt="Profile"
                className="mt-2 w-24 h-24 object-cover rounded border"
              />
            )}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEditClick(student)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
