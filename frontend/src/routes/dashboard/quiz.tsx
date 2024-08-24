import { Card, CardContent } from "@/components/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import ComboBox from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { useMe } from "@/api/hooks";
import useSWRMutation from "swr/mutation";
import { getToken } from "@/api/token";
import { postWithAuth } from "@/api/fetcher";
import { mutate } from "swr";
import { useSnackbar } from "notistack";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/dashboard/quiz")({
  component: Quiz,
});

const universities = [
  {
    value: "uts",
    label: "UTS",
  },
  {
    value: "unsw",
    label: "UNSW",
  },
  {
    value: "usyd",
    label: "USYD",
  },
];

const degrees = [
  {
    value: "computer-science",
    label: "Computer Science",
  },
  {
    value: "software-engineering",
    label: "Software Engineering",
  },
  {
    value: "data-science",
    label: "Data Science",
  },
];

const grades = [
  {
    value: "HD",
    label: "High Distinction",
  },
  {
    value: "D",
    label: "Distinction",
  },
  {
    value: "CR",
    label: "Credit",
  },
  {
    value: "PS",
    label: "Pass",
  },
];

const roles = [
  {
    value: "leader",
    label: "Leader",
  },
  {
    value: "researcher",
    label: "Researcher",
  },
  {
    value: "writer",
    label: "Writer",
  },
  {
    value: "developer",
    label: "Developer",
  },
  {
    value: "designer",
    label: "Designer",
  },
];

function Quiz() {
  const { enqueueSnackbar } = useSnackbar();
  const [universityOpen, setUniversityOpen] = useState(false);
  const [universityValue, setUniversityValue] = useState("");

  const [degreeOpen, setDegreeOpen] = useState(false);
  const [degreeValue, setDegreeValue] = useState("");

  const [gradeOpen, setGradeOpen] = useState(false);
  const [gradeValue, setGradeValue] = useState("");

  const [roleOpen, setRoleOpen] = useState(false);
  const [roleValue, setRoleValue] = useState("");

  const [bioValue, setBioValue] = useState("");

  const navigate = useNavigate({ from: "/dashboard/quiz" });

  const { me } = useMe();

  const { trigger } = useSWRMutation(`/api/users/${getToken()}`, postWithAuth);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await trigger({
        ...me,
        role: roleValue,
        targetGrade: gradeValue,
        uni: universityValue,
        degree: degreeValue,
        bio: bioValue,
      });
      mutate("/api/users/me");
      navigate({ to: "/dashboard" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-10">
        Let's finalize your profile!
      </h1>
      <Card className="w-full max-w-md">
        <CardContent className="pt-5 flex flex-col items-center justify-center">
          <div></div>
          <Label className="mb-2 mt-5">What is your university?</Label>
          <ComboBox
            open={universityOpen}
            onOpenChange={setUniversityOpen}
            value={universityValue}
            onValueChange={setUniversityValue}
            list={universities}
          />

          <Label className="mb-2 mt-5">What is your degree?</Label>
          <ComboBox
            open={degreeOpen}
            onOpenChange={setDegreeOpen}
            value={degreeValue}
            onValueChange={setDegreeValue}
            list={degrees}
          />

          <Label className="mb-2 mt-5">What is your target grade?</Label>
          <ComboBox
            open={gradeOpen}
            onOpenChange={setGradeOpen}
            value={gradeValue}
            onValueChange={setGradeValue}
            list={grades}
          />

          <Label className="mb-2 mt-5">
            What is your ideal role in a group?
          </Label>
          <ComboBox
            open={roleOpen}
            onOpenChange={setRoleOpen}
            value={roleValue}
            onValueChange={setRoleValue}
            list={roles}
          />

          <Label className="mb-2 mt-5">Tell something about yourself!</Label>
          <Textarea
            content={bioValue}
            onChange={(e) => setBioValue(e.target.value)}
          ></Textarea>

          <div className="mb-5 mt-5" />
          <Button
            disabled={
              !(
                universityValue &&
                degreeValue &&
                gradeValue &&
                roleValue &&
                bioValue
              )
            }
            onClick={handleSubmit}
          >
            I'm done!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
