/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import Button from "../../../components/buttons/button";
import { nationsListAtom } from "../../../settings/store";
import { useEffect, useState, lazy, Suspense } from "react";
import H1 from "../../../components/titles/h1";
import { StringProps } from "../../../types/typProp";
import { getNations } from "../../../api/nation/nationAPI";
import Spinner from "../../../components/loading/spinner";
import IndexTag from "../../../components/tags/indexTag";
import SearchBar from "../../../components/searchBar";

export default function NationList({ text }: StringProps) {
  const [nationsList, setNationsList] = useAtom(nationsListAtom);
  const [displayedNations, setDisplayedNations] = useState(10);

  const PublicNationTile = lazy(
    () => import("../../../components/nations/publicNationTile"),
  );

  useEffect(() => {
    if (nationsList.length === 0) {
      getNations("");
    } else if (nationsList.length > 0) {
      if (nationsList[0]._id === "") {
        getNations("");
      }
    }
  }, []);

  return (
    <>
      <H1 text={text} />
      <SearchBar type="nation" list={nationsList} setList={setNationsList} />
      <section className="w-full flex gap-1 flex-wrap items-center flex-col ">
        {nationsList != undefined &&
          nationsList.length > 0 &&
          nationsList.map((nation, i) => {
            if (i < displayedNations) {
              return (
                <Suspense key={i} fallback={<Spinner />}>
                  <div className="min-w-[300px] w-full relative transition-all duration-300 animate-fadeIn">
                    <PublicNationTile
                      _id={nation._id}
                      officialId={nation.officialId}
                      name={nation.name}
                      owner={nation.owner}
                      role={nation.role}
                      data={nation.data}
                      createdAt={nation.createdAt}
                    />
                    <IndexTag text={i} />
                  </div>
                </Suspense>
              );
            }
          })}
        {displayedNations < nationsList.length && (
          <Button
            click={() => setDisplayedNations(displayedNations + 5)}
            text="VOIR PLUS"
          />
        )}
      </section>
    </>
  );
}
