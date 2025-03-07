/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { banContentFetch, reportContentFetch } from "../services/commonService";
import { successMessage } from "../utils/toasts";

export class CommonModel {
  officialId: string = "";
  reported: boolean = false;
  banished: boolean = false;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  reportContent = async (reverse = false) => {
    try {
      await reportContentFetch(this.officialId, reverse);
      if (reverse) {
        successMessage("signalement retiré et contenu affiché");
      } else {
        successMessage("contenu signalé et rendu inaccessible");
      }
    } catch (error) {
      console.error(error);
    }
  };

  banContent = async (reverse = false) => {
    try {
      await banContentFetch(this.officialId, reverse);
      if (reverse) {
        successMessage(`Réindexation du contenu ${this.officialId}`);
      } else {
        successMessage(`désindexation du contenu ${this.officialId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  updateOne = (
    path: string,
    value: any,
  ): { isSuccess: boolean; updatedObject: any } => {
    let isSuccess = true;
    let currentObject: any = this;
    const parts: string[] = path.split(".");

    for (let i = 0; i < parts.length - 1; i++) {
      if (
        typeof currentObject === "object" &&
        currentObject !== null &&
        parts[i] in currentObject
      ) {
        currentObject = currentObject[parts[i]];
      } else {
        isSuccess = false;
        console.error(
          `Invalid path. Property '${parts[i]}' not found or not an object.`,
        );
        return { isSuccess, updatedObject: this };
      }
    }

    const lastPart = parts[parts.length - 1];
    if (typeof currentObject === "object" && currentObject !== null) {
      currentObject[lastPart] = value;
    } else {
      isSuccess = false;
      console.error(`Cannot set property '${lastPart}' on a non-object value.`);
    }

    return { isSuccess, updatedObject: this };
  };
}
