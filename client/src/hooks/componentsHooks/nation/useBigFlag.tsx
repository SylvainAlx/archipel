import { useTranslation } from "react-i18next";
import { confirmBox, myStore } from "../../../settings/store";
import { deleteImage } from "../../../utils/procedures";
import { NationModel } from "../../../models/nationModel";

export default function useBigFlag(
  nation: NationModel,
  updatePath: (path: string, value: string, needConfirm?: boolean) => void,
) {
  const { t } = useTranslation();
  const handleDeleteImage = async () => {
    myStore.set(confirmBox, {
      text: t("components.modals.confirmModal.deleteFile"),
      actionToDo: async () => {
        const result = await deleteImage(nation.data.url.flag);
        if (result) {
          updatePath("data.url.flag", "", false);
        }
      },
    });
  };

  return {
    handleDeleteImage,
    t,
  };
}
