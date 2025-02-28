import { useEffect } from "react";
import {
  comListAtomV2,
  nationListAtomV2,
  paramsAtom,
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
    params: false,
  };
  const [session] = useAtom(sessionAtom);
  const [nationList] = useAtom(nationListAtomV2);
  const [placeList] = useAtom(placeListAtomV2);
  const [userList] = useAtom(userListAtomV2);
  const [comList] = useAtom(comListAtomV2);
  const [tileList] = useAtom(tileListAtomV2);
  const [relations] = useAtom(relationListAtomV2);
  const [params] = useAtom(paramsAtom);

  DEBUG_ATOM.session &&
    useEffect(() => {
      console.log(session);
    }, [session]);

  DEBUG_ATOM.nations &&
    useEffect(() => {
      console.log(
        new Date().toLocaleTimeString() +
          " nations : " +
          nationList.getItems().length,
      );
    }, [nationList]);

  DEBUG_ATOM.places &&
    useEffect(() => {
      console.log(
        new Date().toLocaleTimeString() +
          " lieux : " +
          placeList.getItems().length,
      );
    }, [placeList]);

  DEBUG_ATOM.users &&
    useEffect(() => {
      console.log(
        new Date().toLocaleTimeString() +
          " utilisateurs : " +
          userList.getItems().length,
      );
    }, [userList]);

  DEBUG_ATOM.coms &&
    useEffect(() => {
      console.log(
        new Date().toLocaleTimeString() +
          " coms : " +
          comList.getItems().length,
      );
    }, [comList]);

  DEBUG_ATOM.tiles &&
    useEffect(() => {
      console.log(
        new Date().toLocaleTimeString() +
          " tuiles : " +
          tileList.getItems().length,
      );
    }, [tileList]);

  DEBUG_ATOM.relations &&
    useEffect(() => {
      console.log(
        new Date().toLocaleTimeString() +
          " relations : " +
          relations.getItems().length,
      );
    }, [relations]);

  DEBUG_ATOM.params &&
    useEffect(() => {
      console.log(params);
    }, [params]);
};

export default useDebugAtom;
