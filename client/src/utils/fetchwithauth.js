/**
 * Fungsi helper untuk melakukan fetch dengan token JWT secara otomatis.
 * Gunakan ini untuk endpoint yang membutuhkan otentikasi.
 */

export default async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Token tidak ditemukan. Harap login terlebih dahulu.");
  }

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorMessage = `HTTP Error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();

        errorMessage = errorData.message || "Terjadi kesalahan pada server.";
      } catch (e) {}
      throw new Error(errorMessage);
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
