import useSWR from "swr";
import { fetcherWithAuth } from "./fetcher";

interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: TeamRole | null;
  targetGrade: Grade | null;
  bio: string | null;
  uni: string | null;
  degree: string | null;
  courses: Array<string> | null;
}

enum TeamRole {
  Leader = "leader",
  Researcher = "researcher",
  Writer = "writer",
  Developer = "developer",
  Designer = "designer",
}

export enum Grade {
  HD = "HD",
  D = "D",
  CR = "CR",
  PS = "PS",
}

export function useMe() {
  const { data, error, isLoading } = useSWR(`/api/users/me`, fetcherWithAuth);

  return {
    me: data?.user as User | null,
    isLoading,
    isError: error,
  };
}
