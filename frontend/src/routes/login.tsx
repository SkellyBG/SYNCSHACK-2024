import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSnackbar } from "notistack";
import { useState } from "react";


export const Route = createFileRoute('/login')({
  component: Login
})

function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const [password, setPassword] = useState('');

  const handleSubmit = (_e: React.MouseEvent<HTMLButtonElement>) => {
      // Proceed with form submission (e.g., send data to server)
      console.log('Form submitted');
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-center">Login to your existing account</h2>
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
              Or{' '}
              <Link to="/sign-up" className="text-blue-500 hover:underline">
                sign in
              </Link>{' '}
              to an existing account
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
