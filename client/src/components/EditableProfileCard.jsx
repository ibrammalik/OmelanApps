import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";

export default function EditableProfileCard() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const roleFromStorage = localStorage.getItem("userRole");
    const profileData = localStorage.getItem("tempRegisterData");
    if (roleFromStorage && profileData) {
      setRole(roleFromStorage);
      setProfile(JSON.parse(profileData));
    }
  }, []);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange("photoUrl", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem("tempRegisterData", JSON.stringify(profile));
    setIsEditing(false);
  };

  if (!profile) {
    return (
      <p className="text-center mt-10 text-muted-foreground">
        Memuat profil...
      </p>
    );
  }

  return (
    <div className="space-y-2 rounded-lg p-4 shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Profil</h2>
        <Button variant="outline" onClick={() => setIsEditing((prev) => !prev)}>
          {isEditing ? "Batal" : "Edit"}
        </Button>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
        <div className="flex flex-col items-center gap-4 p-4">
          <Avatar className="w-32 h-32">
            <AvatarImage src={profile.photoUrl || ""} />
            <AvatarFallback>{profile.name?.[0]}</AvatarFallback>
          </Avatar>
          {isEditing && (
            <Input type="file" accept="image/*" onChange={handlePhotoChange} />
          )}
        </div>

        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
          {renderFields(role, profile, isEditing, handleChange)}
        </div>
      </div>

      {isEditing && (
        <div className="pt-4 flex justify-end">
          <Button onClick={handleSave}>Simpan</Button>
        </div>
      )}
    </div>
  );
}

function renderFields(role, profile, isEditing, handleChange) {
  const fields =
    role === "caregiver"
      ? [
          { key: "name", label: "Nama Lengkap" },
          { key: "email", label: "Email" },
          { key: "phoneNumber", label: "No. Telepon" },
          { key: "age", label: "Umur" },
          { key: "gender", label: "Jenis Kelamin" },
          { key: "address", label: "Alamat" },
          { key: "experience", label: "Pengalaman" },
          { key: "specialist", label: "Spesialis" },
        ]
      : [
          { key: "name", label: "Nama Lengkap" },
          { key: "email", label: "Email" },
          { key: "phoneNumber", label: "No. Telepon" },
          { key: "dob", label: "Tanggal Lahir" },
          { key: "age", label: "Umur" },
          { key: "gender", label: "Jenis Kelamin" },
          { key: "address", label: "Alamat" },
        ];

  return fields.map(({ key, label }) => (
    <div key={key} className="flex flex-col gap-1">
      <label className="text-sm text-muted-foreground">{label}</label>
      {isEditing ? (
        <Input
          value={profile[key] || ""}
          onChange={(e) => handleChange(key, e.target.value)}
        />
      ) : (
        <p className="font-medium">{profile[key] || "-"}</p>
      )}
    </div>
  ));
}
