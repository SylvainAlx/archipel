import { useState, useEffect } from "react";
import { isMoreThan24Hours } from "../utils/functions";
import { myStore, sessionAtom } from "../settings/store";
import { ComListModel } from "../models/lists/comListModel";

export function useAllowPost(coms: ComListModel) {
  const [allowPost, setAllowPost] = useState(true);
  const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    if (coms.getItems().length > 0) {
      const lastElement = coms.getItems()[coms.getItems().length - 1];
      if (lastElement) {
        const isActivePlan =
          myStore.get(sessionAtom).user.plan !== "free" &&
          myStore.get(sessionAtom).user.expirationDate >
            new Date().toLocaleDateString();

        setAllowPost(isMoreThan24Hours(lastElement.createdAt) || isActivePlan);
      } else {
        setAllowPost(true);
      }

      // if (session.user.citizenship.nationId === selectedNation.officialId) {
      //   displayUnwatchedComs(session.user, coms.getItems(), [
      //     selectedNation.officialId,
      //   ]);
      // }
    } else {
      setAllowPost(true);
    }
  }, [coms]);

  useEffect(() => {
    if (!allowPost && coms.getItems().length > 0) {
      const givenDate = new Date(
        coms.getItems()[coms.getItems().length - 1].createdAt,
      );
      const dateAfter24Hours = new Date(
        givenDate.getTime() + 24 * 60 * 60 * 1000,
      );
      setDueDate(dateAfter24Hours);
    } else {
      setDueDate(new Date());
    }
  }, [allowPost]);

  return { allowPost, dueDate };
}
