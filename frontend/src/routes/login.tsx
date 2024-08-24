import { postNoAuth } from "@/api/fetcher";
import { setToken } from "@/api/token";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate({ from: "/sign-up" });

  const { trigger } = useSWRMutation("/api/users/login", postNoAuth);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const { token } = await trigger({ email, password });
      setToken(token);
      enqueueSnackbar("Login successful!", { variant: "success" });
      mutate("/api/users/me");
      navigate({ to: "/dashboard" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-center">
          Login to your existing account
        </h2>
      </div>

      <Card className="w-full max-w-md">
        <CardContent className="pt-5">
          <form>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-6">
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
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Login
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Or{" "}
              <Link to="/sign-up" className="text-blue-500 hover:underline">
                sign in
              </Link>{" "}
              to an existing account
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
