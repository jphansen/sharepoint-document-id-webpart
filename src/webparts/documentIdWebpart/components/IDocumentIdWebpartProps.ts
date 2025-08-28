import { SPHttpClient } from '@microsoft/sp-http';

export interface IDocumentIdWebpartProps {
  description: string;
  postUrl: string;
  spHttpClient: SPHttpClient;
  currentWebUrl: string;
  documentId: string;
}
