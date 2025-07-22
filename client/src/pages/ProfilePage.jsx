import React from "react";
import { useRole } from "@/contexts/RoleContext";
import CaregiverProfile from "@/components/caregivers/CaregiverProfile";
import UserProfile from "@/components/users/UserProfile";

export default function ProfilePage() {
  const { role } = useRole();

  if (!role) {
    return <p>Loading profile...</p>;
  }

  return <>{role === "caregiver" ? <CaregiverProfile /> : <UserProfile />}</>;
}
