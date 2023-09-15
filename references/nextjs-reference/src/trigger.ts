import { setupServer } from "msw/node";
import { handlers } from "./mocks/handlers";

const mockServer = setupServer(...handlers);
mockServer.listen({
  onUnhandledRequest: "bypass",
});

import { TriggerClient } from "@trigger.dev/sdk";

export const client = new TriggerClient({
  id: "nextjs-example",
  apiKey: process.env.TRIGGER_API_KEY,
  apiUrl: process.env.TRIGGER_API_URL,
  verbose: false,
  ioLogLocalEnabled: true,
});
