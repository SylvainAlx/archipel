import { useEffect, useState } from "react";
import { ComListModel } from "../../models/lists/comListModel";

export default function useAdminComs() {
  const [adminComList, setAdminComList] = useState<ComListModel>(
    new ComListModel(),
  );
  const [displayedComs, setDisplayedComs] = useState(10);

  useEffect(() => {
    const loadList = async () => {
      const updatedList = await adminComList.loadAdminComList();
      if (updatedList) {
        setAdminComList(updatedList);
      }
    };
    loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    adminComList,
    displayedComs,
    setDisplayedComs,
  };
}
