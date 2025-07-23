import React from "react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function InvoiceSummary() {
  const payments = [
    {
      id: 1,
      name: "Danang Prasetyo",
      date: "2025-07-20",
      invoiceCode: "INV-20250720-001",
      amount: 500000,
    },
    {
      id: 2,
      name: "Ayu Lestari",
      date: "2025-07-18",
      invoiceCode: "INV-20250718-002",
      amount: 450000,
    },
    {
      id: 3,
      name: "Rizky Hidayat",
      date: "2025-07-15",
      invoiceCode: "INV-20250715-003",
      amount: 550000,
    },
    {
      id: 4,
      name: "Fajar Nugraha",
      date: "2025-07-10",
      invoiceCode: "INV-20250710-004",
      amount: 600000,
    },
    {
      id: 5,
      name: "Citra Dewi",
      date: "2025-07-08",
      invoiceCode: "INV-20250708-005",
      amount: 520000,
    },
  ];

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-2 rounded-lg p-4 shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Detail Pendapatan</h2>
      </div>
      <Separator />
      {payments.map((payment) => (
        <div
          key={payment.id}
          className="flex gap-4 items-center mt-4 border p-4 rounded-lg"
        >
          <Avatar className="w-12 h-12 rounded-lg">
            <AvatarFallback className="text-base font-medium bg-blue-100 text-blue-700">
              {payment.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <p className="text-base font-semibold text-gray-800">
                {payment.name}
              </p>
              <p className="text-sm text-gray-500">
                {formatDate(payment.date)}
              </p>
            </div>

            <div className="flex justify-between items-end mt-1">
              <p className="text-sm text-gray-400">#{payment.invoiceCode}</p>
              <p className="text-base font-bold text-green-600">
                +Rp{payment.amount.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
