import { SERVER_URL } from "../../settings/consts";

export const getNationCitizensFetch = async (id: string) => {
  const resp = await fetch(`${SERVER_URL}/citizen/${id}`);
  const result = await resp.json();
  return result;
};