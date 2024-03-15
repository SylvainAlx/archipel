import { SERVER_URL } from "../../settings/consts";
import { Param } from "../../types/typAtom";
import { GET_JWT } from "../../utils/functions";

export const createParamFetch = async (payload: Param) => {
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

  export const getAllParamsFetch = async () => {
    const jwt = GET_JWT();
    const resp = await fetch(`${SERVER_URL}/param/getall`, {
      method: "GET",
      headers: {
        authorization: "Bearer " + jwt,
      }
    });
    const result = await resp.json();
    return result;
  }