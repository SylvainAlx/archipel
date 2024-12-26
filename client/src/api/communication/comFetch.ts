import { SERVER_URL } from "../../settings/consts";
import { ComPayload } from "../../types/typCom";
import { GET_JWT } from "../../utils/functions";

export const getComsCountFetch = async () => {
  try {
    const resp = await fetch(`${SERVER_URL}/com/count`);
    if (!resp.ok) {
      const errorPayload = await resp.json();
      throw new Error(errorPayload);
    }
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const createComFetch = async (payload: ComPayload) => {
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

export const getComsFetch = async (
  originId: string,
  destinationId: string,
  comType: number[],
) => {
  const jwt = GET_JWT();
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
  const result = await resp.json();
  return result;
};

export const getComsByDestinationFetch = async (officialId: string) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/com/getbydestination/${officialId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + jwt,
    },
  });
  const result = await resp.json();
  return result;
};

export const getAllPublicComsFetch = async () => {
  try {
    const resp = await fetch(`${SERVER_URL}/com/getpubliccoms`);
    if (!resp.ok) {
      const errorPayload = await resp.json();
      throw new Error(errorPayload);
    }
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getPublicComsByOriginFetch = async (nationId: string) => {
  const resp = await fetch(`${SERVER_URL}/com/getpubliccoms/${nationId}`);
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
