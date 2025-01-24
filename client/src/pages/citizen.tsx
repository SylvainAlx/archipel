import { useAtom } from "jotai";
import H1 from "../components/titles/h1";
import {
  citizenFetchAtom,
  confirmBox,
  nationPlaceListAtomV2,
  sessionAtom,
} from "../settings/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LabelId } from "../types/typNation";
import EditIcon from "../components/editIcon";
import {
  getDocumentTitle,
  getLabelIdArrayFromNationPlaceList,
} from "../utils/functions";
import { ConfirmBoxDefault } from "../types/typAtom";
import ReportPanel from "../components/reportPanel";
import { COM_GENERAL_DESTINATION, COM_TYPE } from "../settings/consts";
import { getOneUser } from "../api/user/userAPI";
import CitizensCom from "../components/citizen/citizensCom";
import Personal from "../components/citizen/personal";
import Citizenship from "../components/citizen/citizenship";
import Settings from "../components/citizen/settings";
import { displayUnwatchedComs } from "../utils/procedures";
import { ComListModel } from "../models/lists/comListModel";
import { NationModel } from "../models/nationModel";

export default function Citizen() {
  const navigate = useNavigate();
  const param = useParams();

  const [citizen, setCitizen] = useAtom(citizenFetchAtom);
  const [nation, setNation] = useState<NationModel>(new NationModel());
  const [comList] = useState<ComListModel>(new ComListModel());
  const [session] = useAtom(sessionAtom);
  const [confirm, setConfirm] = useAtom(confirmBox);

  const [nationPlaces] = useAtom(nationPlaceListAtomV2);
  const [, setPlacesList] = useState<LabelId[]>([]);

  const owner = session.user.officialId === citizen.officialId;

  useEffect(() => {
    if (param.id) {
      if (session.user.officialId === param.id) {
        setCitizen(session.user);
        comList.loadComList("", session.user.officialId, [
          COM_TYPE.userPrivate.id,
          COM_TYPE.userUpdate.id,
          COM_TYPE.general.id,
        ]);
      } else if (citizen.officialId != param.id) {
        getOneUser(param.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id, session.user]);

  useEffect(() => {
    const loadNation = async (officialId: string) => {
      const loadedNation = await nation.loadNation(officialId);
      setNation(loadedNation);
    };
    if (
      citizen.citizenship.nationId != "" &&
      nation.officialId != citizen.citizenship.nationId
    ) {
      loadNation(citizen.citizenship.nationId);
    }

    document.title = getDocumentTitle(citizen.name);
    return () => {
      document.title = getDocumentTitle("");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citizen]);

  useEffect(() => {
    if (
      owner &&
      comList.getItems().length > 0 &&
      comList.getItems()[0].destination === citizen.officialId
    ) {
      displayUnwatchedComs(COM_GENERAL_DESTINATION, comList.getItems());
      displayUnwatchedComs(citizen.officialId, comList.getItems());
    }
  }, [comList]);

  useEffect(() => {
    if (
      nationPlaces.getItems().length > 0 &&
      nation.officialId != undefined &&
      nation.officialId !== ""
    ) {
      const list = getLabelIdArrayFromNationPlaceList();
      setPlacesList(list);
    }
  }, [nation.officialId, nationPlaces]);

  useEffect(() => {
    if (confirm.action === "deleteUser" && confirm.result === "OK") {
      navigate(`/`);
      setConfirm(ConfirmBoxDefault);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm]);

  return (
    <>
      <div className="flex items-center gap-1">
        <H1 text={citizen.name} />
        {owner && (
          <EditIcon target="citizen" param={citizen.name} path="name" />
        )}
      </div>
      <section className="w-full flex flex-wrap gap-8 items-start justify-between">
        {(!citizen.reported || owner) && (
          <>
            <Personal citizen={citizen} owner={owner} />
            <Citizenship citizen={citizen} nation={nation} owner={owner} />
          </>
        )}
        {owner ? (
          <Settings citizen={citizen} />
        ) : (
          <div className="w-full flex justify-center">
            <ReportPanel content={citizen} />
          </div>
        )}
        {owner && <CitizensCom citizen={citizen} citizenComList={comList} />}
      </section>
    </>
  );
}
