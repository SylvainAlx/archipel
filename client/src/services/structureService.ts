import { StructureModel } from "../models/structureModel";
import { SERVER_URL } from "../settings/consts";
import { GET_JWT } from "../utils/functions";
import { handleFetchError } from "../utils/procedures";

export const getAllStructuresFetch = async (searchText: string) => {
  try {
    const resp = await fetch(
      `${SERVER_URL}/structure/getall?texteRecherche=${encodeURIComponent(searchText)}`,
    );
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getStructureFetch = async (id: string) => {
  try {
    const resp = await fetch(`${SERVER_URL}/structure/${id}`);
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const createStructureFetch = async (payload: StructureModel) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/structure/create`, {
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

export const deleteStructureFetch = async (officialId: string) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/structure/${officialId}`, {
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

export const updateStructureFetch = async (payload: StructureModel) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/structure/update`, {
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
