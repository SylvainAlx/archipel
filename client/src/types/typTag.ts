export interface Tag {
  _id: string;
  label: {
    fr: any;
    en: any;
  };
}

export const emptyTag = {
  _id: "",
  label: {
    fr: "",
    en: "",
  },
};
