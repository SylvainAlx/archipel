import { SERVER_URL } from "../../settings/consts";

export const getCountsFetch = async () => {
  try {
    const resp = await fetch(`${SERVER_URL}/stats/counts`);
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
