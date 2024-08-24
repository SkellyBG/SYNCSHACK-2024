import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/courses/$courseId")({
  component: Course,
});

function Course() {
  const { courseId } = Route.useParams();

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="text-left mb-6">
        <h2 className="text-3xl font-bold text-left">Course: {courseId}</h2>
      </div>
    </div>

    // <Card className="w-[350px]">
    //   <CardHeader>
    //     <CardTitle>Create project</CardTitle>
    //     <CardDescription>Deploy your new project in one-click.</CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <h1>{courseId}</h1>
    //     <p>{courseId} is a course about C programming.</p>
    //   </CardContent>
    // </Card>
  );
}
