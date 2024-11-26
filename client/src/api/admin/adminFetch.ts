import { SERVER_URL } from "../../settings/consts";
import { GET_JWT } from "../../utils/functions";

export const reportContentFetch = async (contentOfficialId: string) => {
  const jwt = GET_JWT();
  const resp = await fetch(
    `${SERVER_URL}/admin/reportcontent/${contentOfficialId}`,
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
