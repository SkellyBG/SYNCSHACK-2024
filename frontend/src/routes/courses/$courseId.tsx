import { fetcherWithAuth, postWithAuth } from "@/api/fetcher";
import { useMe } from "@/api/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [groupId, setGroupId] = useState("");

  const { courseId } = Route.useParams();
  const { data, isLoading } = useSWR(
    `/api/unsw/courses/${courseId}/groups`,
    fetcherWithAuth
  );

  const { trigger } = useSWRMutation(
    `/api/unsw/courses/${courseId}/groups`,
    postWithAuth
  );

  const { trigger: triggerRequest } = useSWRMutation(
    [`/api/request_group/`, groupId],
    postWithAuth
  );

  const { me } = useMe();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await trigger({ name, description });
      enqueueSnackbar("Group successfully created!", { variant: "success" });
      setDescription("");
      setName("");
      setCreateGroupOpen(!createGroupOpen);
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  const handleSendRequest = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await triggerRequest({ userId: me?.userId, courseId });
      enqueueSnackbar("Successfully sent a request to join!", {
        variant: "success",
      });
      setRequestOpen(!requestOpen);
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  return (
    <>
      <div className="min-h-screen p-8 bg-gray-100">
        <div className="flex justify-between mb-6">
          <h2 className="text-3xl font-bold text-left">Course: {courseId}</h2>
          <Dialog open={createGroupOpen} onOpenChange={setCreateGroupOpen}>
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
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!(name && description)}
                >
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
            me &&
            data.groups.length > 0 &&
            data.groups.map((group) => (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>{group.name}</CardTitle>
                  <CardDescription>
                    Group creator:{" "}
                    {group.members.filter(
                      (member) => member.userId === group.leader
                    )[0]?.name ?? group.members[0].name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <div className="flex gap-4 items-center">
                      Members:{" "}
                      {group.members.map((member) => (
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => setGroupId(group.groupId)}>
                          View group
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Group {group.name}</DialogTitle>
                        </DialogHeader>
                        <div>
                          Current number of members: {group.members.length}
                        </div>

                        <div>{group.description}</div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            onClick={handleSendRequest}
                            disabled={group.members.some(
                              (member) => member.userId === me.userId
                            )}
                          >
                            Request to join
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
