import { useState, ChangeEvent, FormEvent } from "react";
import Form from "../components/form/form";
import Input from "../components/form/input";
import H1 from "../components/titles/h1";
import { TITLE } from "../settings/consts";
import { ParamPayload } from "../types/typPayload";

export default function Admin() {
  const [param, setParam] = useState<ParamPayload>({name:"", props: []})
  const [props, setProps] = useState([{label: "", value: ""}])

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setParam({...param, name: e.target.value})
  }

  const handleChangeProp = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedProps = [...props]
    const index = Number(e.target.id)
    if (e.target.name === "label"){
      updatedProps[index].label = e.target.value
    }
    else if (e.target.name === "value"){
      updatedProps[index].value = e.target.value
    }
    setProps(updatedProps)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(param);
    
  }

  return (
    <>
      <H1 text={`Administration de ${TITLE}`} />
      <Form title="Nouveau paramètres" submit={handleSubmit} children={
        <>
        <Input required={true} type="text" name="name" placeholder="NOM DU PARAM" value={param.name} onChange={handleChangeName} />
        {props.map((prop, i)=>{
          <div key={i}>
            <Input required={true} type="text" id={i.toString()} name="label" placeholder="LIBÉLÉ" value={prop.label} onChange={handleChangeProp} />
            <Input required={true} type="text" id={i.toString()} name="value" placeholder="VALEUR" value={prop.value} onChange={handleChangeProp} />
          </div>
        })}
        </>
      }  />
    </>
  );
}
