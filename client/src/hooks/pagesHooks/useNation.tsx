import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  confirmBox,
  infoModalAtom,
  myStore,
  nationListAtomV2,
  sessionAtom,
} from "../../settings/store";
import { errorMessage } from "../../utils/toasts";
import { NationModel } from "../../models/nationModel";
import { NationListModel } from "../../models/lists/nationListModel";
import { useLoadNationPlaces } from "../../hooks/useLoadNationPlaces";
import { ADMIN_EMAIL } from "../../settings/consts";

export function useNation() {
  const [nation, setNation] = useState<NationModel>(new NationModel());
  const [nationList, setNationList] = useAtom(nationListAtomV2);
  const [session] = useAtom(sessionAtom);
  const [owner, setOwner] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const param = useParams();
  const nationPlaceList = useLoadNationPlaces(nation);

  useEffect(() => {
    if (
      session.user.citizenship.nationOwner &&
      session.user.citizenship.nationId === param.id
    ) {
      setOwner(true);
    } else {
      setOwner(false);
    }
  }, [session.user, nation, param.id]);

  useEffect(() => {
    const loadNation = async (officialId: string) => {
      const loadedNation = await nation.loadNation(officialId);
      setNation(loadedNation);
    };
    if (!nation) {
      navigate(`/`);
      errorMessage(t("toasts.errors.404"));
    }
    if (nation && nation.officialId !== param.id && param.id) {
      loadNation(param.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id, t]);

  const handleDelete = () => {
    const password = window.prompt(t("components.form.input.password"));
    if (password) {
      myStore.set(confirmBox, {
        text: t("components.modals.confirmModal.deleteNation"),
        actionToDo: () => {
          nation.baseDelete(password);
          const updatedList = nationList.removeByOfficialId(nation.officialId);
          setNationList(new NationListModel(updatedList));
          navigate(`/citizen/${session.user.officialId}`);
        },
      });
    }
  };

  const giveOwnerShip = () => {
    const buyerOfficialId = window.prompt(
      t("components.form.input.buyerOfficialId"),
    );
    if (buyerOfficialId) {
      const password = window.prompt(t("components.form.input.password"));
      if (password) {
        myStore.set(confirmBox, {
          text: t("components.modals.confirmModal.giveOwnership"),
          actionToDo: async () => {
            const updatedNation = await nation.giveOwnership(
              buyerOfficialId.toLowerCase(),
              password,
            );
            setNation(updatedNation);
          },
        });
      }
    }
  };

  const askOfficial = () => {
    myStore.set(infoModalAtom, {
      subtitle: t("components.buttons.askOfficial"),
      children: (
        <div className="flex flex-col gap-2">
          {t("components.modals.infoModal.askOfficial")
            .split("|")
            .map((e, i) => {
              if (i != 1) {
                return <p key={i}>{e}</p>;
              } else {
                return (
                  <code className="bg-black_alpha p-2 rounded" key={i}>
                    {e}
                  </code>
                );
              }
            })}
          <strong className="self-center py-4">{ADMIN_EMAIL}</strong>
        </div>
      ),
    });
  };

  const updatePath = (
    path: string,
    value: string,
    needConfirm: boolean = true,
  ) => {
    const updatedNation = nation.updateOne(path, value);
    const baseUpdate = async () => {
      const nationInBase = await updatedNation.updatedObject.baseUpdate();
      setNation(nationInBase);
    };
    if (updatedNation.isSuccess) {
      if (needConfirm) {
        myStore.set(confirmBox, {
          text: t("components.modals.confirmModal.updateNation"),
          actionToDo: baseUpdate,
        });
      } else {
        baseUpdate();
      }
    }
  };

  return {
    nation,
    owner,
    nationPlaceList,
    handleDelete,
    giveOwnerShip,
    askOfficial,
    updatePath,
    t,
  };
}
