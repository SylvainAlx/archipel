import { MouseEventHandler } from "react";
import { Nation } from "./typNation";
import { Place } from "./typPlace";
import { DiplomaticRelationship } from "./typRelation";
import { User } from "./typUser";
import { NationModel } from "../models/nationModel";

export interface StringProps {
  text: string;
}

export interface customTagProps {
  label: string | number;
  type?: number;
  bgColor?: string;
  owner?: boolean;
}

export interface ClickProps {
  text?: string;
  click: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
  small?: boolean;
  absolute?: boolean;
}

export interface SelectedNationProps {
  selectedNation: NationModel;
  // eslint-disable-next-line no-undef
  setSelectedNation?: React.Dispatch<React.SetStateAction<Nation>>;
  owner?: boolean;
}

export interface UpdateByOfficialIdProps {
  element: Nation | Place | DiplomaticRelationship | User;
  array: Nation[] | Place[] | DiplomaticRelationship[] | User[];
}
