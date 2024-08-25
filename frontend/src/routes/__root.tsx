import { fetcherWithAuth } from "@/api/fetcher";
import { useMe } from "@/api/hooks";
import { removeToken } from "@/api/token";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RequestNotif from "@/components/ui/lib/request";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import useSWR from "swr";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const { me, isError, mutate } = useMe();

  const { data, error } = useSWR("/api/view_requests/me", fetcherWithAuth);

  const handleSignout = () => {
    removeToken();
    mutate();
  };

  return (
    <>
      <div className="bg-[url('../Landing_Page_BG.png')] bg-[left_calc(-200%)_top_calc(100%)] bg-cover bg-no-repeat min-h-[calc(100vh-93px)] font-inter">
        <div className="pt-6 bg-[url('../Landing_Page_BG.png')] bg-[left_calc(-200%)_top_calc(30%)] bg-cover bg-no-repeat"></div>
        <div className="rounded-2xl mx-10 bg-white bg-opacity-75 p-4 px-20 flex justify-between items-center bg-blend-overlay">
          <Link to="/" className="font-bold text-lg flex items-center">
            <img src="../Landing_Page_graphic.png" alt="Logo" />
            <div className="p-3 text-[#FB6209] text-3xl">Project Pals</div>
          </Link>{" "}
          <div className="flex ml-auto items-center flex gap-6">
            {me && !isError && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:underline text-lg  font-bold">
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

                {data && (
                  <div className="relative flex items-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">Requests</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 flex flex-col item-centers gap-4">
                        {data.userRequests.filter(
                          (request) => request.status === "Pending"
                        ).length === 0 && <>No requests found!</>}
                        {data.userRequests
                          .filter((request) => request.status === "Pending")
                          .map((request) => (
                            <RequestNotif
                              request={request}
                              key={request.requestId}
                            ></RequestNotif>
                          ))}
                      </PopoverContent>
                    </Popover>
                    {data.userRequests.filter(
                      (request) => request.status === "Pending"
                    ).length !== 0 && (
                      <span className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3">
                        <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                      </span>
                    )}
                  </div>
                )}

                <Button asChild>
                  <Link to="/dashboard" className="hover:underline text-lg">
                    Dashboard
                  </Link>
                </Button>

                <Button asChild className="bg-orange-400 hover:bg-orange-300">
                  <Link to="/" onClick={handleSignout}>
                    Sign Out
                  </Link>
                </Button>
              </>
            )}
            {(!me || isError) && (
              <>
                <Link to="/login" className="hover:underline text-lg font-bold">
                  Login
                </Link>
                <Button asChild className = "hover:bg-blue-600">
                  <Link to="/sign-up" className="hover:underline text-lg">
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
