import { BsFillEnvelopeAtFill } from "react-icons/bs";
import Avatar from "../ui/avatar";
import CrossButton from "../ui/buttons/crossButton";
import EditButton from "../ui/buttons/editButton";
import ExternalLink from "../ui/externalLink";
import Upploader from "../ui/uploader";
import MDEditor from "@uiw/react-md-editor";
import { FaLink } from "react-icons/fa";
import { confirmBox, myStore } from "../../settings/store";
import { useTranslation } from "react-i18next";
import ShareButton from "../ui/buttons/shareButton";
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
      text: t("components.modals.confirmModal.deleteFile"),
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
            hover={t("components.hoverInfos.links.website")}
          >
            <FaLink />
          </ExternalLink>
          {owner && (
            <EditButton
              editBox={{
                target: "citizen",
                original: citizen.link,
                new: citizen.link,
                path: "link",
                action: updatePath,
              }}
            />
          )}
        </span>
        <span className="flex items-center gap-1">
          <ExternalLink
            url={citizen.email != "" ? "mailto:" + citizen.email : ""}
            hover={t("components.hoverInfos.links.email")}
          >
            <BsFillEnvelopeAtFill />
          </ExternalLink>
          {owner && (
            <EditButton
              editBox={{
                target: "citizen",
                original: citizen.email,
                new: citizen.email,
                path: "email",
                action: updatePath,
              }}
            />
          )}
        </span>
        <ShareButton label={citizen.name} />
      </div>
      <div className="w-full max-w-3xl mt-4 justify-center flex gap-2">
        {citizen.bio ? (
          <MDEditor.Markdown
            className="bg-transparent text-light text-justify mde-markdown"
            source={citizen.bio}
          />
        ) : (
          <em className="text-center">{t("pages.citizen.noBio")}</em>
        )}

        {owner && (
          <EditButton
            editBox={{
              target: "citizen",
              original: citizen.bio ? citizen.bio : "",
              new: "",
              path: "bio",
              action: updatePath,
            }}
          />
        )}
      </div>
    </section>
  );
}
