import { MouseEventHandler } from "react";
import { Nation } from "./typNation";
import { Place } from "./typPlace";
import { DiplomaticRelationship } from "./typRelation";
import { User } from "./typUser";

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface StringProps {
  text: string;
}

export interface NumberProps {
  text: number;
}

export interface customTagProps {
  label: string | number;
  type?: number;
  bgColor?: string;
  owner?: boolean;
}

export interface Props {
  children: JSX.Element;
}

export interface ClickProps {
  text?: string;
  click: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
  small?: boolean;
  absolute?: boolean;
}

export interface SelectedNationProps {
  selectedNation: Nation;
  setSelectedNation?: React.Dispatch<React.SetStateAction<Nation>>;
  owner?: boolean;
}

export interface UpdateByOfficialIdProps {
  element: Nation | Place | DiplomaticRelationship | User;
  array: Nation[] | Place[] | DiplomaticRelationship[] | User[];
}
