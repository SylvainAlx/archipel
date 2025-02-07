import { NationModel } from "../models/nationModel";
import { SERVER_URL } from "../settings/consts";
import { GET_JWT } from "../utils/functions";
import { handleFetchError } from "../utils/procedures";

export const createNationFetch = async (payload: NationModel) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/nation/create`, {
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

export const DeleteSelfFetch = async () => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/nation/delete`, {
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

export const getOneNationFetch = async (id: string) => {
  try {
    const resp = await fetch(`${SERVER_URL}/nation/${id}`);
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAllNationsFetch = async (
  searchText: string,
  searchTag: string,
) => {
  try {
    const resp = await fetch(
      `${SERVER_URL}/nation/getall?name=${encodeURIComponent(searchText)}&tag=${encodeURIComponent(searchTag)}`,
    );
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateNationFetch = async (payload: NationModel) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/nation/update`, {
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

export const getAllNationTagsFetch = async () => {
  try {
    const resp = await fetch(`${SERVER_URL}/nation/gettags`);
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};
