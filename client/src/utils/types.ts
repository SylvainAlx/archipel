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

export interface Nation {
  name: string,
  data: {
    url: {
      flagUrl: String,
      bannerUrl: String,
      websiteUrl: String,
    },
    general: {
      motto: String,
      nationalDay: Date,
      regime: Number,
      points: Number,
      politicalSide: Number,
    },
    distribution: [
      {
        workId: Number,
        points: Number,
      },
    ],
  }
}