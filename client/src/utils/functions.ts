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
  if (value >= -20 && value <= 20) {
    return "Centriste";
  } else if (value >= -60 && value < 20) {
    return "Gauche modérée";
  } else if (value >= -90 && value < -60) {
    return "Gauche radicale";
  } else if (value > 20 && value <= 60) {
    return "Droite modérée";
  } else if (value > 60 && value <= 90) {
    return "Droite radicale";
  }
};
