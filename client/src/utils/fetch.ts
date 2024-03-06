import {
  AuthPayload,
  ComPayload,
  PlacePayload,
  RecoveryPayload,
} from "../types/typPayload";
import { SERVER_URL } from "../settings/consts";
import { GET_JWT } from "./functions";
import { Nation } from "../types/typNation";

//--------------
// Authentification
//--------------

export const registerFetch = async (payload: AuthPayload) => {
  const resp = await fetch(`${SERVER_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
  return result;
};

export const loginFetch = async (payload: AuthPayload) => {
  const resp = await fetch(`${SERVER_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
  return result;
};

export const RecoveryFetch = async (payload: RecoveryPayload) => {
  const resp = await fetch(`${SERVER_URL}/auth/forgetpassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
  return result;
};

export const authGet = async (token: string) => {
  const resp = await fetch(`${SERVER_URL}/auth/verify`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const result = await resp.json();
  return result;
};

//--------------
// Nations
//--------------

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

//--------------
// Coms
//--------------

export const createCom = async (payload: ComPayload) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/com/create`, {
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

export const getAllComs = async () => {
  const resp = await fetch(`${SERVER_URL}/com/getall`);
  const result = await resp.json();
  return result;
};

export const deleteComFetch = async (id: string) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/com/delete/${id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

//--------------
// Citizens
//--------------

export const getNationCitizensFetch = async (id: string) => {
  const resp = await fetch(`${SERVER_URL}/citizen/${id}`);
  const result = await resp.json();
  return result;
};

//--------------
// Places
//--------------

export const getAllPlacesFetch = async () => {
  const resp = await fetch(`${SERVER_URL}/place/getall`);
  const result = await resp.json();
  return result;
};

export const getNationPlacesFetch = async (id: string) => {
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
