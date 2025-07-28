import React, { useState, useEffect } from "react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { getAppointmentsByPartner, updateAppointmentStatus } from "@/utils/api";

const STATUS = ["Semua", "pending", "confirmed", "completed"];

const statusColor = {
  pending: "text-yellow-600",
  confirmed: "text-blue-600",
  completed: "text-green-600",
  cancelled: "text-red-600",
};

const statusLabels = {
  pending: "Menunggu Konfirmasi",
  confirmed: "Dikonfirmasi",
  inProgress: "Sedang Berjalan",
  completed: "Selesai",
  cancelled: "Dibatalkan",
  expired: "Kedaluwarsa",
};

export default function CaregiverAppointment() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("Semua");
  // const [appointmentList, setAppointmentList] = useState([
  //   {
  //     id: 1,
  //     name: "Luffy",
  //     date: "22 September 2025",
  //     status: "Menunggu Konfirmasi",
  //   },
  //   {
  //     id: 2,
  //     name: "Nami",
  //     date: "23 September 2025",
  //     status: "Sedang Berlangsung",
  //   },
  //   {
  //     id: 3,
  //     name: "Zoro",
  //     date: "21 September 2025",
  //     status: "Selesai",
  //   },
  // ]);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointmentsByPartner();
      setAppointmentList(data);
    } catch (error) {
      // console.error("❌ Gagal ambil appointment:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setLoading(true);
    try {
      await updateAppointmentStatus(id, newStatus);

      if (newStatus === "completed") {
        alert(
          "Terima kasih atas kerja keras Anda! Silakan cek review dan invoice di dashboard Anda."
        );
      } else if (newStatus === "confirmed") {
        alert("Pesanan Diterima, berhasil dikonfirmasi.");
      }

      setAppointmentList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );

      fetchAppointments();
    } catch (error) {
      alert("Gagal memperbarui status: " + error.message);
    }
  };

  // const handleStatusChange = (id, newStatus) => {
  //   setAppointmentList((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, status: newStatus } : item
  //     )
  //   );
  // };

  const filteredAppointments =
    activeStatus === "Semua"
      ? appointmentList
      : appointmentList.filter((item) => item.status === activeStatus);

  // console.log(filteredAppointments);

  return (
    <div className="space-y-4 rounded-lg p-4 shadow bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Daftar Janji Temu</h2>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-2">
        {STATUS.map((status) => (
          <Button
            key={status}
            variant={activeStatus === status ? "default" : "outline"}
            onClick={() => setActiveStatus(status)}
            className="text-sm"
          >
            {status}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredAppointments.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-center border p-2 rounded-lg justify-between"
          >
            <div className="flex gap-4 items-center px-2">
              <Avatar className="w-12 h-12 rounded-lg">
                <AvatarImage
                  src={item.client_photo}
                  alt={item.client_name}
                  className="object-cover"
                />
                <AvatarFallback className="text-base font-medium bg-blue-100 text-blue-700">
                  {item.client_name?.charAt(0) || "-"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <p className="text-base font-semibold text-gray-800">
                  {item.client_name}
                </p>
                <p className="text-sm text-gray-400">
                  {item.date?.slice(0, 10)}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 text-right min-w-[160px] p-2">
              <span
                className={`text-sm font-medium ${
                  statusColor[item.status] || "text-gray-500"
                }`}
              >
                <strong>{statusLabels[item.status] || item.status}</strong>
              </span>

              {(item.status === "pending" || item.status === "confirmed") && (
                <div className="pt-1">
                  {item.status === "pending" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => handleStatusChange(item.id, "confirmed")}
                    >
                      Konfirmasi
                    </Button>
                  )}
                  {item.status === "confirmed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-600 text-green-600 hover:bg-green-50"
                      onClick={() => handleStatusChange(item.id, "completed")}
                    >
                      Selesaikan
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && <p className="text-sm text-gray-500">Memuat data...</p>}
        {!loading && filteredAppointments.length === 0 && (
          <p className="text-start text-gray-400 px-4">Tidak ada janji temu.</p>
        )}
      </div>
    </div>
  );
}
