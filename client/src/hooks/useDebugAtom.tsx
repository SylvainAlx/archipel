import { useEffect } from "react";
import {
  comListAtomV2,
  nationListAtomV2,
  placeListAtomV2,
  relationListAtomV2,
  sessionAtom,
  tileListAtomV2,
  userListAtomV2,
} from "../settings/store";
import { useAtom } from "jotai";

const useDebugAtom = () => {
  const DEBUG_ATOM = {
    session: false,
    nations: false,
    users: false,
    places: false,
    coms: false,
    tiles: false,
    relations: false,
  };
  const [session] = useAtom(sessionAtom);
  const [nationList] = useAtom(nationListAtomV2);
  const [placeList] = useAtom(placeListAtomV2);
  const [userList] = useAtom(userListAtomV2);
  const [comList] = useAtom(comListAtomV2);
  const [tileList] = useAtom(tileListAtomV2);
  const [relations] = useAtom(relationListAtomV2);
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
  useEffect(() => {
    DEBUG_ATOM.tiles &&
      console.log(
        new Date().toLocaleTimeString() +
          " tuiles : " +
          tileList.getItems().length,
      );
  }, [tileList]);
  useEffect(() => {
    DEBUG_ATOM.relations &&
      console.log(
        new Date().toLocaleTimeString() +
          " relations : " +
          relations.getItems().length,
      );
  }, [relations]);
};

export default useDebugAtom;
