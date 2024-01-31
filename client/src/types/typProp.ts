import { ChangeEvent, FormEvent, MouseEventHandler } from "react";
import { ReactNode } from "react";
import { Nation, RegimeOption } from "./typNation";

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface InputProps {
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  placeholder: string;
  value: string | number;
}

export interface SelectProps {
  required?: boolean;
  options: Array<{
    id: number;
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
}

export interface ButtonProps {
  type?: "button" | "submit";
  path: string;
  text: string;
  disabled?: boolean;
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
  bgColor?: string;
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
  owner?: boolean;
}

export interface EditIconProps {
  param: number | string | boolean | RegimeOption[];
  path: string;
  indice?: number;
}
