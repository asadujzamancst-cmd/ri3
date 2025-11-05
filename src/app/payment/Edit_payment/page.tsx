"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// Interfaces
interface Student {
id: number;
student_id: string;
name: string;
phone_number: number;
}

interface Payment {
id: number;
student: Student;
amount: string;
payment_date: string;
status: string;
reference_id: string | null;
}

export default function PaymentListPage() {
const router = useRouter();

const [teacher, setTeacher] = useState<any>(null);
const [payments, setPayments] = useState<Payment[]>([]);
const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
const [formData, setFormData] = useState<Partial<Payment> | null>(null);
const [filterId, setFilterId] = useState("");

// Load teacher
useEffect(() => {
const storedTeacher = localStorage.getItem("teacher");
if (!storedTeacher) router.push("/loginTeacher");
else setTeacher(JSON.parse(storedTeacher));
}, [router]);

// Fetch payments by student ID
const fetchPaymentsByStudentId = async (studentId: string) => {
if (!studentId.trim()) return;
try {
const res = await fetch(`https://institutemanagement3.onrender.com/payment/payments/?student_id=${studentId}`);
const data = await res.json();
setPayments(data);
} catch (error) {
console.error("Failed to fetch payments", error);
}
};

const handleFilter = () => {
fetchPaymentsByStudentId(filterId);
};

// Delete payment
const handleDelete = async (id: number) => {
if (!confirm("Are you sure you want to delete this payment?")) return;
try {
const res = await fetch(`https://institutemanagement3.onrender.com/payment/payments/${id}/`, { method: "DELETE" });
if (res.ok) fetchPaymentsByStudentId(filterId);
else console.error("Failed to delete");
} catch (error) {
console.error("Delete error", error);
}
};

// Edit payment
const handleEditClick = (payment: Payment) => {
setEditingPayment(payment);
setFormData({
amount: payment.amount,
status: payment.status,
reference_id: payment.reference_id || "",
});
};

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
if (formData) setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleUpdate = async (e: React.FormEvent) => {
e.preventDefault();
if (!editingPayment || !formData) return;
try {
const res = await fetch(`https://institutemanagement3.onrender.com/payment/payments/${editingPayment.id}/`, {
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
amount: formData.amount,
status: formData.status,
reference_id: formData.reference_id,
student_id: editingPayment.student.id,
}),
});
if (res.ok) {
setEditingPayment(null);
setFormData(null);
fetchPaymentsByStudentId(filterId);
} else console.error("Update failed");
} catch (error) {
console.error("Update error", error);
}
};

if (!teacher) return <p className="text-center mt-10 text-gray-500">Loading dashboard...</p>;

return ( <div className="max-w-7xl mt-20 mx-auto p-6"> <h1 className="text-3xl font-bold text-center mb-6">Payment Management</h1>


  {/* Student ID Filter */}
  <div className="flex gap-2 mb-6">
    <input
      type="text"
      placeholder="Enter Student ID"
      value={filterId}
      onChange={(e) => setFilterId(e.target.value)}
      className="border px-3 py-2 rounded"
    />
    <button onClick={handleFilter} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Fetch Payments
    </button>
  </div>

  {/* Edit Form */}
  {editingPayment && formData && (
    <form onSubmit={handleUpdate} className="mb-10 border p-4 rounded bg-gray-50 dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4">Edit Payment</h2>
      <input name="amount" placeholder="Amount" value={formData.amount} onChange={handleInputChange} className="w-full mb-2 p-2 border rounded" type="number" />
      <select name="status" value={formData.status} onChange={handleInputChange} className="w-full mb-2 p-2 border rounded">
        <option value="Paid">Paid</option>
        <option value="Pending">Pending</option>
      </select>
      <input name="reference_id" placeholder="Reference ID" value={formData.reference_id || ""} onChange={handleInputChange} className="w-full mb-2 p-2 border rounded" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mr-2">Update</button>
      <button type="button" onClick={() => setEditingPayment(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
    </form>
  )}

  {/* Payments List */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {payments.map((payment) => (
      <div key={payment.id} className="border rounded p-4 shadow bg-white dark:bg-gray-900">
        <h3 className="text-lg font-bold">{payment.student.name}</h3>
        <p>🎓 ID: {payment.student.student_id}</p>
        <p>📞 Phone: {payment.student.phone_number}</p>
        <p>💰 Amount: {payment.amount} BDT</p>
        <p>📅 Date: {payment.payment_date}</p>
        <p>✅ Status: {payment.status}</p>
        <p>🔗 Ref ID: {payment.reference_id || "N/A"}</p>
        <div className="mt-3 flex gap-2">
          <button onClick={() => handleEditClick(payment)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
          <button onClick={() => handleDelete(payment.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
        </div>
      </div>
    ))}
  </div>
</div>


);
}
