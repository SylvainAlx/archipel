import { ReactNode } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Props {
  children: JSX.Element
}

export interface Children {
  children: ReactNode;
}

export interface ArchipelRoute {
  path: string,
  page: React.JSX.Element
}

export interface AuthPayload {
  name: string;
  password: string;
}

export interface RecoveryPayload {
  name: string;
  recovery: string;
  newPassword: string;
}

export interface ButtonProps {
  path: string;
  text: string;
}

export interface StringProps {
  text: string;
}

export interface ConfirmModalProps {
  text: string,
  result: string;
}

export interface Nation {
  name: string,
  data: {
    url: {
      flagUrl: string,
      bannerUrl: string,
      websiteUrl: string,
    },
    general: {
      motto: string,
      nationalDay: Date,
      regime: number,
      points: number,
      politicalSide: number,
    },
    distribution: [
      {
        workId: number,
        points: number,
      },
    ],
  }
}