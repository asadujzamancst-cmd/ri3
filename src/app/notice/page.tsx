"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Notice {
id: number;
subject: string;
message: string;
date: string | null;
created_at: string;
attachment?: string | null;
}

export default function NoticeManager() {
const [notices, setNotices] = useState<Notice[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [success, setSuccess] = useState<string | null>(null);

const [subject, setSubject] = useState("");
const [message, setMessage] = useState("");
const [date, setDate] = useState("");
const [attachment, setAttachment] = useState<File | null>(null);
const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
const API_URL = "https://institutemanagement3.onrender.com/notice/notices/";


const fetchNotices = async () => {
setLoading(true);
setError(null);
try {
const res = await axios.get<Notice[]>(API_URL);
setNotices(res.data);
} catch (err: any) {
setError(err.response?.data ? JSON.stringify(err.response.data) : err.message);
}
setLoading(false);
};

useEffect(() => {
fetchNotices();
}, []);

const resetForm = () => {
setSubject("");
setMessage("");
setDate("");
setAttachment(null);
setEditingNotice(null);
setSuccess(null);
setError(null);
};

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
if (!subject.trim() || !message.trim()) return setError("Subject and message are required");


const formData = new FormData();
formData.append("subject", subject);
formData.append("message", message);
if (date) formData.append("date", date);
if (attachment) formData.append("attachment", attachment);

try {
  if (editingNotice) {
    await axios.patch(`${API_URL}${editingNotice.id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setSuccess("Notice updated successfully!");
  } else {
    await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setSuccess("Notice created successfully!");
  }
  fetchNotices();
  resetForm();
} catch (err: any) {
  setError(err.response?.data ? JSON.stringify(err.response.data) : err.message);
}


};

const handleDelete = async (id: number) => {
if (!confirm("Are you sure you want to delete this notice?")) return;
try {
await axios.delete(`${API_URL}${id}/`);
setSuccess("Notice deleted successfully!");
fetchNotices();
} catch (err: any) {
setError(err.response?.data ? JSON.stringify(err.response.data) : err.message);
}
};

const handleEdit = (notice: Notice) => {
setEditingNotice(notice);
setSubject(notice.subject);
setMessage(notice.message);
setDate(notice.date || "");
setAttachment(null);
setSuccess(null);
setError(null);
};

return ( <div className="max-w-5xl mx-auto p-6 mt-10 rounded shadow bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"> <h1 className="text-3xl font-bold mb-6 text-center">Notice Management</h1>

```
  <form
    onSubmit={handleSubmit}
    className="mb-6 p-4 border rounded bg-green-50 dark:bg-green-800 dark:border-green-700 transition-colors duration-300"
  >
    <h2 className="text-xl font-semibold mb-4">
      {editingNotice ? "Edit Notice" : "Create Notice"}
    </h2>

    {success && <p className="text-green-600 dark:text-green-400 mb-2">{success}</p>}
    {error && <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>}

    <input
      type="text"
      placeholder="Subject"
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
      className="w-full p-2 mb-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
    />
    <textarea
      placeholder="Message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="w-full p-2 mb-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
    />
    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="w-full p-2 mb-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
    />
    <input
      type="file"
      onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
      className="w-full mb-2"
    />
    <div className="flex flex-wrap gap-2">
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
        {editingNotice ? "Update Notice" : "Create Notice"}
      </button>
      {editingNotice && (
        <button
          type="button"
          onClick={resetForm}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
        >
          Cancel
        </button>
      )}
    </div>
  </form>

  {loading ? (
    <p className="text-center text-gray-500 dark:text-gray-400">Loading notices...</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead className="bg-green-200 dark:bg-green-700">
          <tr>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Attachment</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id} className="text-center">
              <td className="border p-2">{notice.subject}</td>
              <td className="border p-2">{notice.message}</td>
              <td className="border p-2">{notice.date}</td>
              <td className="border p-2">
                {notice.attachment ? (
                  <a
                    href={notice.attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    View
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td className="border p-2 flex justify-center gap-2 flex-wrap">
                <button
                  onClick={() => handleEdit(notice)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(notice.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {notices.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-gray-500 dark:text-gray-400">
                No notices found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )}
</div>


);
}
