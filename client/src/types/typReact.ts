import { SyntheticEvent } from 'react';

export interface UploadSuccessEvent extends SyntheticEvent {
  detail: {
    cdnUrl: string;
    uuid: string;
    // Autres propriétés pertinentes selon la documentation d'Uploadcare
  };
}

export interface ArchipelRoute {
    path: string,
    page: React.JSX.Element
  }