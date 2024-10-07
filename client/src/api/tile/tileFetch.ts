import { SERVER_URL } from "../../settings/consts";
import { GET_JWT } from "../../utils/functions";

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

export const deleteTileFetch = async (title: string) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/tile/${title}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};
