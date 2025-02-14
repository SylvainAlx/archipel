import { UserModel } from "../models/userModel";
import { SERVER_URL } from "../settings/consts";
import {
  AuthPayload,
  ChangePasswordPayload,
  changeStatusPayload,
  RecoveryPayload,
  TranferCreditPayload,
} from "../types/typUser";
import { GET_JWT } from "../utils/functions";
import { handleFetchError } from "../utils/procedures";

export const authGet = async (token: string) => {
  try {
    const resp = await fetch(`${SERVER_URL}/user/verify`, {
      headers: { authorization: `Bearer ${token}` },
    });
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getBannedUsersFetch = async () => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/admin/getbannedusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + jwt,
      },
    });
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const registerFetch = async (payload: AuthPayload) => {
  try {
    const resp = await fetch(`${SERVER_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export const loginFetch = async (payload: AuthPayload) => {
  try {
    const resp = await fetch(`${SERVER_URL}/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export const recoveryFetch = async (payload: RecoveryPayload) => {
  try {
    const resp = await fetch(`${SERVER_URL}/user/forgetpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export const changePasswordFetch = async (payload: ChangePasswordPayload) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/user/changepassword`, {
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

export const deleteUserFetch = async (password: string) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/user/delete`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateUserFetch = async (payload: UserModel) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/user/update`, {
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

export const getOneUserFetch = async (id: string) => {
  try {
    const resp = await fetch(`${SERVER_URL}/user/${id}`);
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getNationCitizensFetch = async (id: string) => {
  try {
    const resp = await fetch(`${SERVER_URL}/user/bynation/${id}`);
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAllCitizensFetch = async (searchText: string) => {
  try {
    const resp = await fetch(
      `${SERVER_URL}/user/getall?texteRecherche=${encodeURIComponent(searchText)}`,
    );
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const changeStatusFetch = async (payload: changeStatusPayload) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/user/changestatus`, {
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

export const transferCreditsFetch = async (payload: TranferCreditPayload) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/user/transfer`, {
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

export const verifyCaptchaFetch = async (token: string | null) => {
  try {
    const resp = await fetch(`${SERVER_URL}/captcha`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};
