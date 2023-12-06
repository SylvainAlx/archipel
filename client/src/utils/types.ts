/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Props {
  children: JSX.Element
}

export interface ArchipelRoute {
  path: string,
  page: React.JSX.Element
}

export interface AuthPayload {
  name: string;
  password: string;
}

export interface ButtonProps {
  path: string;
  text: string;
}