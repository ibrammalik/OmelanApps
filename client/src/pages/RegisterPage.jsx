import CaregiverInput from "@/components/caregivers/CaregiverInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserInput from "@/components/users/UserInput";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function RegisterPage() {
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  // user only
  const [dob, setDob] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const endpoint = role === "user" ? "/register/client" : "/register/partner";
    const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname: name,
        username: email,
        password,
      }),
    });

    // const userData =
    //   role === "user"
    //     ? {
    //         role,
    //         name,
    //         email,
    //         phoneNumber,
    //         dob,
    //         password,
    //       }
    //     : {
    //         role,
    //         name,
    //         email,
    //         phoneNumber,
    //         password,
    //       };

    // localStorage.setItem("userRole", role);
    // localStorage.setItem("tempRegisterData", JSON.stringify(userData));
    const result = await res.json();
    if (res.ok) {
      navigate("/login");
    } else {
      alert(result.message || "Register gagal");
    }
    // navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-md">
        <CardHeader>
          <CardTitle>Buat Akun Anda</CardTitle>
          <CardDescription>
            Masukkan detail Anda di bawah ini untuk membuat akun baru
          </CardDescription>
          <CardAction>
            <Button asChild variant="link">
              <Link to="/login">Masuk</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button
              variant={role === "user" ? "default" : "outline"}
              onClick={() => setRole("user")}
            >
              Daftar sebagai Klien
            </Button>
            <Button
              variant={role === "caregiver" ? "default" : "outline"}
              onClick={() => setRole("caregiver")}
            >
              Daftar sebagai Mitra
            </Button>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleRegister}>
            {role === "user" ? (
              <UserInput
                name={name}
                onNameChange={(e) => setName(e.target.value)}
                email={email}
                onEmailChange={(e) => setEmail(e.target.value)}
                phoneNumber={phoneNumber}
                onPhoneNumberChange={(e) => setPhoneNumber(e.target.value)}
                dob={dob}
                onDobChange={(e) => setDob(e.target.value)}
                password={password}
                onPasswordChange={(e) => setPassword(e.target.value)}
              />
            ) : (
              <CaregiverInput
                name={name}
                onNameChange={(e) => setName(e.target.value)}
                email={email}
                onEmailChange={(e) => setEmail(e.target.value)}
                phoneNumber={phoneNumber}
                onPhoneNumberChange={(e) => setPhoneNumber(e.target.value)}
                password={password}
                onPasswordChange={(e) => setPassword(e.target.value)}
              />
            )}{" "}
            <Button type="submit" className="w-full">
              Buat Akun
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
