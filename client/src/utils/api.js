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

export async function getUserProfile(role) {
  let endpoint = "";

  if (role === "caregiver") {
    endpoint = "/details/partner";
  } else if (role === "caretaker") {
    endpoint = "/details/client";
  } else {
    throw new Error("Role tidak valid atau tidak dikenali.");
  }

  const response = await fetchWithAuth(`${API_URL}${endpoint}`);
  console.log(response);

  return response.data.details;
}

export async function updateUserProfile(role, payload) {
  let endpoint = "";

  if (role === "caregiver") {
    endpoint = "/details/partner";
  } else if (role === "caretaker") {
    endpoint = "/details/client";
  } else {
    throw new Error("Role tidak valid atau tidak dikenali.");
  }

  const res = await fetchWithAuth(`${API_URL}${endpoint}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return res;
}

export async function fetchSchedules() {
  const result = await fetchWithAuth(`${API_URL}/schedule/partner`);

  // console.log(result);

  return result.data.schedules;
}

export async function submitSchedule(date) {
  try {
    const result = await fetchWithAuth(`${API_URL}/schedule/partner`, {
      method: "POST",
      body: JSON.stringify({
        dateStart: date,
        dateEnd: date,
      }),
    });

    return result;
  } catch (error) {
    // console.error("❌ Gagal submit jadwal:", error.message);
    throw error;
  }
}

export async function deleteSchedule(id) {
  const res = await fetchWithAuth(`${API_URL}/schedule/partner/${id}`, {
    method: "DELETE",
  });

  return true;
}

export const getAllNotifications = async (type = "client") => {
  const url = `${API_URL}/notifications/${type}/all`;
  const response = await fetchWithAuth(url, { method: "GET" });
  return response.data.notifications;
};

export const getUnreadNotifications = async (type = "client") => {
  const url = `${API_URL}/notifications/${type}/unread`;
  const response = await fetchWithAuth(url, { method: "GET" });
  return response.data.notifications;
};

export const getNotificationDetail = async (id, type = "client") => {
  const url = `${API_URL}/notifications/${type}/${id}`;
  const response = await fetchWithAuth(url, { method: "GET" });
  return response.data.content;
};

export const markNotificationAsRead = async (id, type = "client") => {
  const url = `${API_URL}/notifications/${type}/${id}`;
  await fetchWithAuth(url, {
    method: "PUT",
    body: JSON.stringify({ statusRead: true }),
  });
};