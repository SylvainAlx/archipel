import { AuthPayload, ComPayload, RecoveryPayload } from "../types/typPayload";
import { SERVER_URL } from "../settings/consts";
import { GET_JWT } from "./functions";


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

export const DeleteSelfFetch = async () => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/nation/owner/delete`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

// export const getTop100 = async () => {
//   const resp = await fetch(`${SERVER_URL}/nation/getnations`);
//   const result = await resp.json();
//   return result;
// };

export const getAllNations = async (searchText: string) => {
  const resp = await fetch(`${SERVER_URL}/nation/getall?texteRecherche=${encodeURIComponent(searchText)}`);
  const result = await resp.json();
  return result;
};

export const createCom = async (payload: ComPayload) => {
  const resp = await fetch(`${SERVER_URL}/com/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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