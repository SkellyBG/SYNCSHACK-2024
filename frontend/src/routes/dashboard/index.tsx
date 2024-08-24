import { Card, CardContent } from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaArrowRightLong } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMe } from "@/api/hooks";

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  const [open, setOpen] = useState(false);
  const { me } = useMe();

  return (
    <>
      {me && (
        <div className="bg-[url('../../Dashboard_Page_BG.png')] bg-cover bg-no-repeat min-h-[calc(100vh-117px)] font-inter">
          <div className="p-24 min-h-[calc(100vh-65px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-10 bg-white bg-opacity-70 shadow-md">
                <CardContent className="flex flex-col items-center justify-center">
                  <Avatar className="w-40 h-40">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h1>{me.name}</h1>
                  <Separator className="mb-5 mt-5" />
                  <h1 className="font-semibold text-lg">Complete your profile</h1>
                  <Link to="/dashboard/quiz">
                    <FaArrowRightLong size={30} />
                  </Link>
                </CardContent>
              </Card>

              <Card className="p-10 bg-white bg-opacity-70 shadow-md">
                <CardContent className="flex flex-col items-center justify-center">
                  <div className="w-full flex justify-between items-center">
                    <h1 className="font-semibold text-lg">Your current course(s)</h1>
                    <Button onClick={() => setOpen(true)}>Add new courses</Button>
                  </div>

                  <Separator className="mb-5 mt-5" />

                  <CommandDialog open={open} onOpenChange={setOpen}>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                      <CommandEmpty>No courses found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem>COMP1531</CommandItem>
                        <CommandItem>COMP1521</CommandItem>
                        <CommandItem>COMP3900</CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </CommandDialog>
                </CardContent>
              </Card>

              <Card className="p-5 bg-white bg-opacity-70 shadow-md">
                <CardContent className="flex items-center justify-center">
                  <h1 className="font-semibold text-lg">Your current request(s)</h1>
                </CardContent>
              </Card>

              <Card className="p-5 bg-white bg-opacity-70 shadow-md">
                <CardContent className="flex items-center justify-center">
                  <h1 className="font-semibold text-lg">Your current group(s)</h1>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
