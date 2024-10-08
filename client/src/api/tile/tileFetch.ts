import { SERVER_URL } from "../../settings/consts";
import { Tile } from "../../types/typTile";
import { GET_JWT } from "../../utils/functions";

export const createTileFetch = async (payload: Tile) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/tile/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + jwt,
    },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();

  return result;
};

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

export const deleteTileFetch = async (id: string) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/tile/${id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

export const updateTileFetch = async (payload: Tile) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/tile/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + jwt,
    },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();

  return result;
};
