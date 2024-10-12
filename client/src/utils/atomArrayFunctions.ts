/* eslint-disable @typescript-eslint/no-explicit-any */

// _id MongoDB

export const spliceByDBId = (id: string, atoms: any[]) => {
  const tempArray: any[] = [...atoms];
  for (let i = 0; i < atoms.length; i++) {
    if (atoms[i]._id === id) {
      tempArray.splice(i, 1);
      break;
    }
  }
  return tempArray;
};

export const updateByDBId = (atom: any, atoms: any[]) => {
  const tempArray: any[] = [...atoms];
  for (let i = 0; i < atoms.length; i++) {
    if (atoms[i]._id === atom._id) {
      tempArray[i] = atom;
      break;
    }
  }
  return tempArray;
};
