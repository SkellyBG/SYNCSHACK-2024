import { Card, CardContent } from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaArrowRightLong, FaPen } from "react-icons/fa6";
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

  // Function to see if the user's profile is incomplete or not
  const isProfileIncomplete = () => {
    return (
      !me?.uni ||
      !me?.degree ||
      !me?.role ||
      !me?.targetGrade ||
      !me?.bio
    );
  };

  return (
    <>
      {me && (
        <div className="bg-[url('../../Landing_Page_BG.png')] bg-cover bg-no-repeat min-h-[calc(100vh-117px)] font-inter">
          <div className="p-12 min-h-[calc(100vh-65px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-10 bg-white bg-opacity-70 shadow-md">
                <CardContent className="flex flex-col items-center justify-center">
                  <div className="relative group">
                    <Avatar className="w-40 h-40">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {/* Edit Icon */}
                    <div className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-600 transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer">
                      <FaPen size={20} />
                    </div>
                  </div>

                  <h1 className="mt-2">{me.name}</h1>
                  <Separator className="mb-5 mt-5" />

                  {/* Show this section only if the profile is incomplete */}
                  {isProfileIncomplete() && (
                    <>
                      <h1 className="font-semibold text-lg">Complete your profile</h1>
                      <Link to="/dashboard/quiz">
                        <FaArrowRightLong size={30} />
                      </Link>
                    </>
                  )}

                  <h1 className="font-semibold text-xl mb-5">About Me</h1>
                  <div className="flex">

                    <div className="flex-1 pr-4 grid grid-cols-2 gap-4">
                      {[
                        { label: me.uni?.toUpperCase(), key: 'uni' },
                        { label: me.degree?.toUpperCase().replace("-", ' '), key: 'degree' },
                        { label: me.role?.toUpperCase(), key: 'role' },
                        { label: me.targetGrade?.toUpperCase(), key: 'targetGrade' }
                      ].map(({ label, key }) => (
                        <div key={key} className="relative flex justify-center items-center text-center bg-gray-100 p-4 rounded-lg shadow-sm group">
                          <div>{label}</div>
                          <div className="absolute p-2 bg-gray-800 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <FaPen size={16} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex-1 pl-4">
                      <div className="relative bg-gray-100 p-4 rounded-lg shadow-sm h-full group">
                        <h2 className="font-semibold text-md mb-2">My description</h2>
                        <p>{me.bio}</p>
                        <div className="absolute top-2 right-2 p-2 bg-gray-800 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                          <FaPen size={16} />
                        </div>
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>

              <Card className="p-10 bg-white bg-opacity-70 shadow-md">
                <CardContent className="flex flex-col items-center justify-center">
                  <div className="w-full flex justify-between items-center">
                    <h1 className="font-semibold text-2xl">Your current course(s)</h1>
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

                  <div className="grid grid-cols-2 gap-4 ">

                    <Card className="p-5 bg-orange-500">
                      <h2>COMP1531</h2>
                    </Card>
                    <Card className="p-5 bg-orange-500">
                      <h2>COMP2511</h2>
                    </Card>
                    <Card className="p-5 bg-orange-500">
                      <h2>COMP3900</h2>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-5 bg-white bg-opacity-70 shadow-md">
                <CardContent className="flex items-center justify-center">
                  <h1 className="font-semibold text-lg">Your current outgoing request(s)</h1>
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
