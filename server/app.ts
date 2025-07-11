import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";

const app = new Hono();
app.use(clerkMiddleware())



app.get("/", (c) => {
  return c.text("Hello, world!");
});
export default app; 