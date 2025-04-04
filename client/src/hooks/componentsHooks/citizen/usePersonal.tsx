import { useTranslation } from "react-i18next";
import { UserModel } from "../../../models/userModel";
import { confirmBox, myStore } from "../../../settings/store";
import { deleteImage } from "../../../utils/procedures";

export default function usePersonal(
  citizen: UserModel,
  updatePath: (path: string, value: string, needConfirm?: boolean) => void,
) {
  const { t } = useTranslation();
  const handleDeleteImage = async () => {
    myStore.set(confirmBox, {
      text: t("components.modals.confirmModal.deleteFile"),
      actionToDo: async () => {
        const result = await deleteImage(citizen.avatar);
        if (result) {
          updatePath("avatar", "", false);
        }
      },
    });
  };

  return {
    handleDeleteImage,
    t,
  };
}
