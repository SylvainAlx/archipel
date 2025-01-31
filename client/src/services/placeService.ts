import { PlaceModel } from "../models/placeModel";
import { SERVER_URL } from "../settings/consts";
import { GET_JWT } from "../utils/functions";

export const getAllPlacesFetch = async (searchText: string) => {
  try {
    const resp = await fetch(
      `${SERVER_URL}/place/getall?texteRecherche=${encodeURIComponent(searchText)}`,
    );
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

export const getNationPlacesFetch = async (id: string) => {
  try {
    const resp = await fetch(`${SERVER_URL}/place/bynation/${id}`);
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

export const getPlaceFetch = async (id: string) => {
  try {
    const resp = await fetch(`${SERVER_URL}/place/${id}`);
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

export const createPlaceFetch = async (payload: PlaceModel) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/place/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(payload),
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

export const deletePlaceFetch = async (id: string) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/place/delete/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${jwt}` },
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

export const updatePlaceFetch = async (payload: PlaceModel) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/place/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(payload),
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
