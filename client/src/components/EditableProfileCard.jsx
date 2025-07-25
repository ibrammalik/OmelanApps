import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
    if (field === "dob") {
      const birthDate = new Date(value); // YYYY-MM-DD
      if (isNaN(birthDate)) return;

      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      setProfile((prev) => ({
        ...prev,
        dob: value,
        age: age < 0 ? 0 : age,
      }));
    } else {
      setProfile((prev) => ({ ...prev, [field]: value }));
    }
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="flex flex-col items-center gap-4 p-4">
          <Avatar className="w-32 h-32">
            <AvatarImage src={profile.photoUrl || ""} />
            <AvatarFallback className="text-5xl bg-blue-100 text-blue-700">
              {profile.name?.[0]}
            </AvatarFallback>
          </Avatar>
          {isEditing ? (
            <>
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />{" "}
              <label className="text-base font-medium text-muted-foreground w-full max-w-md">
                Biodata
              </label>
              <textarea
                className="w-full max-w-md rounded-md border border-gray-300 text-sm shadow-sm focus:outline-none focus:ring-2 p-2 focus:ring-blue-500"
                rows={5}
                value={profile.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </>
          ) : (
            profile.description && (
              <div>
                <label className="text-base font-medium text-muted-foreground w-full max-w-md text-left p-2">
                  Biodata
                </label>
                <p className="text-sm text-gray-700 text-justify p-2 max-w-md">
                  {profile.description}
                </p>
              </div>
            )
          )}
        </div>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
          {renderFields(role, profile, isEditing, handleChange)}
        </div>
      </div>

      {isEditing && (
        <>
          <Separator />
          <div className="flex justify-end">
            <Button onClick={handleSave}>Simpan</Button>
          </div>
        </>
      )}
    </div>
  );
}

function renderFields(role, profile, isEditing, handleChange) {
  const fields = [
    { key: "name", label: "Nama Lengkap", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "phoneNumber", label: "No. Telepon", type: "tel" },
    { key: "dob", label: "Tanggal Lahir", type: "date" },
    { key: "age", label: "Umur", type: "number", disabled: true },
    {
      key: "gender",
      label: "Jenis Kelamin",
      type: "select",
      options: ["Laki-laki", "Perempuan"],
    },
    ...(role === "caregiver"
      ? [
          {
            key: "experience",
            label: "Pengalaman (Tahun)",
            type: "select",
            options: Array.from({ length: 10 }, (_, i) => (i + 1).toString()),
          },
        ]
      : []),
    { key: "address", label: "Alamat", type: "textarea" },
  ];

  return fields.map(({ key, label, type, options, disabled }) => (
    <div key={key} className="flex flex-col gap-1">
      <label className="text-base text-muted-foreground">{label}</label>
      {isEditing ? (
        type === "select" ? (
          <Select
            value={profile[key] || ""}
            onValueChange={(value) => handleChange(key, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Pilih ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : type === "textarea" ? (
          <textarea
            className="border shadow-xs rounded-sm"
            value={profile[key] || ""}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        ) : (
          <Input
            type={type}
            value={profile[key] || ""}
            disabled={disabled}
            onChange={(e) => {
              if (key === "dob") {
                const raw = e.target.value;
                handleChange("dob", raw);
              } else {
                handleChange(key, e.target.value);
              }
            }}
          />
        )
      ) : (
        <p className="font-medium">
          {key === "age" && typeof profile.age === "number"
            ? `${profile.age} tahun`
            : profile[key] || "-"}
        </p>
      )}
    </div>
  ));
}
