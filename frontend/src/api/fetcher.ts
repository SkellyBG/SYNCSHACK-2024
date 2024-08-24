export const fetcher = (url: string) => fetch(url).then((res) => res.json());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function postNoAuth(url: string, { arg }: { arg: any }) {
  const response = await fetch("http://localhost:3000" + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  console.log(response);
  return response.json();
}

export async function postWithAuth(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { arg }: { arg: { token: string; body: any } }
) {
  const response = await fetch("http://localhost:3000" + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${arg.token}`,
    },
    body: JSON.stringify(arg.body),
  });
  console.log(response);
  return response.json();
}
