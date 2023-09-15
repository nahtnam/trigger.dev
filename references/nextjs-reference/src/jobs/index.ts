import { client } from "@/trigger";
import { eventTrigger } from "@trigger.dev/sdk";

client.defineJob({
  id: "example-nextjs-job",
  name: "Example NextJS Job",
  version: "1.0.0",
  trigger: eventTrigger({
    name: "example.job",
  }),
  run: async (payload, io, ctx) => {
    await io.wait("wait", 1);
    await io.logger.info("Example NextJS Job", { ctx });
  },
});
