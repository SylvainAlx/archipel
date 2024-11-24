/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { useState } from "react";
import { UPLOADCARE_PUBLIC_KEY } from "../settings/consts";
import { Place } from "../types/typPlace";
import { verifyImage } from "../utils/AIModels/nsfwJs";
import { errorMessage } from "../utils/toasts";
import { updateElement } from "../utils/functions";
import "../assets/styles/uploader.css";

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
  const [showUploader, setShowUploader] = useState(true); // État pour afficher/masquer le composant

  // Gestion de l'upload après la sélection du fichier
  const handleAdd = async (AFileInfo: any) => {
    const AFile = AFileInfo.file as File;
    if (!AFile) return;

    const isNSFW = await verifyImage(AFile);

    if (isNSFW) {
      errorMessage(
        "[A TRADUIRE] L'image contient du contenu NSFW et a été retirée.",
      );
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
