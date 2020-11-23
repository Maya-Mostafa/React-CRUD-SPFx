import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface IReactCrudWebPartProps {
    description: string;
    listTitle: string;
    ListUrl: string;
    "Percent Completed": string;
    ValidationRequired: boolean;
    ListName: string;
}
export default class ReactCrudWebPart extends BaseClientSideWebPart<IReactCrudWebPartProps> {
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    validateListUrl(value: string): string;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=ReactCrudWebPart.d.ts.map