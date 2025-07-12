import 'dotenv/config';
import app from "./app";

console.log("🏃 Server is running on http://localhost:4000");
Bun.serve({
  fetch: app.fetch,
  port: 4000,
});