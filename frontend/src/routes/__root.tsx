import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="px-20 flex justify-between items-center h-16">
        <Link to="/" className="hover:underline text-lg">
          Home
        </Link>{" "}
        <div className="flex ml-auto items-center flex gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:underline text-lg">
              Your Courses
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["COMP1511", "COMP1521", "COMP1531"].map((course) => (
                <DropdownMenuItem key={course}>
                  <div className="flex items-center justify-between">
                    <Link to={`/courses/${course}`} className="text-lg">
                      {course}
                    </Link>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/login" className="hover:underline text-lg">
            Login
          </Link>
          <Button asChild>
            <Link to="/sign-up" className="hover:underline text-lg">
              Get Started!
            </Link>
          </Button>
        </div>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
