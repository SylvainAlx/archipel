import { ChangeEvent, FormEvent, MouseEventHandler } from "react";
import { ReactNode } from "react";
import { LabelId, Nation, PoliticalSide, Regime } from "./typNation";
import { Place } from "./typPlace";
import { SetAtom } from "../settings/store";
import { SetStateAction } from "jotai";

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface InputProps {
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  placeholder: string;
  value: string | number;
  id?: string;
}

export interface SelectProps {
  required?: boolean;
  options: Array<{
    id: number | string;
    label: string;
    color?: string;
  }>;
  value?: string | number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export interface TabNavProps {
  tabs: Array<{ id: number; label: string }>;
  tabId: number;
  setTab: React.Dispatch<React.SetStateAction<{ id: number; label: string }>>;
  owner: boolean;
}

export interface ButtonProps {
  type?: "button" | "submit";
  path: string;
  text: string;
  bgColor?: string;
  disabled?: boolean;
  children?: JSX.Element;
  click?: MouseEventHandler<HTMLButtonElement>;
}

export interface BooleanProps {
  isOk: boolean;
  setOk: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface StringProps {
  text: string;
}

export interface NumberProps {
  text: number;
}

export interface newPlaceProps {
  parentId: string;
  owner: boolean;
}

export interface customTagProps {
  label: string | number;
  type?: number;
  bgColor?: string;
  owner?: boolean;
}

export interface ConfirmModalProps {
  text: string;
  result: string;
}

export interface Props {
  children: JSX.Element;
}

export interface Children {
  children: ReactNode;
}

export interface FormProps {
  children: JSX.Element;
  title?: string;
  submit: (event: FormEvent) => void;
  background?: boolean;
}

export interface DashTileProps {
  title: string;
  children: JSX.Element;
  className?: string;
}

export interface TagProps {
  text: string;
  hover: string;
  bgColor?: string;
  textColor?: string;
  textStyle?: string;
  children?: JSX.Element;
  click?: MouseEventHandler<HTMLDivElement>;
}

export interface ClickProps {
  text?: string;
  click: MouseEventHandler<HTMLButtonElement>;
}

export interface TextAreaProps {
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  placeholder: string;
  value: string;
  maxLength: number;
  rows?: number;
}

export interface SelectedNationProps {
  selectedNation: Nation;
  setSelectedNation?: React.Dispatch<React.SetStateAction<Nation>>;
  owner?: boolean;
}

export interface PlaceTileProp {
  owner?: boolean;
  place: Place;
  update?: number;
}

export interface NewPlaceTileProps {
  owner?: boolean;
  nationId: string;
  title: string;
  type: number;
  cost: number;
  benefit: number;
  waitTime: number;
  population: number;
  image: string;
  description: string;
  canBuy: boolean;
}

export interface DashboardTabProps {
  text?: string;
  owner?: boolean;
}

export interface EditIconProps {
  target: string;
  param: number | string | boolean | Regime[] | PoliticalSide[] | LabelId[];
  path: string;
  indice?: number;
}

export interface ExternalLinkProps {
  url: string;
  children: JSX.Element;
  hover: string;
}

export interface LazyImageProps {
  src: string;
  alt: string;
  className: string;
  hover: string;
}

export interface SearchBarProps {
  type: string;
  list: any[];
  setList: SetAtom<[SetStateAction<any>], void>,
}
