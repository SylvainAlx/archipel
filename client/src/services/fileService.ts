import { SERVER_URL } from "../settings/consts";
import { GET_JWT } from "../utils/functions";
import { handleFetchError } from "../utils/procedures";

export const deleteUploadedFileFetch = async (uuid: string) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(`${SERVER_URL}/file/delete/${uuid}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${jwt}` },
    });
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};
