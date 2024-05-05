import { infoModalAtom, loadingAtom, myStore, nationsListAtom, recoveryKey, userAtom } from "../../settings/store";
import { EmptyNation } from "../../types/typNation";
import { AuthPayload } from "../../types/typUser";
import { registerFetch } from "./userFetch";

export const register = ({ name, password }: AuthPayload) => {
  myStore.set(loadingAtom, true);
  registerFetch({ name, password })
    .then((data) => {
      
      if (data.user) {
        localStorage.setItem("jwt", data.jwt);
        myStore.set(recoveryKey, data.recovery);
        myStore.set(nationsListAtom, [EmptyNation]);
        myStore.set(userAtom, {
          name: data.user.name,
          surname: data.user.surname,
          avatar: data.user.avatar,
          password: data.user.password,
          recovery: data.user.recovery,
          role: data.user.role,
          citizenship: data.user.citizenship,
          createdAt: data.user.createdAt
        })
      myStore.set(loadingAtom, false);
      } else {
        myStore.set(loadingAtom, false);
        myStore.set(infoModalAtom, "création impossible : " + data.message);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      myStore.set(infoModalAtom, error.message);
    });
};