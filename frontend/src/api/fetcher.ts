import { getToken } from "./token";

export const fetcherWithAuth = async (url: string) => {
  const response = await fetch("http://localhost:3000" + url, {
    headers: { authorization: `${getToken()}` },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function postNoAuth(url: string, { arg }: { arg: any }) {
  const response = await fetch("http://localhost:3000" + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
}

export async function postWithAuth(
  url: string | string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { arg }: { arg: any }
) {
  const response = await fetch(
    "http://localhost:3000" + (Array.isArray(url) ? url[0] + url[1] : url),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
      body: JSON.stringify(arg),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
}
