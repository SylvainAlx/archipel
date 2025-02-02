import { SERVER_URL } from "../settings/consts";
import { GET_JWT } from "../utils/functions";
import { handleFetchError } from "../utils/procedures";

export const reportContentFetch = async (
  contentOfficialId: string,
  reverse: boolean,
) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(
      `${SERVER_URL}/admin/${reverse ? "reversereportcontent" : "reportcontent"}/${contentOfficialId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + jwt,
        },
      },
    );
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const banContentFetch = async (
  contentOfficialId: string,
  reverse: boolean,
) => {
  const jwt = GET_JWT();
  try {
    const resp = await fetch(
      `${SERVER_URL}/admin/${reverse ? "reversebancontent" : "bancontent"}/${contentOfficialId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + jwt,
        },
      },
    );
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};
