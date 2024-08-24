import useSWRMutation from "swr/mutation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { postNoAuth } from "@/api/fetcher";

export const Route = createFileRoute("/sign-up")({
  component: SignUp,
});

function SignUp() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate({from: '/sign-up'});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { trigger } = useSWRMutation("/api/users", postNoAuth);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
    } else {
      try {
        await trigger({ name, email, password });
        enqueueSnackbar("Account created successfully", { variant: "success" });
        navigate({to: '/login'});
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        enqueueSnackbar(e.message, { variant: "error" });
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-center">
          Sign up for a new account
        </h2>
      </div>

      <Card className="w-full max-w-md">
        <CardContent className="pt-5">
          <form>
            <div className="mb-6">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-6">
              <Label id="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Sign Up
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
