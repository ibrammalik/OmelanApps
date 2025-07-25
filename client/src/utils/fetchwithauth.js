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
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    return response;
  } catch (error) {
    console.error("Fetch with auth error:", error);
    throw error;
  }
}
