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
    if (!reponse.ok) {
      console.error(
        `${new Date().toISOString()} : Ping error with code ${reponse.status}`,
      );
    }
  } catch (erreur) {
    console.error(`${new Date().toISOString()} : Ping error :`, erreur.message);
  }
};

export const handleError = (AError, ARes) => {
  console.error(AError);
  let statusCode;
  if (AError.code) {
    statusCode = AError.code;
  } else {
    statusCode = AError.name === "ValidationError" ? 400 : 500;
  }
  ARes.status(statusCode).json({ infoType: statusCode.toString() });
};
