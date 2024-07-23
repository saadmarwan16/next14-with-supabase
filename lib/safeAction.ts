import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerErrorLog(originalError) {
    if (!process.env.NODE_ENv || process.env.NODE_ENV === "development") {
      console.log(originalError);
    } else {
      // Send the error to an error logging service
    }
  },
});
