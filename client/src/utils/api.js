export async function fetchAllCaregivers() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/list/partner`);
    if (!res.ok) throw new Error("Gagal mengambil data caregiver");
    const DPartner = await res.json();
    return { data: DPartner.data.list, error: null };
  } catch (error) {
    return { error, data: null };
  }
}
