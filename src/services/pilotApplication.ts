export type PilotApplication = {
  name: string;
  email: string;
  street: string;
  houseNumber: string;
  postcode: string;
  households: string;
  message?: string;
  consent: boolean;
  locale: string;
};

const endpoint = import.meta.env.VITE_APPLY_ENDPOINT as string | undefined;

/**
 * Sends a pilot application. If `VITE_APPLY_ENDPOINT` is set, the application is
 * POSTed there as JSON; otherwise it is only logged locally.
 */
export async function submitApplication(application: PilotApplication): Promise<void> {
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(application),
    });
    if (!res.ok) throw new Error(`Application failed with status ${res.status}`);
    return;
  }

  // TODO: connect backend
  await new Promise((resolve) => setTimeout(resolve, 600));
  if (import.meta.env.DEV) console.info("[pilot application]", application);
}
