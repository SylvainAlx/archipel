import Place from "../models/placeSchema.js";

export const updateResidence = async (oldResidenceId, newResidenceId) => {
  let newResidence;
  let oldResidence;
  if (oldResidenceId != newResidenceId) {
    oldResidence = await Place.findOne({
      officialId: oldResidenceId,
    });
    if (oldResidence && oldResidence.population > 0) {
      oldResidence.population -= 1;
      await oldResidence.save();
    }
    newResidence = await Place.findOne({
      officialId: newResidenceId,
    });

    if (newResidence) {
      newResidence.population += 1;
      await newResidence.save();
    } else {
      newResidence = null;
    }
  } else {
    newResidence = null;
    oldResidence = null;
  }
  return {
    newResidence,
    oldResidence,
  };
};
