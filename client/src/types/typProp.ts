import { ChangeEvent, MouseEventHandler } from "react";
import { ReactNode  } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */


export interface InputProps {
    required?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type: string;
    placeholder: string;
    value: string;
}

export interface SelectProps {
  required?: boolean;
  options: Array<{id:number, label:string}>;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  value: string;

}

export interface ButtonProps {
    type?: 'button' | 'submit';
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
    text: string,
    result: string;
  }

  export interface Props {
    children: JSX.Element
  }
  
  export interface Children {
    children: ReactNode;
  }