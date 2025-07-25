import React, { useState } from "react";
import LoginInput from "@/components/LoginInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "@/routes/route";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("caretaker"); // default: caretaker (client)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint =
        role === "caregiver"
          ? "/authentications/partner"
          : "/authentications/client";
      const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Login gagal");
        return;
      }

      // Simpan token
      if (result?.data?.accessToken) {
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("userRole", role);
        navigate(ROUTES[role].dashboard);
      } else {
        alert("Login gagal: token tidak ditemukan");
      }
    } catch (err) {
      alert("Login gagal: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // const storedData = JSON.parse(localStorage.getItem("tempRegisterData"));

  // if (!storedData) {
  //   alert("Akun tidak ditemukan. Silakan daftar terlebih dahulu.");
  //   return;
  // }

  // if (email === storedData.email && password === storedData.password) {
  //   alert("Berhasil Masuk.");
  //   // Simpan role ke localStorage
  //   localStorage.setItem("userRole", storedData.role);

  //   // Arahkan berdasarkan role
  //   if (storedData.role === "caregiver") {
  //     navigate(ROUTES.caregiver.dashboard);
  //   } else if (storedData.role === "user") {
  //     navigate(ROUTES.caretaker.dashboard);
  //   }
  // } else {
  //   alert("Email atau kata sandi yang Anda masukkan tidak valid.");
  // }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-md">
        <CardHeader>
          <CardTitle>Masuk ke Akun Anda</CardTitle>
          <CardDescription>
            Masukkan email Anda di bawah ini untuk masuk ke akun
          </CardDescription>
          <CardAction>
            <Button asChild variant="link">
              <Link to="/register">Daftar</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <LoginInput
              email={email}
              onEmailChange={(e) => setEmail(e.target.value)}
              password={password}
              onPasswordChange={(e) => setPassword(e.target.value)}
              role={role}
              onChangeRole={(e) => setRole(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Masuk
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
