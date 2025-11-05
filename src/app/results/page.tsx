'use client';

import React, { useEffect, useState } from 'react';

type Student = {
  id: number;
  title: string;
  discrip: string;
  attachment: string;
};

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://institutemanagement3.onrender.com/result/students/')
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">📄 Student Attachments</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="grid gap-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="border border-gray-200 p-4 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold">{student.title}</h2>
              <p className="text-gray-600">{student.discrip}</p>
              <a
                href={student.attachment}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-blue-600 hover:underline"
              >
                View PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
