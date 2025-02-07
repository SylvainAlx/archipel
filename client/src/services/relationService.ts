import { RelationModel } from "../models/relationModel";
import { SERVER_URL } from "../settings/consts";
import { GET_JWT } from "../utils/functions";
import { handleFetchError } from "../utils/procedures";

export const createRelationFetch = async (payload: RelationModel) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/relation/create`, {
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

export const updateRelationFetch = async (payload: RelationModel) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/relation/update`, {
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

export const getAllRelationsFetch = async (searchText: string) => {
  try {
    const resp = await fetch(
      `${SERVER_URL}/relation/getall?texteRecherche=${encodeURIComponent(searchText)}`,
    );
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};
