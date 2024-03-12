import { SERVER_URL } from "../../settings/consts";
import { ParamPayload } from "../../types/typPayload";
import { GET_JWT } from "../../utils/functions";

export const createParamFetch = async (payload: ParamPayload) => {
    const jwt = GET_JWT();
    const resp = await fetch(`${SERVER_URL}/param/create`, {
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