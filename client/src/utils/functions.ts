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
