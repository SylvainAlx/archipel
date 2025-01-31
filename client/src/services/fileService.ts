import { SERVER_URL } from "../settings/consts";
import { GET_JWT } from "../utils/functions";

export const deleteUploadedFileFetch = async (uuid: string) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/file/delete/${uuid}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};
