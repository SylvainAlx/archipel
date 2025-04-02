import { useTranslation } from "react-i18next";
import { confirmBox, myStore } from "../../../settings/store";
import { deleteImage } from "../../../utils/procedures";
import { NationModel } from "../../../models/nationModel";

export default function useNationMap(
  selectedNation: NationModel,
  updatePath: (path: string, value: string, needConfirm?: boolean) => void,
) {
  const { t } = useTranslation();
  const handleDeleteImage = async () => {
    myStore.set(confirmBox, {
      text: t("components.modals.confirmModal.deleteFile"),
      actionToDo: async () => {
        const result = await deleteImage(selectedNation.data.url.map);
        if (result) {
          updatePath("data.url.map", "", false);
        }
      },
    });
  };

  return {
    handleDeleteImage,
    t,
  };
}
