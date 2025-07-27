import fetchWithAuth from "./fetchwithauth.js";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchAllCaregivers() {
  try {
    const res = await fetch(`${API_URL}/list/partner`);
    if (!res.ok) throw new Error("Gagal mengambil data caregiver");
    const DPartner = await res.json();
    return { data: DPartner.data.list, error: null };
  } catch (error) {
    return { error, data: null };
  }
}

export async function searchCaregiversByDateAvailableDB(date) {
  try {
    const res = await fetchWithAuth(`${API_URL}/schedule/findByDate`, {
      method: "POST",
      body: JSON.stringify({
        dateStart: date,
        dateEnd: date,
      }),
    });

    const DListCaregiver = await res.json();
    // console.log(DListCaregiver);

    if (!res.ok) {
      return {
        error: true,
        message: DListCaregiver.message || "Gagal memuat data",
      };
    }

    return { error: false, data: DListCaregiver.data.partners };
  } catch (err) {
    return { error: true, message: err.message };
  }
}

export async function getAppointmentsByPartner() {
  const token = localStorage.getItem("accessToken");

  try {
    const res = await fetch(`${API_URL}/appointments/partner`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    console.log(result);

    if (!res.ok) {
      console.error("❌ Gagal ambil appointment:", result.message);
      throw new Error(result.message);
    }
    console.log(result);

    return result.data.appointments;
  } catch (error) {
    console.error("❌ Error saat ambil appointment dari API:", error.message);
    throw error;
  }
}

export async function updateAppointmentStatus(id, status) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API_URL}/appointments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
}
