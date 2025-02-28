import { myStore, paramsAtom } from "../settings/store";

export const getValueFromParam = (paramLabel: string, propLabel: string) => {
  const paramList = myStore.get(paramsAtom);
  let value;
  if (paramList.length > 0) {
    const selectedParam = paramList.find((param) => param.name === paramLabel);
    if (selectedParam) {
      const selectedProp = selectedParam.props.find(
        (prop) => prop.label === propLabel,
      );
      if (selectedProp) {
        value = selectedProp.value;
      }
    }
  }
  return value;
};
