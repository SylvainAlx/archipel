import { TileModel } from "../models/tileModel";
import { SERVER_URL } from "../settings/consts";
import { GET_JWT } from "../utils/functions";
import { handleFetchError } from "../utils/procedures";

export const createTileFetch = async (payload: TileModel) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/tile/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(payload),
    });
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAllTileFetch = async () => {
  try {
    const resp = await fetch(`${SERVER_URL}/tile/getall`);
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getNationTileFetch = async (nationOfficialId: string) => {
  try {
    const resp = await fetch(`${SERVER_URL}/tile/${nationOfficialId}`);
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteTileFetch = async (id: string) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/tile/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${jwt}` },
    });
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateTileFetch = async (payload: TileModel) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/tile/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(payload),
    });
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};
