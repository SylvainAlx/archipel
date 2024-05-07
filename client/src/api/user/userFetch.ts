import { SERVER_URL } from "../../settings/consts";
import { AuthPayload, RecoveryPayload } from "../../types/typUser";
import { GET_JWT } from "../../utils/functions";

export const registerFetch = async (payload: AuthPayload) => {
  const resp = await fetch(`${SERVER_URL}/user/signup`, {
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
  const resp = await fetch(`${SERVER_URL}/user/signin`, {
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
  const resp = await fetch(`${SERVER_URL}/user/forgetpassword`, {
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
  const resp = await fetch(`${SERVER_URL}/user/verify`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const result = await resp.json();
  return result;
};

export const DeleteUserFetch = async () => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/user/delete`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};