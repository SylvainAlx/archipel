/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { useState } from "react";
import { UPLOADCARE_PUBLIC_KEY } from "../settings/consts";
import { Place } from "../types/typPlace";
import {
  highConfidencePredictions,
  verifyImage,
} from "../utils/AIModels/nsfwJs";
import { errorMessage } from "../utils/toasts";
import { updateElement } from "../utils/functions";
import "../assets/styles/uploader.css";
import { useTranslation } from "react-i18next";
import { createNewCom } from "../api/communication/comAPI";
import { ComPayload } from "../types/typCom";
import { loadingAtom, myStore, sessionAtom } from "../settings/store";

export interface UploaderProps {
  path: string;
  destination: string;
  maxSize: number;
  place?: Place;
}

export default function Upploader({
  path,
  destination,
  maxSize,
  place,
}: UploaderProps) {
  const [showUploader, setShowUploader] = useState(true);
  const { t } = useTranslation();

  const handleAdd = async (AFileInfo: any) => {
    const AFile = AFileInfo.file as File;
    if (!AFile) return;

    myStore.set(loadingAtom, true);
    const { isNSFW, predictions } = await verifyImage(AFile);
    myStore.set(loadingAtom, false);

    if (isNSFW) {
      errorMessage(t("toasts.errors.nsfw"));
      const payload: ComPayload = {
        comType: 0,
        destination: "",
        origin: myStore.get(sessionAtom).user.officialId,
        title: "NSFW",
        message: highConfidencePredictions(predictions)[0].className,
      };
      createNewCom(payload);
      setShowUploader(false);
      return false;
    }
  };

  const handleSubmit = async (AFileInfo: any) => {
    if (AFileInfo && AFileInfo.cdnUrl) {
      updateElement(destination, path, AFileInfo.cdnUrl, place);
    } else {
      console.error("Impossible de récupérer l'UUID du fichier.");
    }
  };

  return (
    <div>
      {showUploader && (
        <FileUploaderRegular
          pubkey={UPLOADCARE_PUBLIC_KEY}
          onFileAdded={handleAdd}
          onFileUploadSuccess={(e) => handleSubmit(e)}
          maxLocalFileSizeBytes={maxSize}
          multiple={false}
          imgOnly={true}
          sourceList="local, url, gdrive, instagram"
          useCloudImageEditor={false}
          classNameUploader="uploader"
          confirmUpload={true}
        />
      )}
    </div>
  );
}
