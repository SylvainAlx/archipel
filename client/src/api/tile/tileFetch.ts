import { SERVER_URL } from "../../settings/consts";

export const getAllTileFetch = async () => {
  const resp = await fetch(`${SERVER_URL}/tile/getall`);
  const result = await resp.json();
  return result;
};

export const getNationTileFetch = async (nationOfficialId: string) => {
  const resp = await fetch(`${SERVER_URL}/tile/${nationOfficialId}`);
  const result = await resp.json();
  return result;
};
