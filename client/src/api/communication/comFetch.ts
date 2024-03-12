import { SERVER_URL } from "../../settings/consts";
import { ComPayload } from "../../types/typPayload";
import { GET_JWT } from "../../utils/functions";

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