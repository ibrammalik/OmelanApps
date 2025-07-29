import fetchWithAuth from "./fetchwithauth.js";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchAllCaregivers() {
  try {
    const res = await fetch(`${API_URL}/list/partner`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Gagal mengambil data caregiver");
    }
    const DPartner = await res.json();
    return DPartner.data.list;
  } catch (error) {
    // Lempar error agar bisa ditangani oleh komponen UI
    throw error;
  }
}

export async function searchCaregiversByDateAvailableDB(date) {
  const payload = {
    dateStart: date,
    dateEnd: date,
  };

  const DListCaregiver = await fetchWithAuth(`${API_URL}/schedule/findByDate`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return DListCaregiver.data.partners;
}

export async function getAppointmentsByPartner() {
  const result = await fetchWithAuth(`${API_URL}/appointments/partner`);
  return result.data.appointments;
}

export async function getAppointmentsByClient() {
  const result = await fetchWithAuth(`${API_URL}/appointments/client`);
  return result.data.appointments;
}

export async function updateAppointmentStatus(id, status) {
  const result = await fetchWithAuth(`${API_URL}/appointments/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return result;
}
