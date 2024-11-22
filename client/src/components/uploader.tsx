/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { useState } from "react";
import { myStore, sessionAtom } from "../settings/store";
import { updateNation } from "../api/nation/nationAPI";
import { updateUser } from "../api/user/userAPI";
import { UPLOADCARE_PUBLIC_KEY } from "../settings/consts";
import { Place } from "../types/typPlace";
import { updatePlace } from "../api/place/placeAPI";
import { verifyImage } from "../utils/AIModels/nsfwJs";
import { errorMessage } from "../utils/toasts";

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
  const [files, setFiles] = useState<any[]>([]);
  const [showUploader, setShowUploader] = useState(true); // État pour afficher/masquer le composant

  // Gestion de l'upload après la sélection du fichier
  const handleUpload = async (AFileInfo: any) => {
    const AFile = AFileInfo.file as File;
    if (!AFile) return;

    const isNSFW = await verifyImage(AFile);

    if (isNSFW) {
      errorMessage(
        "[A TRADUIRE] L'image contient du contenu NSFW et a été retirée.",
      );
      // Retirer l'image de la liste des fichiers
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file.internalId !== AFileInfo.internalId),
      );
      setShowUploader(false); // Masquer le composant
    } else {
      setFiles((prevFiles) => [...prevFiles, AFileInfo]);
    }
  };

  const handleSubmit = async () => {
    const session = myStore.get(sessionAtom);
    const parties: string[] = path.split(".");
    let isOk = true;
    let objetCourant;
    let dernierePartie;
    switch (destination) {
      case "nation":
        const updatedNation: any = { ...session.nation };
        objetCourant = updatedNation;
        for (let i = 0; i < parties.length - 1; i++) {
          if (typeof objetCourant === "object" && objetCourant !== null) {
            objetCourant = objetCourant[parties[i]];
          } else {
            isOk = false;
            console.error(
              `Chemin incorrect. Propriété ${parties[i]} non trouvée.`,
            );
            break;
          }
        }
        dernierePartie = parties[parties.length - 1];
        if (typeof objetCourant === "object" && objetCourant !== null) {
          objetCourant[dernierePartie] = files[0].cdnUrl;
        }

        if (isOk) {
          updateNation(updatedNation);
        }

        break;
      case "citizen":
        // eslint-disable-next-line no-case-declarations
        const updatedUser: any = { ...session.user };
        objetCourant = updatedUser;
        for (let i = 0; i < parties.length - 1; i++) {
          if (typeof objetCourant === "object" && objetCourant !== null) {
            objetCourant = objetCourant[parties[i]];
          } else {
            isOk = false;
            console.error(
              `Chemin incorrect. Propriété ${parties[i]} non trouvée.`,
            );
            break;
          }
        }
        dernierePartie = parties[parties.length - 1];
        if (typeof objetCourant === "object" && objetCourant !== null) {
          objetCourant[dernierePartie] = files[0].cdnUrl;
        }

        if (isOk) {
          updateUser(updatedUser);
        }

        break;
      case "place":
        // eslint-disable-next-line no-case-declarations
        const updatedPlace: any = { ...place };
        objetCourant = updatedPlace;
        for (let i = 0; i < parties.length - 1; i++) {
          if (typeof objetCourant === "object" && objetCourant !== null) {
            objetCourant = objetCourant[parties[i]];
          } else {
            isOk = false;
            console.error(
              `Chemin incorrect. Propriété ${parties[i]} non trouvée.`,
            );
            break;
          }
        }
        dernierePartie = parties[parties.length - 1];
        if (typeof objetCourant === "object" && objetCourant !== null) {
          objetCourant[dernierePartie] = files[0].cdnUrl;
        }

        if (isOk) {
          console.log(updatePlace);

          updatePlace(updatedPlace);
        }

        break;
    }
  };

  return (
    <div>
      {showUploader && (
        <FileUploaderRegular
          pubkey={UPLOADCARE_PUBLIC_KEY}
          onFileAdded={handleUpload}
          maxLocalFileSizeBytes={maxSize}
          multiple={false}
          imgOnly={true}
          sourceList="local, url, gdrive, instagram"
          useCloudImageEditor={false}
          classNameUploader="my-config uc-dark"
          confirmUpload={true}
          onUploadClick={() => files.length > 0 && handleSubmit}
        />
      )}
    </div>
  );
}
