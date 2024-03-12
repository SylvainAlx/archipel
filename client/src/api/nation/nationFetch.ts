import { SERVER_URL } from "../../settings/consts";
import { Nation } from "../../types/typNation";
import { GET_JWT } from "../../utils/functions";

export const DeleteSelfFetch = async () => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/nation/owner/delete`, {
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

export const getAllNations = async (searchText: string) => {
  const resp = await fetch(
    `${SERVER_URL}/nation/getall?texteRecherche=${encodeURIComponent(searchText)}`,
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

export const getRoleplayDataFetch = async (id: string) => {
  const resp = await fetch(`${SERVER_URL}/nation/roleplay/${id}`);
  const result = await resp.json();
  return result;
};