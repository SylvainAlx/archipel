import { SERVER_URL } from "../../settings/consts";
import { ComPayload } from "../../types/typPayload";
import { GET_JWT } from "../../utils/functions";

export const getComsCountFetch = async () => {
  const resp = await fetch(`${SERVER_URL}/com/count`);
  const result = await resp.json();
  return result;
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

export const getComsByDestinationFetch = async (officialId: string) => {
  const resp = await fetch(`${SERVER_URL}/com/getbydestination/${officialId}`);
  const result = await resp.json();
  return result;
};

export const getPublicComsFetch = async () => {
  const resp = await fetch(`${SERVER_URL}/com/getpubliccoms`);
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
