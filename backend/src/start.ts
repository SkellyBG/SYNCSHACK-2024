import { getApp } from "@/src/server";

const port = process.env.PORT || 3000;

const app = getApp();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
