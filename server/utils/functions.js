export const createOfficialId = (type) => {
  const genRanHex = (size) =>
    [...Array(size)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");

  const date = new Date();
  const currentYear = date.getFullYear();
  const lastTwoDigits = currentYear % 100;
  return lastTwoDigits + type + genRanHex(8);
};

export const findElementInMemory = (array, id, officialId) => {
  array.forEach((element) => {
    if (element._id === id && !officialId) {
      return element;
    }
    if (element.officialId === id && officialId) {
      return element;
    }
  });
  return null;
};

export const findNationElements = (array, nationId) => {
  const elements = [];
  array.forEach((element) => {
    if (element.nation === nationId) {
      elements.push(element);
    }
  });
  return elements;
};

export const createElementInMemory = (array, element) => {
  array.push(element);
};

export const deleteElementInMemory = (array, id) => {
  let updatedArray = [...array];
  array.forEach((element, i) => {
    if (element._id === id) {
      updatedArray.splice(i, 1);
    }
  });
  array = updatedArray;
};

export const updateElementInMemory = (array, element) => {
  let updatedArray = [...array];
  array.forEach((e, i) => {
    if (e._id === element._id) {
      updatedArray[i] = element;
    }
  });
  array = updatedArray;
};

export const deleteFile = async (uuid) => {
  const authorization = `${process.env.UPLOADCARE_PUBLIC_KEY}:${process.env.UPLOADCARE_SECRET_KEY}`;

  try {
    const response = await fetch(
      `https://api.uploadcare.com/files/${uuid}/storage/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Uploadcare.Simple ${authorization}`,
          Accept: "application/vnd.uploadcare-v0.7+json",
          "Content-Type": "application/json",
        },
      },
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addMonths = (months) => {
  const result = new Date();
  result.setMonth(result.getMonth() + months);
  return result;
};

export const pingBackend = async () => {
  try {
    const reponse = await fetch(process.env.BACKEND_URL);
    if (reponse.ok) {
      console.log(
        `${new Date().toISOString()} : Ping with code ${reponse.status}`,
      );
    } else {
      console.error(
        `${new Date().toISOString()} : Ping error with code ${reponse.status}`,
      );
    }
  } catch (erreur) {
    console.error(`${new Date().toISOString()} : Ping error :`, erreur.message);
  }
};
