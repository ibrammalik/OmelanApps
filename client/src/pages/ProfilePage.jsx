import React, { useEffect, useState } from "react";
import EditableProfileCard from "@/components/EditableProfileCard";
import { getUserProfile, updateUserProfile } from "@/utils/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(role);

        setProfile(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    if (role) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [role]);

  const handleSave = async (updatedProfile) => {
    try {
      const result = await updateUserProfile(role, updatedProfile);

      alert("✅ Profil berhasil diperbarui.");

      setProfile(result);
    } catch (error) {
      alert("❌ Gagal perbarui profil: " + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!profile)
    return (
      <p className="text-center mt-10 text-muted-foreground">
        Tidak ada data profil untuk ditampilkan.
      </p>
    );

  return (
    <div className="">
      {/* Pass role as a prop to EditableProfileCard */}
      <EditableProfileCard profile={profile} onSave={handleSave} role={role} />
    </div>
  );
}
