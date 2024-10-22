import { SERVER_URL } from "../../settings/consts";
import {
  AuthPayload,
  ChangePasswordPayload,
  changeStatusPayload,
  RecoveryPayload,
  User,
} from "../../types/typUser";
import { GET_JWT } from "../../utils/functions";

export const getCitizensCountFetch = async () => {
  const resp = await fetch(`${SERVER_URL}/user/count`);
  const result = await resp.json();
  return result;
};

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

export const recoveryFetch = async (payload: RecoveryPayload) => {
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

export const changePasswordFetch = async (payload: ChangePasswordPayload) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/user/changepassword`, {
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

export const authGet = async (token: string) => {
  const resp = await fetch(`${SERVER_URL}/user/verify`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const result = await resp.json();
  return result;
};

export const deleteUserFetch = async () => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/user/delete`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

export const updateUserFetch = async (payload: User) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/user/update`, {
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

export const getOneUserFetch = async (id: string) => {
  const resp = await fetch(`${SERVER_URL}/user/${id}`);
  const result = await resp.json();
  return result;
};

export const getNationCitizensFetch = async (id: string) => {
  const resp = await fetch(`${SERVER_URL}/user/bynation/${id}`);
  const result = await resp.json();
  return result;
};

export const getAllCitizensFetch = async (searchText: string) => {
  const resp = await fetch(
    `${SERVER_URL}/user/getall?texteRecherche=${encodeURIComponent(searchText)}`,
  );
  const result = await resp.json();
  return result;
};

export const changeStatusFetch = async (payload: changeStatusPayload) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/user/changestatus`, {
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

export const verifyCaptchaFetch = async (token: string | null) => {
  const resp = await fetch(`${SERVER_URL}/captcha`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  const result = await resp.json();

  return result;
};
