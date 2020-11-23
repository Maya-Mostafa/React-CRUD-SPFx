import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IReactCrudProps {
  description: string;
  context: WebPartContext;
  listTitle: string;
  ListUrl: string;
  "Percent Completed": string;
}
