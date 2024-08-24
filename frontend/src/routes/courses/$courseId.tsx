import { fetcherWithAuth, postWithAuth } from "@/api/fetcher";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const Route = createFileRoute("/courses/$courseId")({
  component: Course,
});

function Course() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { courseId } = Route.useParams();
  const { data, isLoading } = useSWR(
    `/api/unsw/courses/${courseId}/groups`,
    fetcherWithAuth
  );

  const { trigger } = useSWRMutation(
    `/api/unsw/courses/${courseId}/groups`,
    postWithAuth
  );

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await trigger({ name, description });
      enqueueSnackbar("Group successfully created!", { variant: "success" });
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  return (
    <>
      <div className="min-h-screen p-8 bg-gray-100">
        <div className="flex justify-between mb-6">
          <h2 className="text-3xl font-bold text-left">Course: {courseId}</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create new group</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create new group</DialogTitle>
                <DialogDescription>
                  Fill in the details of your group here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    className="col-span-3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleSubmit}>
                  Create group
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {isLoading && <></>}
          {data && data.groups.length === 0 && <>No groups found yet :c</>}
          {data &&
            data.groups.length > 0 &&
            data.groups.map((group) => (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>{group.name}</CardTitle>
                  <CardDescription>
                    Group creator:{" "}
                    {
                      group.members.filter(
                        (member) => member.userId === group.leader
                      )[0].name
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h1>{group.members.length} members</h1>
                  <p>{group.description}</p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
