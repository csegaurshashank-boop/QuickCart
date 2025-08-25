import { serve } from "inngest/next";
import { inngest } from "@/config/inngest";
import { syncUserCreation, syncUserUpdation, syncUserDeletion } from "@/config/inngest";

// Create an API that serves your functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
  ],
});
