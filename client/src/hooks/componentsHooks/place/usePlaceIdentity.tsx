import { useTranslation } from "react-i18next";
import { PlaceModel } from "../../../models/placeModel";
import { confirmBox, myStore } from "../../../settings/store";
import { deleteImage } from "../../../utils/procedures";

export default function usePlaceChildren(
  place: PlaceModel,
  updatePath: (path: string, value: string, needConfirm?: boolean) => void,
) {
  const { t } = useTranslation();

  const handleDeleteImage = async () => {
    myStore.set(confirmBox, {
      text: t("components.modals.confirmModal.deleteFile"),
      actionToDo: async () => {
        const result = await deleteImage(place.image);
        if (result) {
          updatePath("image", "", false);
        }
      },
    });
  };

  return {
    handleDeleteImage,
    t,
  };
}
