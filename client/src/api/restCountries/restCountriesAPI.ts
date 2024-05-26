/* eslint-disable @typescript-eslint/no-explicit-any */
import { sortObjectKeys } from "../../utils/functions";
import { getAllDataByFieldFetch } from "./restCountriesFetch";

export const getAllCurrencies = () => {
  let currenciesList = {}
  let cleanList
  getAllDataByFieldFetch("currencies")
  .then((resp: any[]) => {
    resp.map((item) => {
      Object.entries(item.currencies).map(([trigram, details]) => {
        currenciesList = {...currenciesList, [trigram]:details}
      })
    })
 cleanList = sortObjectKeys(currenciesList)  
  console.log(cleanList);
})
}

export const getAllLanguages = () => {
  let languagesList = {}
  let cleanList
  getAllDataByFieldFetch("languages")
  .then((resp: any[]) => {
    resp.map((item) => {
      Object.entries(item.languages).map(([trigram, details]) => {
        languagesList = {...languagesList, [trigram]:details}
      })
    })
 cleanList = sortObjectKeys(languagesList)  
  console.log(cleanList);
})
}