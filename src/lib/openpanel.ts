import { OpenPanel } from "@openpanel/sdk";

/**
 * Server-side OpenPanel client for conversion events fired from API routes.
 * Credentials come from env; clientSecret is server-only (never NEXT_PUBLIC_).
 */
export const opServer = new OpenPanel({
  clientId: process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID!,
  clientSecret: process.env.OPENPANEL_CLIENT_SECRET!,
  apiUrl: process.env.NEXT_PUBLIC_OPENPANEL_API_URL,
});
