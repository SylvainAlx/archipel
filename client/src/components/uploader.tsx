/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { useEffect, useState } from "react";
import { myStore, sessionAtom } from "../settings/store";

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
    let objetCourant;
    let dernierePartie;
    switch (destination) {
      case "nation":
        // eslint-disable-next-line no-case-declarations
        const updatedNation: any = { ...session.nation };
        objetCourant = updatedNation;
        for (let i = 0; i < parties.length - 1; i++) {
          if (typeof objetCourant === "object" && objetCourant !== null) {
            objetCourant = objetCourant[parties[i]];
          } else {
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
        // updatedNation.officialId = session.user.officialId;

        // setConfirm({
        //   action: "updateNation",
        //   text: "Mettre à jour votre nation ?",
        //   result: "",
        //   target: "",
        //   payload: updatedNation,
        // });
        break;
    }
  };

  return (
    <div>
      <FileUploaderRegular
        onChange={handleChangeEvent}
        pubkey="beb08a8d071d2a8b6615"
        maxLocalFileSizeBytes={500000}
        multiple={false}
        imgOnly={true}
        sourceList="local, url, gdrive, instagram"
        useCloudImageEditor={false}
        classNameUploader="my-config uc-dark"
      />
    </div>
  );
}
