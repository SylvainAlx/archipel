import { useEffect } from "react";
import H1 from "../components/titles/h1";
import { TITLE } from "../settings/consts";
import { paramsListAtom } from "../settings/store";
import { useAtom } from "jotai";
import { getAllParams } from "../api/param/paramAPI";
import H2 from "../components/titles/h2";
import TileContainer from "../components/tileContainer";
import DashTile from "../components/dashTile";

export default function Admin() {
  const [paramsList] = useAtom(paramsListAtom)

  useEffect(()=>{
    if(paramsList.length === 0){
      getAllParams()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    console.log(paramsList);
    
  }, [paramsList])

  return (
    <>
      <H1 text={`Administration de ${TITLE}`} />
      <H2 text={"Paramètres"} />
      <TileContainer children={<>
      {paramsList.map((param,i)=>{
        return (
          <div key={i}>
          <DashTile title={param.name} children={
            
            <table>
              <thead>
                <tr>
                  <th>propriété</th>
                  <th>valeur</th>
                </tr>
              </thead>
              <tbody>
                {paramsList.map((param)=>{
                  return (
                    <>
                    {param.props.map((prop, k) =>{
                        return (
                          <tr key={k}>
                            <td>{prop.label}</td>
                            <td className="text-right">{prop.value}</td>
                          </tr>
                        )
                    })}
                    </>
                  )
                })}
              </tbody>
            </table>
            }
          />
          </div>
        )
      })}
    </>} />
      
    </>
  );
}
