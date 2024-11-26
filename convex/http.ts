import { httpRouter } from "convex/server";
import { onCreateUser } from "./clerk";

const http = httpRouter();

http.route({
  path: "/clerk",
  method: "POST",
  handler: onCreateUser,
});
export default http;
