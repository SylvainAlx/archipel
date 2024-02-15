import { politicalSideList } from "../settings/consts";

export const GET_JWT = () => localStorage.getItem("jwt");

export const dateToString = (date: Date) => {
  const createdAtDate: Date = new Date(date);
  return createdAtDate.toLocaleString("fr");
};

export const deleteElementOfAtomArray = (
  id: string,
  atom: any[],
  setAtom: React.Dispatch<React.SetStateAction<any>>,
) => {
  let tempArray: any[];
  tempArray = atom.filter((objet) => objet._id !== id);
  setAtom(tempArray);
};

export const createElementOfAtomArray = (
  payload: any,
  atom: any[],
  setAtom: React.Dispatch<React.SetStateAction<any>>,
) => {
  let tempArray = [...atom];
  tempArray.push(payload);
  setAtom(tempArray);
};

export const updateElementOfAtomArray = (
  payload: any,
  atom: any[],
  setAtom: React.Dispatch<React.SetStateAction<any>>,
) => {
  const tempArray = atom.map((objet) =>
    objet._id === payload._id ? payload : objet,
  );
  setAtom(tempArray);
};

export const getPoliticalSide = (value: number) => {
  let label = "";
  politicalSideList.map((politicalSide) => {
    if (value === politicalSide.id) {
      label = politicalSide.label;
    }
  });
  return label;
};

export const differenceEnMinutes = (date: Date) => {
  const difference = new Date().getTime() - new Date(date).getTime();
  const differenceMinutes: number = Math.round(difference / (1000 * 60));
  return differenceMinutes;
};

export const addCredits = () => {
  alert("plus de thune !");
};

export const formatTime = (totalMinutes: number): string => {
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = Math.floor(totalMinutes % 60);

  return `${days} j ${hours} h ${minutes} min`;
};
