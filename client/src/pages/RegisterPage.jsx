import CaregiverInput from "@/components/caregivers/CaregiverInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
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
  const [password, setPassword] = useState("");

  // user only
  const [dob, setDob] = useState("");
  // caregiver only
  const [experience, setExperience] = useState("");
  const [specialization, setSpecialization] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const userData =
      role === "user"
        ? {
            role,
            name,
            email,
            password,
            dob,
          }
        : {
            role,
            name,
            email,
            password,
            experience,
            specialization,
          };

    localStorage.setItem("userRole", role);
    localStorage.setItem("tempRegisterData", JSON.stringify(userData));
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-md">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your details below to create a new account
          </CardDescription>
          <CardAction>
            <Button asChild variant="link">
              <Link to="/login">Login</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button
              variant={role === "user" ? "default" : "outline"}
              onClick={() => setRole("user")}
            >
              Sign Up as User
            </Button>
            <Button
              variant={role === "caregiver" ? "default" : "outline"}
              onClick={() => setRole("caregiver")}
            >
              Sign Up as Caregiver
            </Button>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleRegister}>
            {role === "user" ? (
              <UserInput
                name={name}
                onNameChange={(e) => setName(e.target.value)}
                email={email}
                onEmailChange={(e) => setEmail(e.target.value)}
                password={password}
                onPasswordChange={(e) => setPassword(e.target.value)}
                dob={dob}
                onDobChange={(e) => setDob(e.target.value)}
              />
            ) : (
              <CaregiverInput
                name={name}
                onNameChange={(e) => setName(e.target.value)}
                email={email}
                onEmailChange={(e) => setEmail(e.target.value)}
                password={password}
                onPasswordChange={(e) => setPassword(e.target.value)}
                experience={experience}
                onExperienceChange={(e) => setExperience(e.target.value)}
                specialization={specialization}
                onSpecializationChange={(e) =>
                  setSpecialization(e.target.value)
                }
              />
            )}{" "}
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
