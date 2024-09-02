/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { useEffect, useState } from "react";
import { myStore, sessionAtom } from "../settings/store";
import { updateNation } from "../api/nation/nationAPI";
import { updateUser } from "../api/user/userAPI";
import { UPLOADCARE_PUBLIC_KEY } from "../settings/consts";

export interface UploaderProps {
  path: string;
  destination: string;
}

export default function Upploader({ path, destination }: UploaderProps) {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    if (files.length > 0) {
      console.log(files[0].cdnUrl);
      console.log(path, destination);
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const handleChangeEvent = (items: any) => {
    setFiles([
      ...items.allEntries.filter((file: any) => file.status === "success"),
    ]);
  };

  const handleSubmit = () => {
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
    }
  };

  return (
    <div>
      <FileUploaderRegular
        onChange={handleChangeEvent}
        pubkey={UPLOADCARE_PUBLIC_KEY}
        maxLocalFileSizeBytes={200000}
        multiple={false}
        imgOnly={true}
        sourceList="local, url, gdrive, instagram"
        useCloudImageEditor={false}
        classNameUploader="my-config uc-dark"
        confirmUpload={true}
        useLocalImageEditor={true}
      />
    </div>
  );
}
