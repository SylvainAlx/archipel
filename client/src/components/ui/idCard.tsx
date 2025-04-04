import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Button from "./buttons/button";
import { NationModel } from "../../models/nationModel";
import { UserModel } from "../../models/userModel";
import { useTranslation } from "react-i18next";
import { getFormatedDate, getGender } from "../../utils/functions";
import { myStore, placeListAtomV2 } from "../../settings/store";
import { IoMdDownload } from "react-icons/io";

interface IDCardProps {
  user: UserModel;
  nation: NationModel;
}

export default function IDCard({ user, nation }: IDCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useTranslation();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fond général
    ctx.fillStyle = "#64748b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const background = new Image();
    background.crossOrigin = "anonymous";
    background.src = "/illustrations/idBackground.webp";
    background.onload = () => {
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      // Header
      ctx.fillStyle = "#081825";
      ctx.fillRect(0, 0, canvas.width, 200);

      const logo = new Image();
      logo.crossOrigin = "anonymous";
      logo.src = "/logo.webp";
      logo.onload = () => {
        ctx.drawImage(logo, 1100, 25, 150, 150);
      };

      // Footer
      ctx.fillStyle = "#081825";
      ctx.fillRect(0, 750, canvas.width, 50);
      ctx.fillStyle = "#ffffff";
      ctx.font = "25px Arial";
      ctx.fillText("ARCHIPEL-APP.COM", 520, 785);

      // Légende
      ctx.fillStyle = "#081825";
      ctx.font = "40px Arial";
      ctx.fillText("ID N°", 375, 300);
      ctx.fillText(t("components.form.input.name") + " : ", 375, 375);
      ctx.fillText(t("components.hoverInfos.tags.gender") + " : ", 375, 450);
      ctx.fillText(t("components.hoverInfos.tags.residence") + " : ", 375, 525);
      ctx.fillText(
        t("components.hoverInfos.tags.registration") + " : ",
        375,
        600,
      );
      ctx.fillText("édition" + " : ", 375, 675);

      // Informations personnelles
      ctx.fillStyle = "#000";
      ctx.font = "bold 40px Arial";
      ctx.fillText(user.officialId.toUpperCase(), 585, 300);
      ctx.fillText(user.name, 585, 375);
      ctx.fillText(getGender(user.gender), 585, 450);
      ctx.fillText(
        myStore
          .get(placeListAtomV2)
          .findPlaceName(
            user.citizenship.residence,
            t("pages.citizen.noResidence"),
          ),
        585,
        525,
      );
      ctx.fillText(getFormatedDate(user.createdAt), 585, 600);
      ctx.fillText(getFormatedDate(new Date()), 585, 675);

      const avatar = new Image();
      avatar.crossOrigin = "anonymous";
      avatar.src = user.avatar;
      avatar.onload = () => {
        const maxSize = 300; // Taille maximale de l'affichage
        const ratio = Math.min(maxSize / avatar.width, maxSize / avatar.height);
        const newWidth = avatar.width * ratio;
        const newHeight = avatar.height * ratio;
        ctx.drawImage(avatar, 37.5, 250, newWidth, newHeight);
        // setIsImageLoaded(true);
      };
      avatar.onerror = () => {
        const noAvatar = new Image();
        noAvatar.crossOrigin = "anonymous";
        noAvatar.src = "/no-avatar.webp";
        noAvatar.onload = () => {
          ctx.drawImage(noAvatar, 37.5, 250, 300, 300);
          // setIsImageLoaded(true);
        };
        console.error("Failed to load image, check CORS policy.");
      };

      // Affichage du drapeau national
      if (nation.officialId !== "") {
        const flag = new Image();
        flag.crossOrigin = "anonymous";
        flag.src = nation.data.url.flag;
        flag.onload = () => {
          const maxSize = 125; // Taille maximale de l'affichage
          const ratio = Math.min(maxSize / flag.width, maxSize / flag.height);
          const newWidth = flag.width * ratio;
          const newHeight = flag.height * ratio;
          ctx.drawImage(flag, 37.5, 37.5, newWidth, newHeight);
          // setIsImageLoaded(true);
        };
        flag.onerror = () =>
          console.error("Failed to load flag image, check CORS policy.");
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 40px Arial";
        ctx.fillText(nation.name.toUpperCase(), 200, 110);
      }
      setIsImageLoaded(true);
    };
  }, [user, nation, t]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const qrCanvas = qrCanvasRef.current;
    if (!canvas || !qrCanvas) return;
    const ctx = canvas.getContext("2d");
    const qrCtx = qrCanvas.getContext("2d");
    if (!ctx || !qrCtx) return;
    const qrImage = new Image();
    qrImage.src = qrCanvas.toDataURL();
    qrImage.onload = () => {
      ctx.drawImage(
        qrImage,
        canvas.width - 187.5,
        canvas.height - 237.5,
        150,
        150,
      );
    };

    if (!isImageLoaded) return;
  }, [isImageLoaded]);

  const exportToImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const imgURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgURL;
      link.download = `${new Date().toLocaleDateString("en-CA")}_${user.name}_id_card.png`;
      link.click();
    } catch (error) {
      console.error("Export failed due to CORS restrictions", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 gap-2">
      <canvas
        ref={canvasRef}
        width={1268}
        height={800}
        className="animate-fade border w-full max-w-xl min-w-[300px] h-auto"
      />
      <QRCodeCanvas
        ref={qrCanvasRef}
        value={window.location.href}
        size={250}
        className="hidden"
      />
      <Button click={exportToImage} text={t("components.idCard.download")}>
        <IoMdDownload />
      </Button>
    </div>
  );
}
