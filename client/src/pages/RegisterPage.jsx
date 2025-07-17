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
import { Link } from "react-router-dom";

export function RegisterPage() {
  const [role, setRole] = useState("user");
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

          <form className="flex flex-col gap-6">
            {role === "user" ? <UserInput /> : <CaregiverInput />}
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
