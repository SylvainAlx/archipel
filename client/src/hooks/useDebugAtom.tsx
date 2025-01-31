import { useEffect } from "react";
import {
  comListAtomV2,
  nationListAtomV2,
  placeListAtomV2,
  sessionAtom,
  userListAtomV2,
} from "../settings/store";
import { useAtom } from "jotai";

const useDebugAtom = () => {
  const DEBUG_ATOM = {
    session: true,
    nations: true,
    users: true,
    places: true,
    coms: true,
  };
  const [session] = useAtom(sessionAtom);
  const [nationList] = useAtom(nationListAtomV2);
  const [placeList] = useAtom(placeListAtomV2);
  const [userList] = useAtom(userListAtomV2);
  const [comList] = useAtom(comListAtomV2);
  useEffect(() => {
    DEBUG_ATOM.session && console.log(session);
  }, [session]);
  useEffect(() => {
    DEBUG_ATOM.nations &&
      console.log(
        new Date().toLocaleTimeString() +
          " nations : " +
          nationList.getItems().length,
      );
  }, [nationList]);
  useEffect(() => {
    DEBUG_ATOM.places &&
      console.log(
        new Date().toLocaleTimeString() +
          " lieux : " +
          placeList.getItems().length,
      );
  }, [placeList]);
  useEffect(() => {
    DEBUG_ATOM.users &&
      console.log(
        new Date().toLocaleTimeString() +
          " utilisateurs : " +
          userList.getItems().length,
      );
  }, [userList]);
  useEffect(() => {
    DEBUG_ATOM.coms &&
      console.log(
        new Date().toLocaleTimeString() +
          " coms : " +
          comList.getItems().length,
      );
  }, [comList]);
};

export default useDebugAtom;
