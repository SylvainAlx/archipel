import { SERVER_URL } from "../../settings/consts";
import { Nation, NewNationPayload } from "../../types/typNation";
import { GET_JWT } from "../../utils/functions";

export const getNationsCountFetch = async () => {
  const resp = await fetch(`${SERVER_URL}/nation/count`);
  const result = await resp.json();
  return result;
};

export const createNationFetch = async (payload: NewNationPayload) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/nation/create`, {
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

export const DeleteSelfFetch = async () => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/nation/delete`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

export const getOneNationFetch = async (id: string) => {
  const resp = await fetch(`${SERVER_URL}/nation/${id}`);
  const result = await resp.json();
  return result;
};

export const getAllNationsFetch = async (
  searchText: string,
  searchTag: string,
) => {
  const resp = await fetch(
    `${SERVER_URL}/nation/getall?name=${encodeURIComponent(searchText)}&tag=${encodeURIComponent(searchTag)}`,
  );
  const result = await resp.json();
  return result;
};

export const updateNationFetch = async (payload: Nation) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/nation/update`, {
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

export const getAllNationTagsFetch = async () => {
  const resp = await fetch(`${SERVER_URL}/nation/gettags`);
  const result = await resp.json();
  return result;
};
