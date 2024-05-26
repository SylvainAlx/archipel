const API_URL = "https://restcountries.com/v3.1"

export const getAllDataByFieldFetch = async (field: string) => {
  const resp = await fetch(`${API_URL}/all?fields=${field}`);
  const result = await resp.json();
  return result;
  
};