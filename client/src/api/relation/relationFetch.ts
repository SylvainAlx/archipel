import { SERVER_URL } from "../../settings/consts";
import { DiplomaticRelationship } from "../../types/typRelation";
import { GET_JWT } from "../../utils/functions";

export const createRelationFetch = async (payload: DiplomaticRelationship) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/relation/create`, {
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

export const updateRelationFetch = async (payload: DiplomaticRelationship) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/relation/update`, {
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

export const getAllRelationsFetch = async (searchText: string) => {
  const resp = await fetch(
    `${SERVER_URL}/relation/getall?texteRecherche=${encodeURIComponent(searchText)}`,
  );
  const result = await resp.json();
  return result;
};
