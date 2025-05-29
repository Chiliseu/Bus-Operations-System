const Backend_BaseURL = process.env.NEXT_PUBLIC_Backend_BaseURL;

if (!Backend_BaseURL) {
  throw new Error("NEXT_PUBLIC_Backend_BaseURL is not defined");
}

const backendToken: string | null = null;

export const getBackendToken = () => backendToken;
export const getBackendBaseURL = () => Backend_BaseURL;

export const fetchBackendToken = async (): Promise<string | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_Backend_BaseURL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "admin" }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Auth failed (${res.status}): ${errorText}`);
      return null;
    }

    const data = await res.json();

    if (!data.token) {
      console.error("Token missing in backend response");
      return null;
    }

    return data.token;
  } catch (err) {
    console.error("[Token_Generation] Error fetching token:", err);
    return null;
  }
};
