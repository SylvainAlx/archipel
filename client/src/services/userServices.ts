import { SERVER_URL } from "../settings/consts";

export const authGet = async (token: string) => {
  try {
    const resp = await fetch(`${SERVER_URL}/user/verify`, {
      headers: { authorization: `Bearer ${token}` },
    });
    if (!resp.ok) {
      const errorPayload = await resp.json();
      throw new Error(JSON.stringify(errorPayload));
    }
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};
