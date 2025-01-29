import { BsFillEnvelopeAtFill } from "react-icons/bs";
import Avatar from "../avatar";
import CrossButton from "../buttons/crossButton";
import EditIcon from "../editIcon";
import ExternalLink from "../externalLink";
import Upploader from "../uploader";
import MDEditor from "@uiw/react-md-editor";
import { FaLink } from "react-icons/fa";
import { confirmBox, myStore } from "../../settings/store";
import { useTranslation } from "react-i18next";
import ShareButton from "../buttons/shareButton";
import { deleteImage } from "../../utils/procedures";
import { UserModel } from "../../models/userModel";

interface PersonalProps {
  citizen: UserModel;
  owner: boolean;
  updatePath: (path: string, value: string, needConfirm?: boolean) => void;
}

export default function Personal({
  citizen,
  owner,
  updatePath,
}: PersonalProps) {
  const { t } = useTranslation();

  const handleDeleteImage = async () => {
    myStore.set(confirmBox, {
      action: "",
      text: t("components.modals.confirmModal.deleteFile"),
      result: "",
      actionToDo: async () => {
        const result = await deleteImage(citizen.avatar);
        if (result) {
          updatePath("avatar", "", false);
        }
      },
    });
  };

  return (
    <section className="w-full flex flex-col items-center">
      <div className="relative flex flex-col items-center">
        <Avatar url={citizen.avatar} isUser={true} bigSize={true} />
        {owner &&
          (citizen.avatar != "" ? (
            <CrossButton small={true} click={handleDeleteImage} />
          ) : (
            <Upploader path="avatar" maxSize={500000} updatePath={updatePath} />
          ))}
      </div>
      <div className="flex items-center justify-center gap-6">
        <span className="flex items-center gap-1">
          <ExternalLink
            url={citizen.link}
            children={<FaLink />}
            hover={t("components.hoverInfos.links.website")}
          />
          {owner && (
            <EditIcon target="citizen" param={citizen.link} path="link" />
          )}
        </span>
        <span className="flex items-center gap-1">
          <ExternalLink
            url={citizen.email != "" ? "mailto:" + citizen.email : ""}
            children={<BsFillEnvelopeAtFill />}
            hover={t("components.hoverInfos.links.email")}
          />
          {owner && (
            <EditIcon
              target="citizen"
              param={citizen.email}
              path="email"
              action={updatePath}
            />
          )}
        </span>
        <ShareButton label={citizen.name} />
      </div>
      <div className="w-full max-w-[300px] md:max-w-lg mt-4 justify-center flex gap-2">
        {citizen.bio ? (
          <MDEditor.Markdown
            className="bg-transparent text-light text-justify mde-markdown"
            source={citizen.bio}
          />
        ) : (
          <em className="text-center">{t("pages.citizen.noBio")}</em>
        )}

        {owner && (
          <EditIcon
            target="citizen"
            param={citizen.bio ? citizen.bio : ""}
            path="bio"
            action={updatePath}
          />
        )}
      </div>
    </section>
  );
}
