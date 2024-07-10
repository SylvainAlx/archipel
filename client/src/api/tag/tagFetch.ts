import { SERVER_URL } from "../../settings/consts";

export const getAllTagsFetch = async () => {
  const resp = await fetch(`${SERVER_URL}/tag/getall`);
  const result = await resp.json();
  return result;
};

export const getTagCountFetch = async () => {
  const resp = await fetch(`${SERVER_URL}/tag/count`);
  const result = await resp.json();
  return result;
};
