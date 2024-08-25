import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { User } from "../../../../backend/src/data/data";
import useSWRMutation from "swr/mutation";
import { putWithAuth } from "@/api/fetcher";

interface CourseComponentsProps {
  me: User;
  token: string;
}

const CourseComponents = ({ me, token }: CourseComponentsProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState(me.courses || []);

  const { trigger } = useSWRMutation(
    `/api/users/edit/${token}`,
    putWithAuth
  );

  const handleCourseClick = async (course: string) => {
    let updatedCourses: string[];

    console.log("okokokok")

    if (selectedCourses.includes(course)) {
      updatedCourses = selectedCourses.filter(c => c !== course);
    } else {
      updatedCourses = [...selectedCourses, course];
    }

    setSelectedCourses(updatedCourses);

    const updatedUser = {
      ...me,
      courses: updatedCourses,
    };

    try {
      await trigger(updatedUser);
    } catch (error) {
      console.error('Error updating user courses:', error);
    }
  };

  return (
    <>
      <Card className="p-10 bg-white bg-opacity-70 shadow-md">
        <CardContent className="flex flex-col items-center justify-center">
          <div className="w-full flex justify-between items-center">
            <h1 className="font-semibold text-2xl">Your current course(s)</h1>
            <Button onClick={() => setOpen(true)}>Add new courses</Button>
          </div>

          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No courses found.</CommandEmpty>
              <CommandGroup>
                <CommandItem onSelect={() => handleCourseClick('COMP1531')}>COMP1531</CommandItem>
                <CommandItem onSelect={() => handleCourseClick('COMP1521')}>COMP1521</CommandItem>
                <CommandItem onSelect={() => handleCourseClick('COMP3900')}>COMP3900</CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>

          <div className="grid grid-cols-2 gap-4 gap-y-0 justify-center items-center">
            {selectedCourses.map(course => (
              <Card key={course} className="p-20 mt-5 bg-orange-500 cursor-pointer" onSelect={() => handleCourseClick(course)}>
                <h2>{course}</h2>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CourseComponents;
