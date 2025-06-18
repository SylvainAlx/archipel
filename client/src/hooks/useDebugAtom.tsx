import { useEffect, useState } from "react";
import {
  comListAtomV2,
  nationListAtomV2,
  paramsAtom,
  placeListAtomV2,
  relationListAtomV2,
  sessionAtom,
  statsAtom,
  structureListAtomV2,
  tileListAtomV2,
  userListAtomV2,
} from "../settings/store";
import { useAtom } from "jotai";
import { SERVER_URL } from "../settings/consts";

const useDebugAtom = () => {
  const [enableDebug, setEnableDebug] = useState(false);
  const [session] = useAtom(sessionAtom);
  const [nationList] = useAtom(nationListAtomV2);
  const [structureList] = useAtom(structureListAtomV2);
  const [placeList] = useAtom(placeListAtomV2);
  const [userList] = useAtom(userListAtomV2);
  const [comList] = useAtom(comListAtomV2);
  const [tileList] = useAtom(tileListAtomV2);
  const [relations] = useAtom(relationListAtomV2);
  const [params] = useAtom(paramsAtom);
  const [stats] = useAtom(statsAtom);

  useEffect(() => {
    if (SERVER_URL && SERVER_URL.includes("localhost")) {
      setEnableDebug(true);
    }
  }, []);

  useEffect(() => {
    const DEBUG_ATOM = {
      session: false,
      nations: false,
      structures: false,
      users: false,
      places: false,
      coms: false,
      tiles: false,
      relations: false,
      params: false,
      stats: false,
    };

    if (enableDebug) {
      if (DEBUG_ATOM.session) {
        console.log(session);
      }
      if (DEBUG_ATOM.nations) {
        console.log(nationList);
      }
      if (DEBUG_ATOM.structures) {
        console.log(structureList);
      }
      if (DEBUG_ATOM.places) {
        console.log(placeList);
      }
      if (DEBUG_ATOM.users) {
        console.log(userList);
      }
      if (DEBUG_ATOM.coms) {
        console.log(comList);
      }
      if (DEBUG_ATOM.tiles) {
        console.log(tileList);
      }
      if (DEBUG_ATOM.relations) {
        console.log(relations);
      }
      if (DEBUG_ATOM.params) {
        console.log(params);
      }
      if (DEBUG_ATOM.stats) {
        console.log(stats);
      }
    }
  }, [
    comList,
    enableDebug,
    nationList,
    structureList,
    params,
    placeList,
    relations,
    session,
    tileList,
    userList,
    stats,
  ]);
};

export default useDebugAtom;
