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
      <div className="p-4 px-20 flex justify-between items-center">
        <Link to="/" className="[&.active]:font-bold text-lg">
          Home
        </Link>{" "}
        <div className="flex ml-auto items-center flex gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-lg">
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

          <Link to="/login" className="[&.active]:font-bold text-lg">
            Login
          </Link>
          <Button asChild>
            <Link to="/sign-up" className="text-lg">
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
