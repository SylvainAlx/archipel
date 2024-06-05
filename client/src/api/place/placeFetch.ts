import { SERVER_URL } from "../../settings/consts";
import { PlacePayload } from "../../types/typPayload";
import { Place } from "../../types/typPlace";
import { GET_JWT } from "../../utils/functions";

export const getPlacesCountFetch = async () => {
  const resp = await fetch(`${SERVER_URL}/place/count`);
  const result = await resp.json();
  return result;
};

// export const getAllPlacesFetch = async () => {
//   const resp = await fetch(`${SERVER_URL}/place/getall`);
//   const result = await resp.json();
//   return result;
// };

export const getAllPlacesFetch = async (searchText: string) => {
  const resp = await fetch(
    `${SERVER_URL}/place/getall?texteRecherche=${encodeURIComponent(searchText)}`,
  );
  const result = await resp.json();
  return result;
};

export const getNationPlacesFetch = async (id: string) => {
  const resp = await fetch(`${SERVER_URL}/place/bynation/${id}`);
  const result = await resp.json();
  return result;
};

export const getPlaceFetch = async (id: string) => {
  const resp = await fetch(`${SERVER_URL}/place/${id}`);
  const result = await resp.json();
  return result;
};

export const createPlaceFetch = async (payload: PlacePayload) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/place/create`, {
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

export const deletePlaceFetch = async (id: string) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/place/delete/${id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

export const updatePlaceFetch = async (payload: Place) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/place/update`, {
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
