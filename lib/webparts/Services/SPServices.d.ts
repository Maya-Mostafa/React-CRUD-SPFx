import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IDropdownOption } from "office-ui-fabric-react";
export declare class SPOperations {
    GetAllList(context: WebPartContext): Promise<IDropdownOption[]>;
    CreateListItem(context: WebPartContext, listTitle: string, listItemTitleVal: string): Promise<string>;
    DeleteListItem(context: WebPartContext, listTitle: string, listItemID: number): Promise<string>;
    UpdateListItem(context: WebPartContext, listTitle: string, listItemTitleVal: string, listItemID: number): Promise<string>;
}
//# sourceMappingURL=SPServices.d.ts.map