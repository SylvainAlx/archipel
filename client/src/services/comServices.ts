import { ComModel } from "../models/comModel";
import { SERVER_URL } from "../settings/consts";
import { GET_JWT } from "../utils/functions";

export const createComFetch = async (payload: ComModel) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/com/create`, {
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

export const getComsFetch = async (
  originId: string,
  destinationId: string,
  comType: number[],
) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(
      `${SERVER_URL}/com/getcoms?originId=${originId}&destinationId=${destinationId}&&comType=${comType}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + jwt,
        },
      },
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

export const getComsByDestinationFetch = async (officialId: string) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(
      `${SERVER_URL}/com/getbydestination/${officialId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + jwt,
        },
      },
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

export const getAllPublicComsFetch = async () => {
  try {
    const resp = await fetch(`${SERVER_URL}/com/getpubliccoms`);
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

export const getPublicComsByOriginFetch = async (nationId: string) => {
  try {
    const resp = await fetch(`${SERVER_URL}/com/getpubliccoms/${nationId}`);
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

export const getAllAdminComsFetch = async () => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/admin/getadmincoms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + jwt,
    },
  });
  const result = await resp.json();
  return result;
};

export const deleteComFetch = async (id: string) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/com/delete/${id}`, {
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
